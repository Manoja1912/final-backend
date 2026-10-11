const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    } catch (err) {
        console.log("DB connection failed");
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;