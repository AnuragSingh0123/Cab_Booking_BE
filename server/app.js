const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");

app.use(cors());
app.use(express.json());

let connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/cab_db')
    .then(()=> console.log("Connected to Database"))
    .catch(()=> console.log("Error while connecting to database"))
}


app.get("/auth/login", (req, res) => {

})

app.post("/auth/sign-up", async (req, res)=> {
    console.log(req.body);
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json({message: "User added successfully"});
    } catch (err) {
        res.status(500).json({ error: "Error while saving user" });
    }
})

app.get("/", (req,res)=> {
    res.send("App is up and running");
})

app.listen(3000, async () => {
    await connectDB();
    console.log("App running on http://localhost:3000");
})