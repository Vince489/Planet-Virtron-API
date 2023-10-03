// mongodb
require("./config/db");

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

// create server app
const app = express();

const corsOptions = {
  origin: ['https://planetvirtron.com', 'http://localhost:3000'],
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1", routes);

// Middleware to verify JWT token
// app.use((req, res, next) => {
//   // Get the token from the request headers (assuming it's in the 'Authorization' header)
//   const token = req.headers.authorization || '';

//   try {
//     // Verify and decode the token
//     const decoded = jwt.verify(token, 'your-secret-key'); // Use your actual secret key

//     // Attach the decoded user information to the request object for further use
//     req.user = decoded;

//     // Continue processing the request
//     next();
//   } catch (error) {
//     // Handle token verification errors (e.g., expired or invalid token)
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// });

module.exports = app;
