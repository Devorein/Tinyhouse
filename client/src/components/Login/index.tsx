import React, { useEffect, useRef } from "react";
import { Card, Layout, Spin, Typography } from "antd";
import { useApolloClient, useMutation } from "@apollo/client";

import googleLogo from "./assets/google_logo.jpg";
import { LoginProps } from "./types";
import { AuthUrl } from "../../graphql/queries/__generated__/AuthUrl";
import { AUTH_URL } from "../../graphql/queries/authurl";
import { LogIn as LogInData, LogInVariables } from "../../graphql/mutations/__generated__/LogIn";
import { LOG_IN } from "../../graphql/mutations/Login";
import { displayErrorMessage, displaySuccessNotification } from "../../utils";
import { ErrorBanner } from "../Shared";
import { Redirect } from "react-router-dom";

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = ({ setViewer }: LoginProps) => {
  const client = useApolloClient();
  const [login, { data: login_data, loading: login_loading, error: login_error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data.logIn) {
        setViewer(data.logIn);
        displaySuccessNotification("You've successfully logged in!");
        sessionStorage.setItem("token", data.logIn.token ?? "")
      }
    }
  });
  const loginRef = useRef(login);

  const handleGoogleAuthorize = async () => {
    try {
      const { data: { authUrl } } = await client.query<AuthUrl>({
        query: AUTH_URL
      })
      window.location.href = authUrl;
    } catch (err) {
      displayErrorMessage("Something went wrong while trying to log you in :(")
    }
  }

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      loginRef.current({
        variables: {
          input: { code }
        }
      })
    }
  }, [])

  if (login_loading)
    return <Content className="log-in">
      <Spin size="large" tip="Logging you in" />
    </Content>

  if (login_data?.logIn)
    return <Redirect to={`/user/${login_data.logIn.id}`} />

  return <Content className="log-in">
    {login_error && <ErrorBanner description="Something went wrong while trying to log you in :(" />}
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