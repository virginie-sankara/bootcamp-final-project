"use strict";
require("dotenv").config();
const { ObjectId, Timestamp } = require("mongodb");
const { TMDB_KEY } = process.env;
const fetch = require("node-fetch");
const mongo = require("./mongo");
mongo.setup();

const { users } = require("./data/users");

// declare a variable called client, and assign it the MongoClient().

const db = () => mongo.get().db("finalproject");

// GET : USERS
const getUsers = async (req, res) => {
  try {
    const users = await db().collection("users").find().toArray();
    console.log(users);

    users
      ? res.status(200).json({
          status: 200,
          users: users,
          message: "The users were successfully found",
        })
      : res.status(404).json({ status: 404, data: "Users not found" });
  } catch (err) {
    res.status(500).json({ status: 500, data: err.message });
  }
};

// GET : A SPECIFIC USER
const getUser = async (req, res) => {
  const email = req.params.user;
  console.log(email);
  try {
    const user = await db().collection("users").findOne({ email });

    user
      ? res.status(200).json({
          status: 200,
          user: user,
          message: "User successfully found",
        })
      : res.status(404).json({ status: 404, data: "User not found" });
  } catch (err) {
    res.status(500).json({ status: 500, data: err.message });
  }
};

// POST : MATCH
const addMatch = async (req, res) => {
  const { formData1 } = req.body;

  try {
    const newMatch = await db()
      .collection("matches")
      .insertOne({
        host: formData1.host,
        hostUsername: formData1.hostUsername,
        partner: formData1.partner,
        partnerUsername: formData1.partnerUsername,
        emails: [formData1.host, formData1.partner],
        type: formData1.type,
        formData1: {
          genre: formData1.genre,
          length: formData1.length,
        },
        formData2: null,
        suggestion: null,
        completed: false,
        creationDate: Date(),
      });

    res.status(200).json({
      status: 200,
      newMatchData: newMatch,
      message: "New match successfully created",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

// GET : MATCHES
const getMatches = async (req, res) => {
  try {
    const matches = await db().collection("matches").find().toArray();
    console.log(matches);

    matches
      ? res.status(200).json({
          status: 200,
          matches: matches,
          message: "The matches collection was successully found",
        })
      : res.status(404).json({ status: 404, data: "Not found" });
  } catch (err) {
    res.status(500).json({ status: 500, data: err.message });
  }
};

// GET : a specific match with matchId
const getMatch = async (req, res) => {
  const _id = req.params.matchId;
  const query = { _id: new ObjectId(_id) };

  try {
    const match = await db().collection("matches").findOne(query);

    match
      ? res.status(200).json({
          status: 200,
          match: match,
          message: "Match successfully found",
        })
      : res.status(404).json({ status: 404, data: "Match not found" });
  } catch (err) {
    res.status(500).json({ status: 500, data: err.message });
  }
};

// GET : Invitations received that contains user email as value of "partner" key

const getUserInvites = async (req, res) => {
  const email = req.params.useremail;
  console.log(email);

  try {
    const userInvites = await db()
      .collection("matches")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "host",
            foreignField: "email",
            as: "host",
          },
        },
        {
          $match: {
            partner: email,
            suggestion: null,
          },
        },
      ])
      .toArray();
    console.log(userInvites);

    userInvites
      ? res.status(200).json({
          status: 200,
          userInvites: userInvites,
          message: "The matches were successully found",
        })
      : res.status(404).json({ status: 404, data: "Not found" });
  } catch (err) {
    res.status(500).json({ status: 500, data: err.message });
  }
};

// GET : Completed matches (+ matches results)
const getCompletedMatches = async (req, res) => {
  const email = req.params.useremail;
  console.log(email);

  try {
    const completedMatches = await db()
      .collection("matches")
      .find({
        emails: email,
        completed: true,
      })
      .toArray();

    completedMatches
      ? res.status(200).json({
          status: 200,
          data: completedMatches,
          message: "The completed matches were successully found",
        })
      : res.status(404).json({ status: 404, data: "Not found" });
  } catch (err) {
    res.status(500).json({ status: 500, data: err.message });
  }
};

// PATCH (update) : MATCH
const updateMatch = async (req, res) => {
  const { _id, formData2 } = req.body;
  let suggestion = null;

  try {
    // Combine current match form data with form data from second user
    const query = { _id: new ObjectId(_id) };
    const matchToUpdate = await db().collection("matches").findOne(query);
    const newValue = { $set: { formData2: formData2, completed: true } };

    const type = matchToUpdate.type;
    const formData1 = matchToUpdate.formData1;
    console.log("formData1 is", formData1);

    const matchToUpdateResult = await db()
      .collection("matches")
      .updateOne(query, newValue);

    console.log("Match.formData2 successfully updated");

    // Create new object with values to query
    const formDataToQuery = {
      length: parseInt(formData1.length) + parseInt(formData2.length) / 2,
      // Combine genre requested into new array and remove duplicated values
      genre: [...new Set(formData1.genre.concat(formData2.genre))],
    };
    console.log(formDataToQuery);

    // Set queries to formDataToQuery values
    const queryLength = formDataToQuery.length.toString();
    const queryGenre = formDataToQuery.genre.toString();

    // Get suggestion and patch Match with suggestion AND form data 2

    // Return response to browser
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${matchToUpdate.type}?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=${queryGenre}&with_runtime.lte=${queryLength}&page=1`
    ).then((movieResponse) => movieResponse.json());

    console.log(response);

    // Get random index from the movieResponse.results array
    const randomIndex = Math.floor(Math.random() * response.results.length);

    // Get random suggestion from the movieResponse.results array
    const randomSuggestion = response.results[randomIndex];

    // Combine current match form data with form data from second user
    const newSuggestion = { $set: { suggestion: randomSuggestion } };

    const matchResult = await db()
      .collection("matches")
      .updateOne(query, newSuggestion);

    // Success response for Movie
    res.status(200).json({
      status: 200,
      data: matchResult,
      message: "Match successfully completed",
    });
    //   Error handling
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

// GET : MOVIE GENRES
const getMovieGenres = async (req, res) => {
  try {
    const movieGenres = await db().collection("movieGenres").find().toArray();
    console.log(movieGenres);

    movieGenres
      ? res.status(200).json({
          status: 200,
          movieGenres: movieGenres,
          message: "The movie genres were successfully found",
        })
      : res.status(404).json({ status: 404, data: "Movie genres not found" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

// GET : TV GENRES
const getTvGenres = async (req, res) => {
  try {
    const tvGenres = await db().collection("tvGenres").find().toArray();
    console.log(tvGenres);

    tvGenres
      ? res.status(200).json({
          status: 200,
          tvGenres: tvGenres,
          message: "TV genres were successfully found",
        })
      : res.status(404).json({ status: 404, data: "TV genres not found" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  getMovieGenres,
  getTvGenres,
  addMatch,
  getMatches,
  getCompletedMatches,
  getUserInvites,
  getMatch,
  updateMatch,
};
