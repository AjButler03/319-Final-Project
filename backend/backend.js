var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "FM319";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

app.get("/listSongs", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db.collection("allSongs").find(query).limit(100).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/listGenres", async (req, res) => {
  try {
    await client.connect();
    console.log("Node connected successfully to MongoDB");

    // Retrieve all songs from the database
    const query = {};
    const songs = await db.collection("allSongs").find(query).toArray();

    // Extract all genres from the songs
    const allGenres = songs.reduce((acc, song) => {
      return [...acc, ...song.tags];
    }, []);

    // Create a Set to ensure uniqueness of genres
    const uniqueGenres = [...new Set(allGenres)];

    res.status(200).json(uniqueGenres);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/listSongsByGenres", async (req, res) => {
  try {
    await client.connect();
    console.log("Node connected successfully to MongoDB");

    // Aggregate to group songs by genres
    const pipeline = [
      {
        $unwind: "$tags" // Split array of tags into multiple documents
      },
      {
        $group: {
          _id: "$tags", // Group by each genre
          songs: {
            $push: {
              id: "$_id",
              artistName: "$artistName",
              songTitle: "$songTitle",
              duration: "$duration",
              imageUrl: "$imageUrl"
            }
          }
        }
      }
    ];

    // Execute aggregation pipeline
    const genresWithSongs = await db.collection("allSongs").aggregate(pipeline).toArray();

    res.status(200).json(genresWithSongs);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/:id", async (req, res) => {
  const productid = Number(req.params.id);
  console.log("Song to find by ID :", productid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: productid };
  const results = await db.collection("allSongs").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

app.post("/addSong", async (req, res) => {
  try {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const newDocument = {
      id: parseInt(values[0]),
      artistName: values[1],
      duration: values[2],
      songTitle: values[3],
      lyrics: values[4],
      imageUrl: values[5],
      tags: [values[6], values[7], values[8]],
      
    };

    console.log(newDocument);

    const results = await db.collection("allSongs").insertOne(newDocument);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred: ", error);
    res.status(500).send({ Error: "an internal server error occurrred" });
  }
});

app.delete("/deleteSong/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await client.connect();
    console.log("Song to delete :", id);
    const query = { id: id };

    // read data from song to delete to send it to frontend
    const songDeleted = await db.collection("allSongs").findOne(query);

    // delete
    const results = await db.collection("allSongs").deleteOne(query);
    res.status(200);
    res.send(songDeleted);
    res.send(results);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
});

app.put("/updateSong/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const query = { id: id };
  await client.connect();
  console.log("Song to Update :", id);
  // Data for updating the document, typically comes from the request body
  // console.log(req.body);
  // read data from robot to update to send to frontend

  const existingProduct = await db.collection("allSongs").findOne(query);
  const updateData = {
    $set: {
      artistName: req.body.artistName,
      songTitle: req.body.songTitle,
      duration: req.body.duration,
      lyrics: req.body.lyrics,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
    },
  };

  const results = await db
    .collection("allSongs")
    .updateOne(query, updateData);
  res.status(200);
  // If no document was found to update, you can choose to handle it by sending a 404 response
  if (results.matchedCount === 0) {
    return res.status(404).send({ message: "Song not found" });
  }
  res.send(results);
});

app.get("/", async (req, res) => {});

const port = "8081";
const host = "localhost";

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
