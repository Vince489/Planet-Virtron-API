const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/auth");
const Account = require("./model");
const Keypair = require("../../utils/keypair");
const Gamer = require("./../gamer/model");

// create a new account and associate it with logged in gamer
router.post("/", auth, async (req, res) => {
  try {
    // Retrieve the gamer from the database using token from cookie
    const gamer = req.user;
    console.log(gamer);

    // Generate a new keypair
    const keypair = Keypair.generate();

    // Create a new account
    const account = new Account({
      address: keypair.publicKey,
      secret: keypair.secretKey,
      gamer: gamer.id,
    });

    // Save the account to the database
    await account.save();


    // Add the account to the gamer's list of accounts
    gamer.accounts.push(account.id);
    await gamer.save();

    // Return the account as a JSON object
    res.status(200).json({ message: "Account created successfully.", account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





module.exports = router;