import { MongoClient } from "mongodb";
import "../env";

const { user, user_password, cluster } = process.env;

const url = `mongodb+srv://${user}:${user_password}@${cluster}.mongodb.net/<dbname>?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db('main');

  return {
    listings: db.collection('test_listings')
  }
}