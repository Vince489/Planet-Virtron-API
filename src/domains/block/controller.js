const Block = require('./model'); // Import your Block model if needed
const Transaction = require('./../transaction/model'); // Import your Transaction model if needed
const crypto = require('crypto'); // Import the crypto library for hash calculation

// Create a function to generate a block
async function createBlock() {
  try {
    // Calculate the timestamp for the block
    const timeStamp = new Date();

    // Determine the block height based on the previous block's height
    const previousBlock = await Block.findOne().sort('-blockHeight');
    const blockHeight = previousBlock ? previousBlock.blockHeight + 1 : 0;

    // Create an array to store transaction IDs
    const transactionIds = [];

    // If you have a Transaction model, you can save transactions and collect their IDs
    if (transactions && transactions.length > 0) {
      for (const transactionData of transactions) {
        const newTransaction = new Transaction(transactionData);
        await newTransaction.save();
        transactionIds.push(newTransaction._id);
      }
    }

    // Combine block data into a block object
    const blockData = {
      timeStamp,
      blockHeight,
      transactions: transactionIds,
      previousHash,
      validator,
      validatorSignature,
    };

    // Calculate the hash of the block data
    const blockDataString = JSON.stringify(blockData);
    const hash = crypto.createHash('sha256').update(blockDataString).digest('hex');

    // Create the new block
    const newBlock = new Block({
      ...blockData,
      hash,
    });

    // Save the new block to the database
    await newBlock.save();

    return newBlock; // Return the newly created block
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBlock,
};
