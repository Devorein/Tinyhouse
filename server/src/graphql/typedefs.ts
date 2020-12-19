import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input LogInInput{
    code: String!
  }

  type Query{
    authUrl: String!
    user: String!
  }

  type Mutation{
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }

  type Bookings{
    total: Int!
    result: [Booking!]!
  }

  type Listings{
    total: Int!
    result: [Listing!]!
  }
  
  type Viewer{
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type User{
    id: String!
    name: String!
    avatar: String!
    contact: String!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
    hasWallet: Boolean!
  }
`