import { useQuery } from "@apollo/client";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { USER } from "../../graphql/queries";
import { User as UserData, UserVariables } from "../../graphql/queries/__generated__/User";
import { Col, Row, Layout } from "antd";

import { UserProfile } from "./UserProfile";
import { Viewer } from "../../types";

const { Content } = Layout;

interface MatchParams {
  id: string
}

export const User = ({ match }: RouteComponentProps<MatchParams> & { viewer: Viewer }) => {
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id
    }
  });

  const user = data?.user;
  const viewerIsUser = user?.id === match.params.id;

  const userProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null;

  return (
    <Content className="user">
      <Row gutter={12} align="middle" justify="space-between">
        <Col xs={24} >{userProfileElement}</Col>
      </Row>
    </Content>
  )
}