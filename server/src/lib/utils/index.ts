import { Request } from "express";
import { Database } from "../types";

export const authorize = async (db: Database, req: Request) => {
  const user = await db.users.findOne({
    _id: req.signedCookies.viewer,
    token: req.get("X-CSRF-TOKEN")
  })
  return user;
}