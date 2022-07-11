import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
// xrpl
import { Client, SubscribeRequest } from 'xrpl';

const initialState = {
  wallet: undefined,
  xrpl: undefined,
  method: 'xrpl',
};

const XrplContext = createContext(initialState);

export function XrplProvider({ children }) {
  const httpProvider = process.env.REACT_APP_XRPL_CHAIN_WSS;

  const [wallet, setWallet] = useState(undefined);
  const [client, setClient] = useState(undefined);
  const [offers, setOffers] = useState([]);

  const listenOffers = async (c) => {
    console.log('LISTENING TO OFFERS');
    // const request = SubscribeRequest(
    //   streams=[StreamType.transactions]
    // )
    const response = await c.request({
      command: 'subscribe',
      streams: ['transactions'],
      accounts: [process.env.REACT_APP_XRPL_GRAPH_ACCOUNT],
    });
    console.log(response);
  }

  useEffect(() => {
    // Connect to network
    const connectToNetwork = async () => {
      console.log(httpProvider);

      const client = new Client(httpProvider);
      client.on('connected', () => {
        console.log('connected');
      });
      client.on('message', (data) => {
        console.log('message');
        console.log(data);
      });
      client.on('disconnected', () => {
        // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
        // will be 1000 if this was normal closure
        console.log('disconnected');
      });
      await client.connect();
      setClient(client);
      // listenOffers(client);
    };
    connectToNetwork();
  }, [httpProvider]);

  if (!client) {
    return null;
  }

  return (
    <XrplContext.Provider
      value={{
        method: 'xrpl',
        xrpl: client,
        wallet,
      }}
    >
      {children}
    </XrplContext.Provider>
  );
}

XrplProvider.propTypes = {
  children: PropTypes.node,
};

export const XrpConsumer = XrplContext.Consumer;

export default XrplContext;
