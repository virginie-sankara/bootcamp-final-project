"use strict";
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI, TMDB_KEY } = process.env;
const fetch = require("node-fetch");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { users } = require("./data/users");

// declare a variable called client, and assign it the MongoClient().
const client = new MongoClient(MONGO_URI, options);
const db = client.db("finalproject");

// GET : USERS
const getUsers = async (req, res) => {
  try {
    await client.connect();
    console.log("connected");

    const users = await db.collection("users").find().toArray();
    console.log(users);

    users
      ? res.status(200).json({
          status: 200,
          data: users,
          message: "The users were successfully found",
        })
      : res.status(404).json({ status: 404, data: "Users not found" });

    client.close();
    console.log("disconnected");
  } catch (err) {
    console.log(err.stack);
    client.close();
    console.log("disconnected");
  }
};

// GET : A SPECIFIC USER
const getUser = async (req, res) => {
  const _id = req.params.user;
  console.log(_id);
  try {
    await client.connect();
    console.log("connected");

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(_id) });

    user
      ? res.status(200).json({
          status: 200,
          data: user,
          message: "User successfully found",
        })
      : res.status(404).json({ status: 404, data: "User not found" });
    client.close();
    console.log("disconnected");
  } catch (err) {
    console.log(err.stack);
    client.close();
    console.log("disconnected");
  }
};

// POST : MATCH
const addMatch = async (req, res) => {
  const { userIds, type, formData1 } = req.body;

  // validation ?

  try {
    await client.connect();
    console.log("connected");

    const newMatch = await db.collection("matches").insertOne({
      userIds,
      type: type,
      formData1: formData1,
      formData2: null,
      suggestion: null,
    });

    res.status(200).json({
      status: 200,
      data: newMatch,
      message: "New match successfully created",
    });
    client.close();
    console.log("disconnected");
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    console.log(err.stack);
    client.close();
    console.log("disconnected");
  }
};
// GET : MATCHES
const getMatches = async (req, res) => {
  try {
    await client.connect();
    console.log("connected");

    const matches = await db.collection("matches").find().toArray();
    console.log(matches);

    matches
      ? res.status(200).json({
          status: 200,
          data: matches,
          message: "The matches collection was successully found",
        })
      : res.status(404).json({ status: 404, data: "Not found" });

    client.close();
    console.log("disconnected");
  } catch (err) {
    cononsole.log(err.stack);
    client.close();
    console.log("disconected");
  }
};

// GET : A SPECIFIC MATCH
const getMatch = async (req, res) => {
  const _id = req.params.match;
  console.log(_id);

  try {
    await client.connect();
    console.log("connected");

    const match = await db
      .collection("matches")
      .findOne({ _id: new ObjectId(_id) });

    match
      ? res.status(200).json({
          status: 200,
          data: match,
          message: "Match successfully found",
        })
      : res.status(404).json({ status: 404, data: "Match not found" });
    client.close();
    console.log("disconnected");
  } catch (err) {
    console.log(err.stack);
    client.close();
    console.log("disconnected");
  }
};
// PATCH (update) : MATCH
const updateMatch = async (req, res) => {
  const { _id, formData2 } = req.body;
  let suggestion = null;

  try {
    await client.connect();
    console.log("connected");

    // Combine current match form data with form data from second user
    const query = { _id: new ObjectId(_id) };
    const matchToUpdate = await db.collection("matches").findOne(query);
    const newValue = { $set: { formData2: formData2 } };

    const type = matchToUpdate.type;
    const formData1 = matchToUpdate.formData1;
    console.log("formData1 is", formData1);

    const matchToUpdateResult = await db
      .collection("matches")
      .updateOne(query, newValue);

    console.log("Match.formData2 successfully updated");

    // Create new object with values to query
    const formDataToQuery = {
      length: formData1.length.filter((val) => formData2.length.includes(val)),
      // Combine genre requested into new array and remove duplicated values
      genre: [...new Set(formData1.genre.concat(formData2.genre))],
    };
    console.log(formDataToQuery);

    // Set queries to formDataToQuery values
    const queryLength = formDataToQuery.length.toString();
    const queryGenre = formDataToQuery.genre.toString();

    // Get suggestion and patch Match with suggestion AND form data 2
    try {
      if (matchToUpdate.type === "movie") {
        // Return response to browser
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&page=1&with_genres=${queryGenre}&with_runtime.lte=${queryLength}`
        ).then((movieResponse) => movieResponse.json());

        console.log(movieResponse);

        // Get random index from the movieResponse.results array
        const randomIndex = Math.floor(
          Math.random() * movieResponse.results.length
        );

        // Get random suggestion from the movieResponse.results array
        const randomSuggestion = movieResponse.results[randomIndex];

        // Combine current match form data with form data from second user
        const newMovieSuggestion = { $set: { suggestion: randomSuggestion } };

        const matchResult = await db
          .collection("matches")
          .updateOne(query, newMovieSuggestion);

        console.log(
          "Match.suggestion successfully updated with a movie result"
        );

        // Success response for Movie
        res.status(200).json({
          status: 200,
          data: matchResult,
          message: "Match successfully completed",
        });
        client.close();
        console.log("disconnected");
      }
      // If matchToUpdate.type === TV
      if (matchToUpdate.type === "tv") {
        // Return response to browser
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&page=1&with_genres=${queryGenre}&with_runtime.lte=${queryLength}`
        ).then((tvResponse) => tvResponse.json());

        console.log(tvResponse);

        // Get random index from the tvResponse.results array
        const randomIndex = Math.floor(
          Math.random() * tvResponse.results.length
        );

        // Get random suggestion from the movieResponse.results array
        const randomSuggestion = tvResponse.results[randomIndex];

        // Combine current match form data with form data from second user
        const newTvSuggestion = { $set: { suggestion: randomSuggestion } };

        const matchResult = await db
          .collection("matches")
          .updateOne(query, newTvSuggestion);

        console.log(
          "Match.suggestion successfully updated with a TV show result"
        );

        // Success response for TV
        res.status(200).json({
          status: 200,
          data: matchResult,
          message: "Match successfully completed",
        });
        client.close();
        console.log("disconnected");
      }
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message });
      console.log(err.stack);
      client.close();
      console.log("disconnected");
    }
    //   Error handling
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    console.log(err.stack);
    client.close();
    console.log("disconnected");
  }
};

module.exports = {
  getUsers,
  getUser,
  addMatch,
  getMatches,
  getMatch,
  updateMatch,
};
