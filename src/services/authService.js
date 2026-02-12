// const User = require("../models/User");
// const generateToken = require("../utils/jwt");

// const registerUser = async ({ name, email, password }) => {
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     throw new Error("User already exists");
//   }

//   const user = await User.create({
//     name,
//     email,
//     password
//   });

//   const token = generateToken(user._id);

//   return {
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role
//     },
//     token
//   };
// };

// const loginUser = async ({ email, password }) => {
//   const user = await User.findOne({ email }).select("+password");
//   if (!user) {
//     throw new Error("Invalid email or password");
//   }

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     throw new Error("Invalid email or password");
//   }

//   const token = generateToken(user._id);

//   return {
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role
//     },
//     token
//   };
// };

// module.exports = { registerUser, loginUser };



const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create user with PLAIN password
  // Hashing will be done by mongoose pre-save hook
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const loginUser = async ({ email, password }) => {
  // Explicitly select password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = { registerUser, loginUser };
