const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const connect = () => {
  if (process.env.NODE_ENV === "test") {
    return connectDB(process.env.ATLAS_TEST_URI).then(() => {
      console.log(`Connected to ${process.env.NODE_ENV} db`);
    }).catch((err) => console.log(err.message));
  } else {
    return connectDB(process.env.ATLAS_URI).then(() => {
       console.log(`Connected to dev db`);
      }).catch((err) => console.log(err.message));
  }
};

const disconnect = () => {
  try {
    mongoose.connection.close(() => {
      console.log(`Disconnected from ${process.env.NODE_ENV} db`);
      process.exit(0);
    });
  } catch (err) {
    console.error(err);
  }
};

const cleanDatabase = async () => {
  try {
    await mongoose.connection.db.dropDatabase();
  } catch (err) {
    console.error(err);
  }
};

const db = {
  connect,
  disconnect,
  cleanDatabase,
};

module.exports = db;