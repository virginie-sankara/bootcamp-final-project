"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const port = 8888;

// handlers
const {
  getUsers,
  getUser,
  getMovieGenres,
  getTvGenres,
  addMatch,
  getMatches,
  getUserInvites,
  getMatch,
  updateMatch,
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/users", getUsers)
  .get("/user/:user", getUser)
  .get("/get-movie-genres", getMovieGenres)
  .get("/get-tv-genres", getTvGenres)
  .get("/matches", getMatches)
  .get("/get-user-invites/:useremail", getUserInvites)
  .get("/match/:match", getMatch)
  .post("/match", addMatch)
  .patch("/match/:match", updateMatch)

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  .get("/test", (req, res) => {
    res.status(200).json({ itWorked: true });
  })

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8888.
  .listen(port, () => console.log(`Listening on port ${port}`));
