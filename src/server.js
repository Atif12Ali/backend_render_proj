require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Pass the URI explicitly to the function
const mongoURI = process.env.MONGO_URI; 

if (!mongoURI) {
  console.error("CRITICAL ERROR: MONGO_URI is not defined in Environment Variables!");
} else {
  connectDB(mongoURI); 
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
