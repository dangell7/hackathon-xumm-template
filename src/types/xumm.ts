
export interface XummTx {
  TransactionType: string;
  Destination?: string;
  Amount: string;
  Fee: string;
  NFTokenSellOffer?: string;
}
export interface XummReturnUrl {
  web?: string;
  mobile?: string;
}
export interface XummOptions {
  submit: boolean;
  expire: number;
  return_url: XummReturnUrl;
}
export interface XummAppPayload {
  txjson: XummTx;
  options: XummOptions;
}
export type XummPayloadResponse = {
  uuid: string;
}
export type XummBlobResponse = {
  txid: string;
  account: string;
}