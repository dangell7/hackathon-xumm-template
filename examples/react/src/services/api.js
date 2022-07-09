/* eslint camelcase: 0 */

const SamyApi = require('samy_api');
//
const defaultClient = SamyApi.ApiClient.instance;
const host = process.env.API_HOST === 'http://localhost'
  ? `${process.env.API_HOST}:${process.env.API_PORT}`
  : process.env.API_HOST;
defaultClient.basePath = `${host}/${process.env.API_VERSION}`;

// Xumm Guest Payload
// [START] Xumm Guest Payload
export function apiXummGuestPayload(payload) {
  const api = new SamyApi.XummApi();
  const body = new SamyApi.XummPayloadRequest(
    payload.options,
    payload.txjson,
  );
  return api.xummPayloadGuest(body);
}
// [END] Xumm Guest Payload

// Xumm Guest Blob
// [START] Xumm Guest Blob
export function apiXummGuestBlob(payloadId) {
  const api = new SamyApi.XummApi();
  const body = new SamyApi.XummBlobRequest(payloadId);
  return api.xummBlobGuest(body);
}
// [END] Xumm Blob