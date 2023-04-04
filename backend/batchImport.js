const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { users } = require("./data/users");
const { movieGenres } = require("./data/movieGenres");
const { tvGenres } = require("./data/tvGenres");

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("finalproject");
    console.log("connected!");

    // Insert multiple users
    const usersResult = await db.collection("users").insertMany(users);
    console.log(`${usersResult.insertedCount} documents inserted`);

    // Insert movie genres
    const movieResult = await db
      .collection("movieGenres")
      .insertMany(movieGenres);
    console.log(`${movieResult.insertedCount} documents inserted`);

    // Insert tv genres
    const tvResult = await db.collection("tvGenres").insertMany(tvGenres);
    console.log(`${tvResult.insertedCount} documents inserted`);
  } catch (err) {
    console.log(err.stack);
  } finally {
    // Close the client
    await client.close();
    console.log("disconnected");
  }
};

batchImport();
