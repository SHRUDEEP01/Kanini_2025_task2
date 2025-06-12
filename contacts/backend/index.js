const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/yourDB-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to yourDB-name database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

// Schema for users of the app
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number:{
    type: Number,
    unique: true,

  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", UserSchema);

// Express setup
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend URL
  })
);

// Sample route to check if the backend is working
app.get("/", (req, resp) => {
  resp.send("App is working");
});

// API to register a user
app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    if (result) {
      delete result.password; // Ensure you're not sending sensitive info
      resp.status(201).send(result); // Send successful response
    } else {
      console.log("User already registered");
      resp.status(400).send("User already registered");
    }
  } catch (e) {
    resp
      .status(500)
      .send({ message: "Something went wrong", error: e.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("App is running on port 5000");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "User deleted" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});
