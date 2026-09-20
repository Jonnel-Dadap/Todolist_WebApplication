const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // console.log("LOGIN REQUEST RECEIVED");

    const { email, password } = req.body;

    console.log("Finding user...");

    const user = await User.findOne({ email });

    console.log("User found:", !!user);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // console.log("Checking password...");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password checked:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // console.log("Creating JWT...");

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // console.log("JWT CREATED");

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  registerUser,
  loginUser
};