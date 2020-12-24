import React, { Fragment } from "react";
import { Avatar, Button, Card, Divider, Typography } from "antd";
import { UserProfileProps } from "./types";

const { Text, Paragraph, Title } = Typography;

export const UserProfile = ({ user, viewerIsUser }: UserProfileProps) => {
  const additionalDetailsComponent = viewerIsUser ? <Fragment>
    <Divider />
    <div className="user-profile__details">
      <Title level={4}>Additional Details</Title>
      <Paragraph>
        Interested in becoming a Tinyhouse host. Sign in with your Stripe account!
    </Paragraph>
      <Button type="primary" className="user-profile__details-cta">Connect to Stripe</Button>
      <Paragraph type="secondary">
        Tinyhouse uses stripe to transfer your account details.
    </Paragraph>
    </div>
  </Fragment> : null;

  return <div className="user-profile">
    <Card className="user-profile__card">
      <div className="user-profile__avatar">
        <Avatar src={user.avatar} size={100} />
      </div>
      <Divider />
      <div className="user-profile__details">
        <Title level={4}>Details</Title>
        <Paragraph>
          Name: <Text strong>{user.name}</Text>
        </Paragraph>
        <Paragraph>
          Contact: <Text strong>{user.contact}</Text>
        </Paragraph>
      </div>
      {additionalDetailsComponent}
    </Card>
  </div>
}

export * from "./types"