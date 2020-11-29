import React from "react"

import { server } from "../../utils"
import { ListingsData } from "./types";

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

interface ListingProps {
  title: string
}

export const Listings = ({ title }: ListingProps) => {
  const fetchListings = async () => {
    const listings = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(listings);
  }

  return <div>
    <h2>{title}</h2>
    <button onClick={fetchListings}>Fetch listings</button>
  </div>
}