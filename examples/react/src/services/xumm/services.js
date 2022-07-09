/* eslint-disable max-len */
// import {
//   apiXummGuestPayload as xummGuestPayloadApi,
//   apiXummGuestBlob as xummGuestBlobApi,
// } from './api';

// Xumm Guest Payload
// [START] Xumm Guest Payload
export const xummGuestPayload = (
  payload,
  api = () => {}
) => api(payload).then((response) => response.payloadId).catch((error) => {
  throw error;
});
// [END] Xumm Payload

// Xumm Guest Blob
// [START] Xumm Guest Blob
export const xummGuestBlob = (
  payloadID,
  api = () => {}
) => api(payloadID).then((response) => response.txblob).catch((error) => {
  throw error;
});
// [END] Xumm Guest Blob