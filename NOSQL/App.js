//Challenge 1: Create a Basic Node.js Application

//const http = require('http');

//const server = http.createServer((req, res) => {
//res.writeHead(200, { 'Content-Type': 'text/plain' });
//res.end('Hello, Node.js!');
//});

//server.listen(PORT, () => {
//console.log(`Server is running on port ${PORT}`);
//});

//Challenge 2: Integrate Express.js with Node

const express = require("express");
const app = express();
const PORT = 5000;

const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/API", (req, res) => {
  console.log(`Listening at http://localhost:${PORT}`);
  res.send("This is working!");
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

//Mongo DB


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://MohamadSafa:KfYTuZj5kLF8WvJU@cluster0.lsbsm7c.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
