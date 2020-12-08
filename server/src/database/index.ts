import { MongoClient } from "mongodb";
import { Database, Listing, User, Booking } from "../lib/types";

const { DB_USER, DB_USER_PASSWORD, DB_CLUSTER } = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mongodb.net/tinyhouse?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db('main');

  return {
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users'),
    bookings: db.collection<Booking>('bookings'),
  }
}