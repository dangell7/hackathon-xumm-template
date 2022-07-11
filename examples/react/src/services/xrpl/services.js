export const getNFTOffers = async (xrpl, address) => {
  const response = await xrpl.request({
    command: 'account_objects',
    account: address,
    ledger_index: 'validated',
    type: 'nft_offer',
    limit: 1000,
  });
  console.log(response.result.account_objects);
  return response.result.account_objects;
};
