
import { XummSdk, XummTypes } from "xumm-sdk";
import { CreatedPayload } from "xumm-sdk/dist/src/types";
import { XummPayload } from "../types/xumm";

export const _c_xummPayload = async (
  payload: XummPayload,
) => {
  const sdk = new XummSdk();
  const txjson = payload.txjson as unknown as XummTypes.XummJsonTransaction;
  txjson.TransactionType = "Payment";
  const newPayload: XummTypes.CreatePayload = { txjson: txjson, options: payload.options }
  const response: CreatedPayload = await sdk.payload.create(newPayload, true);
  return response.uuid;
}