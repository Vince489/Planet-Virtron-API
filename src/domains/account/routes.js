const express = require("express");
const router = express.Router();

const Mnemonic = require("./../../utils/seedPhrase");
const Keypair = require("./../../utils/keypair");
const TokenAccount = require("./../token_account/model");
const Account = require("./model");
const VRT = require("./../VRT/model");
const SeedPhrase = require("./../seedPhrase/model");
const VRTAccount = require("./../vrtAccount/model");

const auth = require("./../../middleware/auth");

// create a new account and associate it with logged in gamer
// router.post("/", auth, async (req, res) => {
//   try {
//     // Retrieve the gamer from the database using token from cookie
//     const gamer = req.user;
//     console.log(gamer);

//     // Generate a new keypair
//     const keypair = Keypair.generate();

//     // Create a new account
//     const account = new Account({
//       address: keypair.publicKey,
//       secret: keypair.secretKey,
//       gamer: gamer.id,
//     });

//     // Save the account to the database
//     await account.save();


//     // Add the account to the gamer's list of accounts
//     gamer.accounts.push(account.id);
//     await gamer.save();

//     // Return the account as a JSON object
//     res.status(200).json({ message: "Account created successfully.", account });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// get all accounts
router.get("/", async (req, res, next) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

// Create a new NativeTokenAccount
router.post("/", async (req, res, next) => {
  try {
    // Generate a new key pair and seed phrase
    const keypair = Keypair.generate();
    const seedPhrase = Mnemonic.generate();

    // Create a new seed phrase document
    const newSeedPhrase = new SeedPhrase({
      seedPhrase: seedPhrase.seedPhrase,
    }); 

    // Save the new seed phrase to the database
    await newSeedPhrase.save();

    // Create a new account associated with the seed phrase
    const newAccount = new Account({
      seedPhrase: newSeedPhrase._id, // Reference the saved seed phrase document
      publicKey: keypair.publicKey,
      privateKey: keypair.privateKey,
    });

    // Generate a new public key for the token account
    const tokenAccountPublicKey = Keypair.generate().publicKey;

    // Save the new account to the database
    await newAccount.save();

    // Retrieve the seed phrase document from the database using its ID
    const retrievedSeedPhrase = await SeedPhrase.findById(newSeedPhrase._id);

    // Respond with the newly created account data and the seed phrase
    res.status(201).json({
      account: newAccount,
      seedPhrase: retrievedSeedPhrase.seedPhrase,
    });
  } catch (error) {
    next(error);
  }
});




router.post('/airdrop', async (req, res) => {
  try {
    const { userPublicKey } = req.body; // Extract the user's public key from the request body

    // Check if the token account exists (using the user's public key)
    const recipientAccount = await TokenAccount.findOne({ owner: userPublicKey });

    if (!recipientAccount) {
      return res.status(404).json({ error: 'Token account not found.' });
    }

    // Check if the recipient has already received the airdrop
    if (recipientAccount.airdropReceived) {
      return res.status(400).json({ error: 'Airdrop already received.' });
    }

    // Decrement the token balance for airdrop
    const tokenToAirdrop = await VRT.findOne({ mint: 'VRT1111111111111111111111111111111111111111' });

    if (!tokenToAirdrop) {
      return res.status(404).json({ error: 'Token not found.' });
    }

    const amountToAirdrop = 100; // Define the amount to be airdropped

    if (tokenToAirdrop.balance < amountToAirdrop) {
      return res.status(400).json({ error: 'Insufficient token balance for airdrop.' });
    }

    tokenToAirdrop.balance -= amountToAirdrop;
    await tokenToAirdrop.save();

    // Increment the recipient's token account balance
    recipientAccount.balance += amountToAirdrop;
    recipientAccount.airdropReceived = true;
    await recipientAccount.save();

    res.status(200).json({ message: 'Airdrop successful.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;