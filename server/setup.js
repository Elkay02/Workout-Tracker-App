const mongoose = require('mongoose');

const connectToDB = () => {
  const MONGODB_URI='mongodb://127.0.0.1:27017/workoutApp';
  return mongoose.connect(MONGODB_URI);
};

const startServer = (app, PORT) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = 
{ 
  connectToDB, 
  startServer 
};