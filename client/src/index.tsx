import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useMutation, ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Affix, Layout, Spin } from "antd";

import "./styles/index.css"

import { Home, Host, Listing, NotFound, User, Login, Listings, AppHeader } from "./components";
import { Viewer } from './types';
import { LOG_IN } from './graphql/mutations/Login';
import { LogIn as LoginData, LogInVariables } from './graphql/mutations/__generated__/LogIn';
import { AppHeaderSkeleton } from './components/AppHeader/Skeleton';
import { ErrorBanner } from './components/Shared';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
  headers: {
    "X-CSRF-TOKEN": sessionStorage.getItem("token") || ""
  }
});

const initialViewer: Viewer = {
  id: null,
  avatar: null,
  token: null,
  hasWallet: null,
  didRequest: false
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  const [login, { error }] = useMutation<LoginData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data?.logIn) {
        setViewer(data.logIn)
        sessionStorage.setItem("token", data.logIn.token ?? '')
      } else
        sessionStorage.removeItem("token")
    }
  });

  const loginRef = useRef(login);

  useEffect(() => {
    loginRef.current();
  }, [])

  if (!viewer.didRequest && !error) {
    return <Layout className="app-skeleton">
      <AppHeaderSkeleton />
      <div className="app-skeleton__spin-section">
        <Spin tip="Launching Tinyhouse" size="large" />
      </div>
    </Layout>
  }

  const loginErrorBannerElement = error ? <ErrorBanner description="We weren't able to log you in. Please try again later!" /> : null;

  return <Router>
    <Layout id="app">
      {loginErrorBannerElement}
      <Affix offsetTop={0} className="app__affix-header">
        <AppHeader viewer={viewer} setViewer={setViewer} />
      </Affix>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/listing:id" component={Listing} />
        <Route exact path="/listings/:location?" component={Listings} />
        <Route exact path="/user/:id" render={(props) => <User {...props} viewer={viewer} />} />
        <Route exact path="/login" render={(props) => <Login {...props} setViewer={setViewer} />} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
