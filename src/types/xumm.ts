
export interface XummTx {
  TransactionType: string;
  Destination: string;
  Amount: string;
  Fee: string;
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
export interface XummPayload {
  txjson: XummTx;
  options: XummOptions;
}
export type XummPayloadResponse = {
  uuid: string;
}