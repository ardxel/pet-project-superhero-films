import config from 'config';
import mongoose from 'mongoose';

class MongooseService {
  public readonly mongoose = mongoose;

  getMongoose() {
    return this.mongoose;
  }

  connectWithRetry(uriType: 'local' | 'online', retryMS = 5000) {
    const uri = uriType === 'local' ? config.mongodb.local_uri : config.mongodb.uri;
    const attemptLimit = 10;
    let attemptCount = 0;
    return new Promise((resolve, reject) =>
      this.getMongoose()
        .connect(uri)
        .then(() => {
          console.log('MongoDB is connected');
          resolve(1);
        })
        .catch((error) => {
          if (attemptLimit === attemptCount) {
            reject(error);
          }
          attemptCount++;
          console.log(`MongoDB connection unsuccessful (will retry after ${retryMS} seconds):`, error);
          setTimeout(this.connectWithRetry, retryMS);
        }),
    );
  }
}

export default new MongooseService();
