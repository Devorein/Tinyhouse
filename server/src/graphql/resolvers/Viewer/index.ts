import { IResolvers } from "apollo-server-express";
import { Google } from "../../../lib/api";
import { Viewer } from "../../../lib/types";

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
    logIn: (): string => {
      return 'Mutation.logIn'
    },
    logOut: (): string => {
      return 'Mutation.logOut'
    }
  },
  Viewer: {
    id: (viewer: Viewer) => viewer._id,
    hasWallet: (viewer: Viewer) => viewer.walletId ? true : undefined
  }
}