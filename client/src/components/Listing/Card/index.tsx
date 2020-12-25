import React from "react";
import { Typography, Card } from "antd";
import { Listings_listings } from "../../Listings/__generated__/Listings";
import { UserOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export const ListingCard = (props: Omit<Listings_listings, "numOfBeds" | "numOfBaths" | "rating" | "id">) => {
  const { address, image, numOfGuests, price, title } = props;
  return <Card cover={<div style={{ backgroundImage: `url(${image})` }} />} className="listing-card__cover-img" hoverable>
    <div className="listing-card__details">
      <div className="listing-card__description">
        <Title className="listing-card__price">{price} <span>/day</span></Title>
        <Text className="listing-card__title" ellipsis strong>{title}</Text>
        <Text className="listing-card__address" ellipsis>{address}</Text>
      </div>
      <div className="listing-card__dimensions listing-card__dimensions--guests">
        <UserOutlined />
        <Text>{numOfGuests} guests</Text>
      </div>
    </div>
  </Card>
}