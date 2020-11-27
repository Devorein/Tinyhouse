require("dotenv").config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from "./database";

const mount = async (app: Application) => {
  const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) });
  const db = await connectDatabase();
  server.applyMiddleware({ app, path: '/api' });
  app.listen(process.env.PORT);
  console.log(`[app] : http://localhost:${process.env.PORT}`);
}

mount(express())
