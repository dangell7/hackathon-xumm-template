import React, { useCallback, useState, useEffect } from 'react';
// import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { Grid, Box, Dialog, Typography } from '@mui/material';

import XummGuestConfirmation from './XummGuestConfirmation';
import useIsMountedRef from '../hooks/useIsMountedRef';

function XummDialog({ onConfirm, onCancel, open, ...rest }) {
  // const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  // const { enqueueSnackbar } = useSnackbar();

  const [preparedTx, setPreparedTx] = useState(null);
  const onOpened = useCallback(async () => {
    if (isMountedRef.current) {
      const tx = {
        TransactionType: 'Payment',
        Destination: process.env.REACT_APP_XRPL_GRAPH_ACCOUNT,
        Amount: '10',
        Fee: '10',
      };
      setPreparedTx(tx);
    }
  }, [isMountedRef]);

  useEffect(() => {
    onOpened();
  }, [onOpened]);

  const handleSubmit = async (signedTx) => {
    try {
      console.log('SUCCESS');
      // enqueueSnackbar('Tx Complete', {
      //   variant: 'success',
      // });
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, {
      //   variant: 'error',
      // });
    }
  };

  if (!preparedTx) {
    return null;
  }

  return (
    <Dialog maxWidth="sm" fullWidth onClose={onCancel} open={open} {...rest}>
      {/* Dialog renders its body even if not open */}
      {open && (
        <>
          <Box p={3} display="flex" style={{ margin: 'auto' }}>
            <Typography variant="h4">Purchase Crowdsale</Typography>
          </Box>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Box p={3}>
                <XummGuestConfirmation 
                  transaction={preparedTx} 
                  onBack={onCancel} 
                  onComplete={handleSubmit} 
                />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Dialog>
  );
}

XummDialog.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
  open: false,
};

XummDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.bool,
};

export default XummDialog;
