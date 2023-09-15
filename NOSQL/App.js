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
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// const cors = require("cors");

// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// app.get("/api", (req, res) => {
//   console.log(`Received a ${req.method} request at http://localhost:${PORT}`);
//   res.send("This is working!");
// });

// app.listen(PORT, () => {
//   console.log(`Listening at http://localhost:${PORT}`);
// });

//Mongo DB
// Create a MongoClient and Stable API version
const { MongoClient, ServerApiVersion } = require("mongodb");
// Define the MongoDB connection string (URL)
const URL =
  "mongodb+srv://MohamadSafa:KfYTuZj5kLF8WvJU@cluster0.lsbsm7c.mongodb.net/?retryWrites=true&w=majority";

   
const client = new MongoClient(URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//Challenge 4 : Implement Create Operation with MongoDB

// const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.get("/api", (req, res) => {
  console.log(`Received a request at http://localhost:${PORT}/api`);
  res.send("This is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Update a user by ID
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

//Challenge 5 : Implement Read Operations with MongoDB

//Fetch all data
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Assuming you have a User model defined
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


//Fetch specific data
app.get("/api/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Use userId to query the database for specific user details
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user details
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});