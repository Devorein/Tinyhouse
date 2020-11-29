import React from "react"

import { server } from "../../utils"

const LISTINGS = `
  query Listings{
    listings{
      id
      title
      image
      address
      price
      rating
    }
  }
`;

interface ListingProps {
  title: string
}

export const Listings = ({ title }: ListingProps) => {
  const fetchListings = async () => {
    const listings = await server.fetch({ query: LISTINGS });
    console.log(listings);
  }

  return <div>
    <h2>{title}</h2>
    <button onClick={fetchListings}>Fetch listings</button>
  </div>
}