import React from "react"

import { server } from "../../utils"
import { DeleteListingsData, DeleteListingsVariables, ListingsData } from "./types";

const LISTINGS = `
  query Listings{
    listings{
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!){
    deleteListing(id: $id){
      id
    }
  }
`;

interface ListingProps {
  title: string
}

export const Listings = ({ title }: ListingProps) => {
  const fetchListings = async () => {
    const listings = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(listings);
  }

  const deleteListing = async () => {
    const { data } = await server.fetch<DeleteListingsData, DeleteListingsVariables>({
      query: DELETE_LISTING,
      variables: {
        id: "5fc1374b92672214e0bffc9e"
      }
    })
    console.log(data);
  }

  return <div>
    <h2>{title}</h2>
    <button onClick={fetchListings}>Fetch listings</button>
    <button onClick={deleteListing}>Delete listings</button>
  </div>
}