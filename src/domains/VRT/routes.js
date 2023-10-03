const express = require("express");
const router = express.Router();
const VRT = require("./model"); // Import the VRT model

// Create a new native coin entry in the database
router.post("/", async (req, res, next) => {
  try {
    // Extract data from the request body
    const { name, symbol, totalSupply, balance, icon, authority, frozen } = req.body;

    // Create a new VRT token object with the provided data
    const newVRT = new VRT({
      name,
      symbol,
      totalSupply,
      balance,
      icon,
      authority,
      frozen,
    });

    // Save the new VRT token to the database
    await newVRT.save();

    // Respond with the newly created VRT token data
    res.status(201).json(newVRT);
  } catch (error) {
    next(error);
  }
});

// Retrieve all VRT tokens
router.get("/", async (req, res, next) => {
  try {
    // Retrieve all VRT tokens from the database
    const VRTs = await VRT.find();

    // Respond with the retrieved VRT tokens
    res.json(VRTs);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
