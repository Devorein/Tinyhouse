import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useMutation, ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Affix, Layout } from "antd";

import "./styles/index.css"

import { Home, Host, Listing, NotFound, User, Login, Listings, AppHeader } from "./components";
import { Viewer } from './types';
import { LOG_IN } from './graphql/mutations/Login';
import { LogIn as LoginData, LogInVariables } from './graphql/mutations/__generated__/LogIn';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
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
      if (data?.logIn) setViewer(data.logIn)
    }
  });

  const loginRef = useRef(login);

  useEffect(() => {
    loginRef.current();
  }, [])

  return <Router>
    <Layout id="app">
      <Affix offsetTop={0} className="app__affix-header">
        <AppHeader viewer={viewer} setViewer={setViewer} />
      </Affix>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/listing:id" component={Listing} />
        <Route exact path="/listings/:location?" component={Listings} />
        <Route exact path="/user/:id" component={User} />
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
