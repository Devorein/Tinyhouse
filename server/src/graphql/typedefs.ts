import { gql } from "apollo-server-express";

export const typeDefs = gql`
  
  input LogInInput{
    code: String!
  }

  type Query{
    authUrl: String!
  }

  type Mutation{
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }

  type Viewer{
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }
`