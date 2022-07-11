export const getNFTOffers = async (xrpl, address) => {
  const response = await xrpl.request({
    command: 'account_objects',
    account: address,
    ledger_index: 'validated',
    type: 'nft_offer',
    limit: 1000,
  });
  const cleanOffers = response.result.account_objects.filter((a) => a.Destination !== null);
  return cleanOffers.sort((a, b) => a.PreviousTxnLgrSeq > b.PreviousTxnLgrSeq);
};
