const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

let client;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports.setup = async () => {
  const db = new MongoClient(MONGO_URI, options);
  try {
    client = await db.connect();
  } catch (error) {
    console.error("Could not connect to mongodb");
    throw error;
  }
};

module.exports.get = () => client;
module.exports.close = () => client.close();
