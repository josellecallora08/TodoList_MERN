const express = require('express');
const app = express();
const TaskRoutes = require('./routes/tasks')
const UserRoutes = require("./routes/users")
const cors = require('micro-cors');
const mongoose = require('mongoose')
require('dotenv').config();



// middleware
app.use(express.json());
app.use(cors())

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