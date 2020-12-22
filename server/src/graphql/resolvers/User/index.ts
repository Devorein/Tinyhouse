import { IResolvers } from "apollo-server-express";

import { Context, User } from "../../../lib/types";
import { authorize } from "../../../lib/utils";
import { UserArgs, UserBookingsArgs, UserBookingsData, UserListingsArgs, UserListingsData } from "./types";

export const userResolvers: IResolvers = {
  Query: {
    user: async (_root: undefined, { id }: UserArgs, { db, req }: Context,) => {
      try {
        const user = await db.users.findOne({ _id: id });
        if (!user) throw new Error('User not found');
        const viewer = await authorize(db, req)
        if (viewer?._id) user.authorized = true;
        return user;
      } catch (err) {
        throw new Error(`User can't be queried. ${err.message}`)
      }
    }
  },
  User: {
    id: (user: User) => user._id,
    listings: async (user: User, { limit, page }: UserListingsArgs, { db }: Context) => {
      try {
        const user_listings_data: UserListingsData = {
          total: 0,
          result: []
        }

        const cursor = await db.listings.find({
          _id: { $in: user.listings }
        }).skip(page > 0 ? (page - 1) * limit : 0).limit(limit);

        user_listings_data.total = await cursor.count();
        user_listings_data.result = await cursor.toArray();

        return user_listings_data;
      } catch (err) {
        throw new Error("Failed to query user bookings")
      }
    },
    bookings: async (user: User, { limit, page }: UserBookingsArgs, { db }: Context) => {
      try {
        if (!user.authorized) return null;

        const user_bookings_data: UserBookingsData = {
          total: 0,
          result: []
        }

        const cursor = await db.bookings.find({
          _id: { $in: user.bookings }
        }).skip(page > 0 ? (page - 1) * limit : 0).limit(limit);

        user_bookings_data.total = await cursor.count();
        user_bookings_data.result = await cursor.toArray();

        return user_bookings_data;
      } catch (err) {
        throw new Error("Failed to query user bookings")
      }
    },
    hasWallet: (user: User) => Boolean(user.walletId),
    income: (user: User) => user.authorized ? user.income : null,
  }
}