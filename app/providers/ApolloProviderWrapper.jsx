"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || "http://localhost:4000/graphql",
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
