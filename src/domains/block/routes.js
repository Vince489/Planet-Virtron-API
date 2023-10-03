const express = require("express");
const router = express.Router();

const createBlock = require("./controller"); // Import the createBlock function

// Create a new block entry in the database
router.post("/", async (req, res, next) => {
  try {
    // Extract data from the request body
    const { transactions, previousHash, validator, validatorSignature } = req.body;

    // Create a new block object with the provided data
    const newBlock = await createBlock(transactions, previousHash, validator, validatorSignature);

    // Respond with the newly created block data
    res.status(201).json(newBlock);
  } catch (error) {
    next(error);
  }
});






module.exports = router;