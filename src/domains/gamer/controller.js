const Gamer = require("./model");
const { hashData } = require("./../../utils/hashData");
const { verifyHashedData } = require("./../../utils/hashData");


const createNewGamer = async (data) => {
  try {
    const { gamerTag, email, password } = data;

    // Checking if gamer already exists
    const existingGamer = await Gamer.findOne({ gamerTag });

    if (existingGamer) {
      throw Error('A gamer with this GamerTag already exists');
    }

    // hash password
    const hashedPassword = await hashData(password);
    const newGamer = new Gamer({
      gamerTag,
      email,
      password: hashedPassword,
    });
    // save gamer
    const createdGamer = await newGamer.save();
    return {createdGamer};
  } catch (error) {
    throw error;
  }
};

const authenticateGamer = async (data) => {
  try {
    const { gamerTag, password } = data;

    const fetchedGamer = await Gamer.findOne({ gamerTag });

    if (!fetchedGamer) {
      throw Error("Invalid credentials entered!");
    }

    if (!fetchedGamer.verified) {
      throw Error("Email hasn't been verified yet. Check your inbox.");
    }

    const hashedPassword = fetchedGamer.password;
    const passwordMatch = await verifyHashedData(password, hashedPassword);

    if (!passwordMatch) {
      throw Error("Invalid password entered!");
    }
    return {
      _id: fetchedGamer._id,
      gamerTag: fetchedGamer.gamerTag,
      email: fetchedGamer.email,
      verified: fetchedGamer.verified,
      fighters: fetchedGamer.fighters
    }; 
  } catch (error) {
    throw error; 
  }
};

module.exports = { createNewGamer, authenticateGamer };
