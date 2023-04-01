"use strict";
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

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
  const { userIds, formData } = req.body;

  // validation ?

  try {
    await client.connect();
    console.log("connected");

    const newMatch = await db.collection("matches").insertOne({
      userIds,
      formData1: formData,
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
// GET : MATCH
// PATCH : MATCH

module.exports = { getUsers, getUser, addMatch, getMatches };
