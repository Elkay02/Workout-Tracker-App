const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const exerciseRouter = require('./router');
const path = require('path');
const { connectToDB, startServer } = require('./setup');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(exerciseRouter);

if (require.main === module) {
  connectToDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1);
    });
}

module.exports = app;

