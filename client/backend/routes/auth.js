const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
    const { name, password } = req.body;
    const user = new User({ name, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (user && user.password === password) {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
});

module.exports = router;
