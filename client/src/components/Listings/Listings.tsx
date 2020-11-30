import React, { useState } from "react"

import { server } from "../../utils"
import { DeleteListingsData, DeleteListingsVariables, Listing, ListingsData } from "./types";

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
  const [listings, setListings] = useState<Listing[] | null>(null);

  const fetchListings = async () => {
    const listings = await server.fetch<ListingsData>({ query: LISTINGS });
    setListings(listings.data.listings)
  }

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingsVariables>({
      query: DELETE_LISTING,
      variables: {
        id
      }
    });
    fetchListings();
  }

  return <div>
    <button onClick={fetchListings}>Fetch listings</button>
    {listings && listings.map(listing => {
      return <div id={listing.id}>
        <h2>{listing.title}</h2>
        <button onClick={deleteListing.bind(null, listing.id)}>Delete listings</button>
      </div>
    })}
  </div>
}