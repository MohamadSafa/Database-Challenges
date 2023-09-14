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
