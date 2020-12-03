import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { Listings } from "./components";

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Listings title="Tinyhouse Listings" />
  </ApolloProvider>,
  document.getElementById('root')
);
