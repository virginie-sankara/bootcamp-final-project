"use strict";
const { MongoClient } = require("mongodb");

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
  const username = req.params.username;
  console.log(username);
  try {
    await client.connect();
    console.log("connected");

    const user = await db.collection("users").findOne({ username });

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

// PATCH : USER

// POST : FORM
// GET : FORMS
// GET : FORM
// PATCH : FORM

module.exports = { getUsers, getUser };
