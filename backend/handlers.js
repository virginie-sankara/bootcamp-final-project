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
  const { userIds, formData1 } = req.body;

  // validation ?

  try {
    await client.connect();
    console.log("connected");

    const newMatch = await db.collection("matches").insertOne({
      userIds,
      formData1: formData1,
      formData2: null,
      suggestion: null,
    });

    res.status(200).json({
      status: 200,
      data: req.body,
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
  const { _id, formData2, suggestion } = req.body;

  try {
    await client.connect();
    console.log("connected");

    // Combine current match form data with form data from second user
    const query = { _id: new ObjectId(_id) };
    const newValue = { $set: { formData2: formData2 } };

    const matchToUpdate = await db
      .collection("matches")
      .updateOne(query, newValue);
    console.log("Match.formData2 successfully updated");

    // success response
    res.status(200).json({
      status: 200,
      data: matchToUpdate.formData2,
      message: "Match.formData2 successfully updated",
    });

    client.close();
    console.log("disconnected!");
  } catch (err) {
    res.status(400).json({
      status: 400,
      error: err.message,
    });
    console.log(err.stack);
    client.close();
    console.log("disconnected!");
  }
  // TO_DO
  // Update query to movie to filter result based on form datas
  // Get suggestion and patch Match with suggestion AND form data 2
  // Return response to browser
  // Error handling API testing
  //   const response = await fetch(
  //     `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&page=1`
  //   ).then((response) => response.json());
  //   console.log(response);

  //   res.status(200).send();
};

module.exports = {
  getUsers,
  getUser,
  addMatch,
  getMatches,
  getMatch,
  updateMatch,
};
