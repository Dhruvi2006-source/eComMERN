const express = require("express");
const router = express.Router();

const User = require("./model/User"); // Make sure this import exists

// Login Route
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check password (plain match for now — bcrypt recommended!)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Success
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Example lookup
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // ✅ Send back the user
  return res.status(200).json({
    user: {
      name: user.name, // <-- make sure this exists in DB
      email: user.email,
    },
  });
});

module.exports = router;
