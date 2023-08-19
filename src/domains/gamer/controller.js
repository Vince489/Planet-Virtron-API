const Gamer = require("./model");
const { hashData } = require("./../../utils/hashData");
const createJWT = require("../../utils/createJWT");
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
    return createdGamer;
  } catch (error) {
    throw error;
  }
};

const authenticateGamer = async (data, res) => {
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

    // create jwt token and add to cookie
    const tokenData = { gamerId: fetchedGamer._id, gamerTag };
    const token = await createJWT(tokenData);

    // assign Gamer token
    fetchedGamer.token = token;

    return fetchedGamer;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewGamer, authenticateGamer };
