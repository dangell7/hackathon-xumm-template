// https://github.com/dangell7/xrpl-ipfs-apollo-graphql

import * as dotenv from 'dotenv';
// xrpl
import { 
  Client,
} from 'xrpl';
// apollo
import { 
  ApolloServer, 
  ApolloError, 
  ValidationError
} from 'apollo-server';
// types
import {
  XLS20Schema
} from './types/ipfs';
import {
  AccountNFToken,
  NFTokenOffer
} from './types/xrpl';
import {
  XummAppPayload,
  XummPayloadResponse,
  XummBlobResponse,
} from './types/xumm';
// db
import {
  g_xrplGraph_pins,
} from './services/xrplgraph';
import {
  _g_ipfs,
} from './services/ipfs';
import {
  _g_mintedNfts,
  _g_accountNfts,
  AccountNFTFilter,
  _g_nftSellOffers,
  _g_nftBuyOffers
} from './services/xrpl';
// type defs
import {
  typeDefs,
} from './typeDefs';
import { _c_xummPayload, _g_xummBlob } from './services/xumm';

// INIT XRPL
dotenv.config();
const xrplApi = new Client(process.env.XRPL_CHAIN_WSS);

g_xrplGraph_pins(xrplApi, process.env.XRPL_GRAPH_ACCOUNT);

xrplApi.connect();

const resolvers = {
  Mutation: {
    async createPayload(_: null, payload: { payload: XummAppPayload | undefined }) {
      try {
        console.log(payload);
        const uuid = await _c_xummPayload(payload.payload);
        console.log(uuid);
        
        const dict = { uuid };
        return dict as XummPayloadResponse || new ValidationError('Xumm payload not created');
      } catch (error) {
        console.log(error.message);
        
        throw new ApolloError(error);
      }
    },
  },
  Query: {
    async getPayload(_: null, args: { payloadId: string }) {
      try {
        return await _g_xummBlob(
          args.payloadId,
        ) as XummBlobResponse || new ValidationError('Xumm Payload not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async minted_nfts(_: null, args: { account: string, taxon: number | undefined }) {
      try {
        const filter: AccountNFTFilter = {
          taxon: args.taxon
        }
        return await _g_mintedNfts(
          xrplApi,
          args.account,
          filter
        ) as AccountNFToken[] || new ValidationError('AccountNFTokens not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async account_nfts(_: null, args: { account: string, taxon: number | undefined }) {
      try {
        const filter: AccountNFTFilter = {
          taxon: args.taxon
        }
        return await _g_accountNfts(
          xrplApi,
          args.account,
          filter
        ) as AccountNFToken[] || new ValidationError('AccountNFTokens not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  AccountNFToken: {
    async ipfs(nftoken: AccountNFToken) {
      try {
        return await _g_ipfs(
          nftoken.URI
        ) as XLS20Schema || new ValidationError('IPFS not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});