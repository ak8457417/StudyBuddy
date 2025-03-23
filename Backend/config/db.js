// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
//
// dotenv.config();
//
// const mongoURI = process.env.MONGO_URI;
// const dbName = process.env.DB_NAME;
// const botCollectionName = process.env.BOT_COLLECTION;
// const taxCollectionName = process.env.TAX_COLLECTION;
//
// let botCollection;
// let taxCollection;
//
// const connectDB = async () => {
//     try {
//         const client = new MongoClient(mongoURI);
//         await client.connect();
//         console.log("✅ Connected to MongoDB");
//
//         const db = client.db(dbName);
//         botCollection = db.collection(botCollectionName);
//         taxCollection = db.collection(taxCollectionName);
//     } catch (error) {
//         console.error("❌ MongoDB connection error:", error);
//         process.exit(1);
//     }
// };
//
// export { connectDB, botCollection, taxCollection };
// export default connectDB;


import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
// const botCollectionName = process.env.BOT_COLLECTION;
// const taxCollectionName = process.env.TAX_COLLECTION;
//
// let botCollection;
// let taxCollection;

// User Schema and Model (Mongoose)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// MongoDB Client Connection
const connectDB = async () => {
    try {
        // Using MongoClient to connect to the database
        // const client = new MongoClient(mongoURI);
        // await client.connect();
        // console.log("✅ Connected to MongoDB");

        // Get database and collections
        // const db = client.db(dbName);
        // botCollection = db.collection(botCollectionName);
        // taxCollection = db.collection(taxCollectionName);

        // Now connect Mongoose for the User model
        await mongoose.connect(mongoURI, { dbName });
        console.log("✅ Connected to MongoDB via Mongoose for User model");

    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

// export { connectDB, botCollection, taxCollection, User };
export { connectDB, User };
export default connectDB;
