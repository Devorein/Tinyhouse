import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Layout } from "antd";

import "./styles/index.css"

import { Home, Host, Listing, NotFound, User, Login, Listings } from "./components";

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
});

const App = () => {
  return <Router>
    <Layout id="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/listing:id" component={Listing} />
        <Route exact path="/listings/:location?" component={Listings} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/login" component={Login} />
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
