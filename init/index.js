const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderLust";

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({ ...obj, owner: "68a895adaf85d62a2008ea80"}));
    await Listing.insertMany(initData.data);
    console.log("data was initalized.");
};

initDB();
