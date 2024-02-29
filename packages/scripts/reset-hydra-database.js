const mongoose = require('mongoose');

require('dotenv').config();

const HYDRA_MONGO_URL = process.env.HYDRA_MONGO_URL;

const run = async () => {
  try {
    await mongoose.connect(HYDRA_MONGO_URL, {});
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log('$script:', __filename);
    collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
        db.dropCollection(collectionName);
        console.log('$deleted:collection:', collectionName);
      });

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

run();
