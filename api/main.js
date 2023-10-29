const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
process.env.NODE_ENV == 'production' ? '' : require('dotenv').config;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Test Api
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Api Working!', success: true });
});

app.listen(4000);
