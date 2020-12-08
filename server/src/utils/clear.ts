require('dotenv').config();

import { connectDatabase } from "../database";


const clear = async () => {
  try {
    console.log(`[seed]: Running...`);
    const db = await connectDatabase();
    const bookings = await db.bookings.find({}).toArray();
    const users = await db.users.find({}).toArray();
    const listings = await db.listings.find({}).toArray();
    if (bookings.length)
      await db.bookings.drop()
    if (users.length)
      await db.users.drop()
    if (listings.length)
      await db.listings.drop()

    console.log(`[seed]: success`);

  } catch {
    throw new Error('Failed to seed database')
  }
}

clear();