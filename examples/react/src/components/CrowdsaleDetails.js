import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Card, CardMedia, Typography, Button, Alert } from '@mui/material';
import { NumberPicker } from 'react-widgets';
import '../App.css';

function CrowdsaleDetails({ className, onBuy, isSuccess, isError, offers, xls20, ...rest }) {
  return (
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
            collection and delivery by foot in her neighbourhood. She had managed to save up for a used car to help grow
            her business and be able to expand her delivery area. Four days after getting the car, a truck hit her and
            the car was written off. Luckily she was OK, but the car is beyond repair. As it was so old, and purchased
            from a family member there is no official valuation and insurance will unlikely pay out anything near the
            cost of actually replacing it.
          </p>

          <p>
            So we are running a fundraiser to buy her another car. We are raffling off a handmade crochet blanket made
            by my wife.
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
              <NumberPicker defaultValue={1} step={1} max={10} min={1} />
            </p>

            <p>
              <Button variant="contained" onClick={onBuy}>
                Buy tickets
              </Button>
            </p>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          {' '}
        </Grid>
      </Grid>
    </div>
  );
}

CrowdsaleDetails.propTypes = {
  onBuy: PropTypes.func.isRequired,
  isSuccess: PropTypes.string.isRequired,
  isError: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  xls20: PropTypes.object.isRequired,
};

export default CrowdsaleDetails;
