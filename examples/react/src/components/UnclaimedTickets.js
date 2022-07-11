import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Paper,
  Button,
 } from '@mui/material';

function UnclaimedTickets({ offers, onOffer }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell align="right">Claim</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow
              key={offer.Destination}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="offer">
                {offer.Destination}
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => onOffer(offer.index)}>Claim</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

UnclaimedTickets.propTypes = {
  offers: PropTypes.array,
  onOffer: PropTypes.func
};

export default UnclaimedTickets;