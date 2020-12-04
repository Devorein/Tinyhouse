import React from "react"
import { useMutation, useQuery } from "@apollo/client";
import List from "antd/es/list";

import { LISTINGS, DELETE_LISTING } from "./graphql";
import { DeleteListing as DeleteListingsData, DeleteListingVariables } from "./__generated__/DeleteListing";
import { Listings as ListingsData } from "./__generated__/Listings";

export const Listings = ({ title }: { title: string }) => {

  const { loading, data, error, refetch } = useQuery<ListingsData>(LISTINGS)
  const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<DeleteListingsData, DeleteListingVariables>(DELETE_LISTING);

  const listingsList = data ? <List itemLayout="horizontal" dataSource={data.listings} renderItem={(listing) => (
    <List.Item>
      <List.Item.Meta>{listing.title}</List.Item.Meta>
      <button onClick={async () => {
        await deleteListing({ variables: { id: listing.id } })
        refetch();
      }}>Delete listings</button>
    </List.Item>
  )} /> : <div>No listings available</div>;

  return <div>
    <h1>{title}</h1>
    {deleteListingLoading ? <div>Deletion in progress</div> : null}
    {deleteListingError ? <div>Error Deleting listing</div> : null}
    {error ? <div>An unexpected error occurred</div> : loading ? <div>Loading</div> : listingsList}
  </div>
}