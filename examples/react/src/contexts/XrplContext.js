import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
// xrpl
import { Client } from 'xrpl';

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

  useEffect(() => {
    // Connect to network
    const connectToNetwork = async () => {
      console.log(httpProvider);

      const client = new Client(httpProvider);
      await client.connect();
      setClient(client);
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
