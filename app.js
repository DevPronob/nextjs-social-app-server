const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON requests

const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => console.log("Connected"));

app.use('/api/user', require('./routes/userRoute'));
app.use('/api/post', require('./routes/postRoute'));
app.use('/api/comment', require('./routes/commentRoute'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
