require("dotenv").config();
const mongoose = require("mongoose");
const Events = require("./Models/Event_model");
const event = require("./Data-API/Events");

const start = async () => {
  try {
    await mongoose.connect(process.env.DATA_BASE_URL);
    await Events.deleteMany();
    await Events.insertMany(event);
    console.log("event inserted sucessfully");
    process.exit();
  } catch (error) {
    console.log("error seeding data", error);
    process.exit(1);
  }
};

start();
