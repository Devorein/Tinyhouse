import { IResolvers } from "apollo-server-express";

import { Context } from "../../../lib/types";
import { UserArgs } from "./types";

export const userResolvers: IResolvers = {
  Query: {
    user: async (_root: undefined, { id }: UserArgs, { db }: Context,) => {
      try {
        const user = await db.users.findOne({ _id: id });
        if (!user) throw new Error('User not found');
        return user;
      } catch (err) {
        throw new Error(`User can't be queried. ${err.message}`)
      }
    }
  }
}