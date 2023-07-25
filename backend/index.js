const express = require('express');
const app = express();
const TaskRoutes = require('./routes/tasks')
const UserRoutes = require("./routes/users")
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();



// middleware
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','http://localhost:4200');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
app.use("/api/task", TaskRoutes);
app.use("/api/user", UserRoutes)


// Connection to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to DB and Listening to port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.error("Error connecting to DB:", error)
})

module.exports = app