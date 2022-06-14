//const express = require("express"); // 3rd party imported
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users.js";

dotenv.config();

// env - environment variables
console.log(process.env.MONGO_URL);

const app = express();

const PORT = process.env.PORT;

// middle ware -> Intercept1 -> converting body to json
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
export const client = await createConnection();

// / - home
app.get("/", function (request, response) {
    response.send("Hello World 🎉🎉😍");
});

async function genpassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
    

  app.post("/signup", async function (req, res) {
    const { username, typeofuser, password } = req.body;
    const hashPassword = await genpassword(password);
    const newUser = {
      username: username,
      typeofuser: typeofuser,
      password: hashPassword
    }
    const result = await client.db("b33wd").collection("users").insertOne(newUser)
    res.send(result)
  
  })
  
  app.post("/signin", async function (req, res) {
    const { username, typeofuser, password } = req.body;
    const userDb = await client.db("b33wd").collection("users").findOne({ username: username });
    if (!userDb) {
      res.status(401).send("invalid credentials")
    }
    else {
      const storedPass = userDb.password;
      const isPassMatch = await bcrypt.compare(password, storedPass);
      if (isPassMatch) {
        const token = jwt.sign({ id: userDb._id }, process.env.SECRET_KEY);
        // const token = jwt.sign({ id: userDb._id }, process.env.SECRET_KEY, { expiresIn: "30s" });
        console.log(token)
        res.send({ message: "successfully loggen in", token: token })
      }
      else {
        res.status(401).send("invalid credentials")
        console.log("error")
      }
  
    }
  
  
  })  

app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`App started in ${PORT}`));
