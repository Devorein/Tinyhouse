import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { USER } from "../../graphql/queries";
import { User as UserData, UserVariables } from "../../graphql/queries/__generated__/User";
import { Col, Row, Layout } from "antd";

import { UserProfile } from "./UserProfile";
import { Viewer } from "../../types";
import { PageSkeleton } from "../PageSkeleton";
import { ErrorBanner } from "../Shared";

const { Content } = Layout;

interface MatchParams {
  id: string
}
const PAGE_LIMIT = 5;
export const User = ({ match }: RouteComponentProps<MatchParams> & { viewer: Viewer }) => {
  const [listings_page, setListingsPage] = useState(0);
  const [bookings_page, setBookingsPage] = useState(0);

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
      bookingsPage: bookings_page,
      listingsPage: listings_page,
      limit: PAGE_LIMIT
    }
  });

  if (loading) return <Content className="user"><PageSkeleton /></Content>
  if (error) return <Content className="user"><ErrorBanner description="We've encountered an error" /> <PageSkeleton /></Content>;

  const user = data?.user;
  const viewerIsUser = user?.id === match.params.id;

  const user_listings = user?.listings ?? null, user_bookings = user?.bookings ?? null;
  const userListingsElement = user_listings ? <UserListings user_listings={user_listings} listings_page={listings_page} setListingsPage={setListingsPage} page_limit={PAGE_LIMIT} /> : null
  const userBookingsElement = user_listings ? <UserBookings user_bookings={user_bookings} bookings_page={bookings_page} setBookingsPage={setBookingsPage} page_limit={PAGE_LIMIT} /> : null

  const userProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null;

  return (
    <Content className="user">
      <Row gutter={12} align="middle" justify="space-between">
        <Col xs={24} >{userProfileElement}</Col>
        <Col xs={24}>
          {userListingsElement}
          {userBookingsElement}
        </Col>
      </Row>
    </Content>
  )
}