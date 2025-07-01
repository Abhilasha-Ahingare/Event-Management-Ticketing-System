const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.DATA_BASE_URL) {
      throw new Error("DATA_BASE_URL IS NOT DEFINE IN ENV FILE ");
    }

    const connection = await mongoose.connect(process.env.DATA_BASE_URL);
    console.log(`DATA_BASE_URL: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
