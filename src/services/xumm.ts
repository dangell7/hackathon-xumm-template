
import { XummSdk, XummTypes } from "xumm-sdk";
import { CreatedPayload, XummPayload } from "xumm-sdk/dist/src/types";
import { XummAppPayload } from "../types/xumm";

const sdk = new XummSdk();

export const _c_xummPayload = async (
  payload: XummAppPayload,
) => {
  const txjson = payload.txjson as unknown as XummTypes.XummJsonTransaction;
  if (payload.txjson.TransactionType == "Payment") {
    txjson.TransactionType = "Payment";
  }
  if (payload.txjson.TransactionType == "NFTokenAcceptOffer") {
    txjson.TransactionType = "NFTokenAcceptOffer";
  }
  const newPayload: XummTypes.CreatePayload = { txjson: txjson, options: payload.options }
  const response: CreatedPayload = await sdk.payload.create(newPayload, true);
  return response.uuid;
}

export const _g_xummBlob = async (
  payloadId: string,
) => {
  const response: XummPayload = await sdk.payload.get(payloadId);
  return {
    txid: response.response.txid,
    account: response.response.account,
  };
}