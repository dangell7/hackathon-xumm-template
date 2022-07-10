import React, { ReactNode, useState, useEffect, createContext } from "react";
// apollo
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const initialState = {
  graph: undefined,
  method: 'xrplgraph'
};

const XrplGraphContext = createContext(initialState);

export function XrplGraphProvider({ children }) {
  const httpProvider = process.env.WSS_XRPL_CHAIN;

  const [client, setClient] = useState(undefined);

  useEffect(() => {
    // Connect to network
    const connectToNetwork = async () => {
      const client = new ApolloClient({
        uri: "http://localhost:4000",
        // uri: process.env.REACT_APP_BASE_SERVER_URI,
        cache: new InMemoryCache(),
      });
      setClient(client);
    };
    connectToNetwork();
  }, [httpProvider]);

  if (!client) {
    return null;
  }

  return (
    <XrplGraphContext.Provider
      value={{
        method: "xrplgraph",
        graph: client,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </XrplGraphContext.Provider>
  );
}

export const XrpGraphConsumer = XrplGraphContext.Consumer;

export default XrplGraphContext;
