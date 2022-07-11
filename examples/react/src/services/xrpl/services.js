export const getNFTOffers = async (xrpl, address, account) => {
  const response = await xrpl.request({
    command: 'account_objects',
    account: address,
    ledger_index: 'validated',
    type: 'nft_offer',
    limit: 10,
  });
  const offers = response.result.account_objects.filter((offer) => offer.Destination === account);
  if (offers.length === 0) {
    throw Error('Account does not have a pending offer');
  }
  return offers[0].index;
};
