require('dotenv').config();

const express = require('express');
const mongoose=require('mongoose');
const workoutRoutes = require('./routes/workouts');

// create the app
const app = express();

// middleware

// attach req body to the req object
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path);
    console.log(req.method);
    // release req to next piece of middleware
    next();
})

app.use('/api/workouts',workoutRoutes);

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to DB & listening on port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
