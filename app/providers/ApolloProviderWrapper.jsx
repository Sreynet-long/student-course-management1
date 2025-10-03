"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs"; 
import { HttpLink } from "@apollo/client"; // ✅ still from normal client

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:4000/graphql", // replace with your GraphQL API
      fetchOptions: { cache: "no-store" },
    }),
  });
}

export default function ApolloProviderWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
