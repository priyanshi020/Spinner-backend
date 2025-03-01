const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require('cors'); 
const userRoutes = require('./routes/userRoute');
const cashfreeRoutes=require('./routes/cashfreeRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8003;


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use("/users", userRoutes);
app.use('/cashfree',cashfreeRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

