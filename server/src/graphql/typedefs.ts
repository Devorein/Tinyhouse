import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input LogInInput{
    code: String!
  }

  type Query{
    authUrl: String!
    user(id: ID!): User!
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
    id: ID!
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type User{
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
    hasWallet: Boolean!
  }

  enum ListingType{
    APARTMENT
    HOUSE
  }

  type Listing{
    id: ID!
    title: String!
    description: String!
    image: String!
    host: User!
    type: ListingType
    address: String!
    city: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
    price: Int!
    numOfGuests: Int!  
  }

  type Booking{
    id: ID!
    listing: Listing!
    tenant: User!
    checkIn: String!
    checkOut: String!
  }
`