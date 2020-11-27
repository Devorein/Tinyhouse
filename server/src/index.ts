import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from "./database";

const port = 9001;

const mount = async (app: Application) => {
  const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) });
  const db = await connectDatabase();
  server.applyMiddleware({ app, path: '/api' });
  app.listen(port);
  console.log(`[app] : http://localhost:${port}`);

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
}

mount(express())
