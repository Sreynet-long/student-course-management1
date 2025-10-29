'use client'
import {ApolloProvider} from "@apollo/client/react";
import {ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function createApolloClient(){
    return new ApolloClient({
        link: new HttpLink({
            uri: " http://localhost:6380/graphql", //Replace your endpoint (api link) here!
            fetch
        }),
        cache: new InMemoryCache()
    })
}

const client = createApolloClient()

export function ApolloWrapper({children}){
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}