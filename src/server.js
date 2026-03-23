require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Connect to Database
connectDB();

// Start server on Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
