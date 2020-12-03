import React from "react"
import { useMutation, useQuery } from "@apollo/client";

import { LISTINGS, DELETE_LISTING } from "./graphql";
import { DeleteListingsData, DeleteListingsVariables, ListingProps, ListingsData } from "./types";

export const Listings = ({ title }: ListingProps) => {

  const { loading, data, error, refetch } = useQuery<ListingsData>(LISTINGS)
  const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<DeleteListingsData, DeleteListingsVariables>(DELETE_LISTING);

  return <div>
    <h1>{title}</h1>
    {deleteListingLoading ? <div>Deletion in progress</div> : null}
    {deleteListingError ? <div>Error Deleting listing</div> : null}
    {error ? <div>An unexpected error occurred</div> : loading ? <div>Loading</div> : data ? data.listings.map(listing => {
      return <div key={listing.id}>
        <h2>{listing.title}</h2>
        <button onClick={async () => {
          await deleteListing({ variables: { id: listing.id } })
          refetch();
        }}>Delete listings</button>
      </div>
    }) : <div>No listings available</div>}
  </div>
}