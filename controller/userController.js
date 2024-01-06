const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User is already registered");
  }

  //   hashed password

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    throw new Error("User data is not valid");
  }

  res.json({ message: "register the user" });
});

// @desc login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All filed are mandatory");
  }
  const user = await User.findOne({ email });
  //   compare password with hashed password
  if (user && (await bcryptjs.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: userName,
          email: email,
          id: id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("OOPS Email or password is not valid ");
  }
  res.json({ message: "login user " });
});

// @desc current user info
// @route POST /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user information" });
});

module.exports = { registerUser, currentUser, loginUser };
