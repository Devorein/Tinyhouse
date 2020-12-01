import React from "react"
import { useQuery } from "../../hooks";

import { server } from "../../utils"
import { LISTINGS, DELETE_LISTING } from "./graphql";
import { DeleteListingsData, DeleteListingsVariables, ListingProps, ListingsData } from "./types";

export const Listings = ({ title }: ListingProps) => {

  const { state: { loading, data, error }, refetch } = useQuery<ListingsData>(LISTINGS)
  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingsVariables>({
      query: DELETE_LISTING,
      variables: {
        id
      }
    });
    refetch()
  }

  return <div>
    <h1>{title}</h1>
    {error ? <div>An unexpected error occurred</div> : loading ? <div>Loading</div> : data ? data.listings.map(listing => {
      return <div id={listing.id}>
        <h2>{listing.title}</h2>
        <button onClick={deleteListing.bind(null, listing.id)}>Delete listings</button>
      </div>
    }) : <div>No listings available</div>}
  </div>
}