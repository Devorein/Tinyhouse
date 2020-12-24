import React from "react";
import { Avatar, Card, Divider, Typography } from "antd";
import { UserProfileProps } from "./types";

const { Text, Paragraph, Title } = Typography;

export const UserProfile = ({ user }: UserProfileProps) => {
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
    </Card>
  </div>
}

export * from "./types"