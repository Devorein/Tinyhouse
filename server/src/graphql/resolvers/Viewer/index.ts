import { IResolvers } from "apollo-server-express";
import crypto from "crypto";

import { Google } from "../../../lib/api";
import { Database, User, Viewer } from "../../../lib/types";
import { LogInArgs } from "./types";

const loginViaGoogle = async (code: string, token: string, db: Database): Promise<User> => {
  const { user } = await Google.logIn(code);
  if (!user) {
    throw new Error("Google Login failed")
  }

  const user_names = user?.names?.[0] ?? null;
  const user_name = user_names?.displayName ?? null;
  const user_id = user_names?.metadata?.source?.id ?? null;
  const user_avatar = user?.photos?.[0].url ?? null;
  const user_email_address = user?.emailAddresses?.[0].value ?? null;

  if (!user_name || !user_id || !user_avatar || !user_email_address)
    throw new Error("Google Login error")

  const update_res = await db.users.findOneAndUpdate({
    _id: user_id
  }, {
    $set: {
      name: user_name,
      contact: user_email_address,
      token,
      avatar: user_avatar
    }
  }, { returnOriginal: false });

  let viewer = update_res.value;

  if (!viewer) {
    const insert_result = await db.users.insertOne({
      _id: user_id,
      contact: user_email_address,
      avatar: user_avatar,
      bookings: [],
      listings: [],
      income: 0,
      token,
      name: user_name
    })
    viewer = insert_result.ops[0];
  }

  return viewer;
}

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: () => {
      try {
        return Google.authUrl
      } catch (err) {
        throw new Error(`Failed to fetch Google Auth Url. ${err}`)
      }
    }
  },
  Mutation: {
    logIn: async (_root: undefined, { input }: LogInArgs, { db }: { db: Database }): Promise<Viewer> => {
      try {
        const code = (input && input.code) ?? null;
        const token = crypto.randomBytes(16).toString('hex');
        const viewer: User | undefined = code ? await loginViaGoogle(code, token, db) : undefined;
        if (!viewer) {
          return {
            didRequest: true
          }
        }

        return { ...viewer, didRequest: true };

      } catch (err) {
        throw new Error(`Failed to login user: ${err}`)
      }
    },
    logOut: (): Viewer => {
      return { didRequest: true }
    }
  },
  Viewer: {
    id: (viewer: Viewer) => viewer._id,
    hasWallet: (viewer: Viewer) => viewer.walletId ? true : undefined
  }
}