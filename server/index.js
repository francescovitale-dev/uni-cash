const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const { readdirSync } = require('fs');

const app = express();
require('dotenv').config();

const { PORT, MONGO_URL } = process.env;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const routeFiles = readdirSync('./routes');
routeFiles.map(route => app.use('/api/v1', require('./routes/' + route)));


const server = async () => {
  try {
    await connectDB(MONGO_URL);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};


server();
