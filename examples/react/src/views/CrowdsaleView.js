import React, { useCallback, useState, useEffect } from 'react';
import { Grid, Box, Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import '../App.css';
import {
  xrpToDrops
} from 'xrpl';

import Page from '../components/Page';
import Container from '../components/Container';
import XummDialog from '../components/XummDialog';
import UnclaimedTickets from '../components/UnclaimedTickets';

import useIsMountedRef from '../hooks/useIsMountedRef';
import useXrpl from '../hooks/useXrpl';

import { 
  getNFTOffers
} from '../services/xrpl';

function CrowdsaleView() {
  const isMountedRef = useIsMountedRef();
  const { xrpl } = useXrpl();

  const [isError, setIsError] = useState(null);

  const [numTickets, setNumTickets] = useState(1);
  const handleChange = (e) => {
    const { value } = e.target;
    setNumTickets(value);
  }

  const [purchaseTx, setPurchaseTx] = useState(null);
  const [pending, setPending] = useState(false);
  const handlePurchase = () => {
    const tx = {
      TransactionType: 'Payment',
      Destination: process.env.REACT_APP_XRPL_GRAPH_ACCOUNT,
      Amount: xrpToDrops(numTickets * 10),
      Fee: '20000',
    };
    setPurchaseTx(tx);
  };

  const handlePurchaseSuccess = (data) => {
    localStorage.setItem("account", data.account);
    setPurchaseTx(null);
    setPending(true);
    setNumTickets(1);
  };

  const getAccountOffers = async () => {
    try {
      const callback = async () => {
        console.log('WAITING...');
        const account = localStorage.getItem("account");
        const o = await getNFTOffers(xrpl, process.env.REACT_APP_XRPL_GRAPH_ACCOUNT);
        setOffers(o.filter((of) => of.Destination === account));
        setPending(false);
      }
      setTimeout(callback, 4000);
      const account = localStorage.getItem("account");
      const o = await getNFTOffers(xrpl, process.env.REACT_APP_XRPL_GRAPH_ACCOUNT);
      setOffers(o.filter((of) => of.Destination === account));
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);
    }
  };

  const [offers, setOffers] = useState([]);
  const getOffers = useCallback(async () => {
    if (isMountedRef.current && localStorage.getItem("account")) {
      try {
        getAccountOffers();
      } catch (error) {
        console.log(error.message);
        setIsError(error.message);
      }
    }
  }, [isMountedRef, purchaseTx]);

  useEffect(() => {
    getOffers();
  }, [getOffers]);

  const [acceptTx, setAcceptTx] = useState(null);
  const handleClaim = (sellHash) => {
    const tx = {
      TransactionType: 'NFTokenAcceptOffer',
      NFTokenSellOffer: sellHash,
      Fee: '12000',
    };
    setAcceptTx(tx);
  };

  const handleClaimSuccess = () => {
    setPending(true);
    setAcceptTx(null);
    getAccountOffers();
  };

  return (
    <Page
      sx={{
        minHeight: '100%',
        paddingTop: 3,
        paddingBottom: 3,
      }}
      title="Raffle Fundraiser"
    >
      <Container>
        <div className="App">
          <header className="App-header">
            <h1>Nicole's Car Fundraiser</h1>
          </header>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              {' '}
            </Grid>
            <Grid item xs={8}>
              <p>
                My good friend, Nicole runs a small catering business from her kitchen in Barbados. She cooks food for
                collection and delivery by foot in her neighbourhood. She had managed to save up for a used car to help
                grow her business and be able to expand her delivery area. Four days after getting the car, a truck hit
                her and the car was written off. Luckily she was OK, but the car is beyond repair. As it was so old, and
                purchased from a family member there is no official valuation and insurance will unlikely pay out
                anything near the cost of actually replacing it.
              </p>

              <p>
                So we are running a fundraiser to buy her another car. We are raffling off a handmade crochet blanket
                made by my wife.
              </p>
            </Grid>
            <Grid item xs={2}>
              {' '}
            </Grid>
            <Grid item xs={2}>
              {' '}
            </Grid>
            <Grid item xs={4}>
              <Grid item>
                <img
                  src="https://raw.githubusercontent.com/hammertoe/nft_raffle/main/images/nicole-souse_small.jpeg"
                  alt="Nicole and food"
                />
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid item>
                <img
                  src="https://raw.githubusercontent.com/hammertoe/nft_raffle/main/images/nicole-car-crash_small.jpeg"
                  alt="Nicole's wrecked car"
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              {' '}
            </Grid>
            <Grid item xs={2}>
              {' '}
            </Grid>
            <Grid item xs={8}>
              <Grid item>
                <p>Each ticket is 10 XRP. How many raffle tickets do you want to buy?</p>
                <p>
                  <TextField 
                    type="number" 
                    value={numTickets} 
                    InputProps={{ inputProps: { step: 1, min: 1, max: 10 } }}
                    onChange={handleChange}
                  />
                </p>

                <p>
                  <Button variant="contained" disabled={offers.length > 0 || pending} onClick={() => handlePurchase()}>
                    Buy tickets
                  </Button>
                </p>
                <Box pt={3} m={2}>
                  {pending && (
                    <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                  )}
                  {offers.length > 0 && !pending && (<UnclaimedTickets offers={offers} onOffer={handleClaim} />)}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
      {purchaseTx && (
        <XummDialog 
          open
          header="Purchase Raffle Tickets"
          tx={purchaseTx}
          onConfirm={handlePurchaseSuccess}
          onCancel={() => setPurchaseTx(null)}
        />
      )}
      {acceptTx && (
        <XummDialog
          open
          header="Receive Raffle Tickets"
          tx={acceptTx}
          onConfirm={handleClaimSuccess}
          onCancel={() => setAcceptTx(null)}
        />
      )}
    </Page>
  );
}

export default CrowdsaleView;
