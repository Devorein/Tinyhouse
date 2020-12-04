import React from "react"
import { useMutation, useQuery } from "@apollo/client";
import { Button, Spin, List, Avatar } from "antd";

import { LISTINGS, DELETE_LISTING } from "./graphql";
import { DeleteListing as DeleteListingsData, DeleteListingVariables } from "./__generated__/DeleteListing";
import { Listings as ListingsData } from "./__generated__/Listings";
import { ListingsSkeleton } from "./ListingsSkeleton";

import "./index.css";

export const Listings = ({ title }: { title: string }) => {

  const { loading, data, error, refetch } = useQuery<ListingsData>(LISTINGS)
  const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<DeleteListingsData, DeleteListingVariables>(DELETE_LISTING);

  const ListingsList = data ? <div><h1>{title}</h1><List itemLayout="horizontal" dataSource={data.listings} renderItem={(listing) => (
    <List.Item actions={[<Button type="primary" onClick={async () => {
      await deleteListing({ variables: { id: listing.id } })
      refetch();
    }}>Delete</Button>]}>
      <List.Item.Meta title={listing.title} description={listing.address} avatar={<Avatar src={listing.image} shape="square" size={48} />} />
    </List.Item>
  )} /></div> : <div>No listings available</div>;

  return <div className="listings">
    <Spin spinning={deleteListingLoading}>
      {deleteListingError ? <div>Error Deleting listing</div> : null}
      {error ? <div>An unexpected error occurred</div> : loading ? <div className="listings"><ListingsSkeleton title={title} /></div> : ListingsList}
    </Spin>
  </div>
}