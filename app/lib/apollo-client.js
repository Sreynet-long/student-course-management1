// app/lib/apollo-client.js

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_END_POINT || 'http://localhost:4000/graphql',
  // You might need to add headers for authentication here later
  // headers: { authorization: 'Bearer YOUR_TOKEN' }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client; 