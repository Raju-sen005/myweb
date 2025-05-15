//This is a mongo connection file (Important File in the website)
const mongoose = require("mongoose");
const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/d-food", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection failed:", error.message);
  }
};
module.exports = connectToMongo;
