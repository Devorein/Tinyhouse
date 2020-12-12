import React from "react";
import { Card, Layout, Typography } from "antd";
import { useApolloClient } from "@apollo/client";

import googleLogo from "./assets/google_logo.jpg";
import { LoginProps } from "./types";
import { AuthUrl } from "../../graphql/queries/__generated__/AuthUrl";
import { AUTH_URL } from "../../graphql/queries/authurl";

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = ({ setViewer }: LoginProps) => {
  const client = useApolloClient();
  const handleGoogleAuthorize = async () => {
    try {
      const { data: { authUrl } } = await client.query<AuthUrl>({
        query: AUTH_URL
      })
      window.location.href = authUrl;
    } catch (err) {
    }
  }

  return <Content className="log-in">
    <Card className="log-in-card">
      <div className="log-in-card__intro">
        <Title level={3} className="log-in-card__intro-title">
          <span role="img" aria-label="wave">
            👋
          </span>
        </Title>
        <Title level={3} className="log-in-card__intro-title">
          Log in to Tinyhouse!
        </Title>
        <Text>
          Sign in with Google to start booking available rentals!
        </Text>
      </div>
      <button className="log-in-card__google-button" onClick={handleGoogleAuthorize}>
        <img src={googleLogo} alt="Google Logo" className="log-in-card__google-button-logo" />
        <span className="log-in-card__google-button-text">Sign in with Google</span>
      </button>
      <Text type="secondary">
        Note: By signing in, you'll be redirected to the Google consent form to sign in
        with your Google account.
      </Text>
    </Card>
  </Content>
}