const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { users } = require("./data/users");

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("finalproject");
    console.log("connnected!");

    // Insert multiple users
    const result = await db.collection("users").insertMany(users);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (err) {
    console.log(err.stack);
  }
  // Close the client
  client.close();
  console.log("disconnected");
};

batchImport();
