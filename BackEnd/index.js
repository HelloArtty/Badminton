const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Connect to DB
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

const app = express();
const port = 5000;

app.use(express.json());
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
