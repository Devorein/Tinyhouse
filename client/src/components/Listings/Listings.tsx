import React from "react"
import { useQuery } from "../../hooks";

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

  const { data } = useQuery<ListingsData>(LISTINGS)

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingsVariables>({
      query: DELETE_LISTING,
      variables: {
        id
      }
    });
  }

  return <div>
    {data?.listings ? data.listings.map(listing => {
      return <div id={listing.id}>
        <h2>{listing.title}</h2>
        <button onClick={deleteListing.bind(null, listing.id)}>Delete listings</button>
      </div>
    }) : <div>No listings available</div>}
  </div>
}