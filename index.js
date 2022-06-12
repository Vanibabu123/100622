//const express = require("express"); // 3rd party imported
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// env - environment variables
console.log(process.env.MONGO_URL);

const app = express();

const PORT = 4000;

// middle ware -> Intercept -> converting body to json
app.use(express.json()); // Inbuilt middleware

//const MONGO_URL = "mongodb://localhost"; // like phone number
const MONGO_URL = process.env.MONGO_URL;

// Node - MongoDB
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb is connected 👍😊");
    return client;
}

// Top level await
const client = await createConnection();

// / - home
app.get("/", function (request, response) {
    response.send("Hello World 🎉🎉😍");
});

// /movies - Movies
app.get("/movies", async function (request, response) {
    //db.movies.find({})
    
    // Cursor - pagination
    // toArray - Cursor -> Array
    const movies = await client
       .db("b33wd")
       .collection("movies")
       .find({})
       .toArray();

    response.send(movies);
});

app.get("/movies/:id", async function (request, response) {
    console.log(request.params);
    // params - parameters
    const { id } = request.params;
    // db.movies.findOne({id: '102'})

    //const movie = movies.find((mv) => mv.id === id);
    //response.send(movie);
    
    const movie = await client
       .db("b33wd")
       .collection("movies")
       .findOne({ id: id });
        
    movie 
     ? response.send(movie) 
     : response.status(404).send({ msg: "No such movie found" });
});

// express.json() -> converting to JSON
// Inbuilt middleware

app.post("/movies", async function (request, response) {
    const data = request.body;
    console.log(data);
    // db.movies.insertMany(data)
    const result = await client.db("b33wd").collection("movies").insertMany(data);
    response.send(result);
});

app.listen(PORT, () => console.log(`App started in ${PORT}`));
