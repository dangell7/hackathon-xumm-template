
import axios from 'axios';
import {
  convertHexToString,
} from 'xrpl';

import {
  XLS20Schema
} from '../types/ipfs';

type IPFSResponse = {
  data: unknown;
};

// import { IPFS, create } from 'ipfs-core';
// import { base64 } from "multiformats/bases/base64"
// import { CID } from 'multiformats/cid'

// let ipfsApi = create();

// const initIPFS = async () => {
//   await ipfsApi;
// }

// initIPFS()

export const getIPFS = async (id: string) => {
  try {
    const { data, status } = await axios.get<IPFSResponse>(
      `${process.env.IPFS_HTTPS_URL}/ipfs/${id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    // console.log(JSON.stringify(data, null, 4));

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export const _g_ipfs_cid = (uri: string) => {
  try {
    console.log('[IPFS] CONVERTING URI => CID');
    const ipfsURI = convertHexToString(uri);
    if (ipfsURI.split('://').at(0) !== 'ipfs' || ipfsURI === 'ipfs://') {
      return null;
    }
    const cidString = ipfsURI.split('ipfs://').at(-1);
    // const cid = cidString as unknown as CID
    // return cid
    return cidString;
  } catch(error) {
    throw error;
  }
}

// export const _p_ipfs_cid = async (cid: string) => {
//   try {
//     const api = await ipfsApi;
//     const pinset = await api.pin.add(cid);
//     console.log(pinset);
//   } catch(error) {
//     throw error;
//   }
// }

export const _g_ipfs = async (uri: string) => {
  console.log('[IPFS] FETCHING IPFS');
  const ipfsURI = convertHexToString(uri);
  if (ipfsURI.split('://').at(0) !== 'ipfs' || ipfsURI === 'ipfs://') {
    return null;
  }
  const cidString = ipfsURI.split('ipfs://').at(-1);
  const ipfsResponse = getIPFS(cidString)
  const ipfsData = ipfsResponse as unknown as XLS20Schema | undefined;
  return ipfsData;
}


/*

IPFS CODE (SLOW AS F)

*/

// import { IPFS, create } from 'ipfs-core';
// import { base64 } from "multiformats/bases/base64"
// import { CID } from 'multiformats/cid'

// const ipfsApi = create();

// const cid = cidString as unknown as CID
// const ipfsResponse = await readFile(await ipfsApi, cid);
// const ipfsData = JSON.parse(ipfsResponse) as unknown as IPFSv1Schema;

// const readFile = async (ipfs: IPFS, cid: CID): Promise<string> => {
//   const decoder = new TextDecoder()
//   let content = ''
//   for await (const chunk of ipfs.cat(cid)) {
//     content += decoder.decode(chunk)
//   }
//   return content
// }