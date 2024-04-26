import mongoose from 'mongoose';

const connectToDB = (): Promise<typeof mongoose> => {
  const MONGODB_URI: string = 'mongodb://127.0.0.1:27017/workoutApp';
  return mongoose.connect(MONGODB_URI);
};

const startServer = (app: any, PORT: number | string): void => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export { connectToDB, startServer };