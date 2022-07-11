import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Dialog, Typography } from '@mui/material';

import XummGuestConfirmation from './XummGuestConfirmation';

function XummDialog({ open, header, tx, onConfirm, onCancel }) {

  return (
    <Dialog maxWidth="sm" fullWidth onClose={onCancel} open={open}>
      {/* Dialog renders its body even if not open */}
      {open && (
        <>
          <Box p={3} display="flex" style={{ margin: 'auto' }}>
            <Typography variant="h4">{header}</Typography>
          </Box>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Box p={3}>
                <XummGuestConfirmation 
                  transaction={tx} 
                  onBack={onCancel} 
                  onComplete={onConfirm} 
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
  open: false,
  header: null,
  tx: null,
  onConfirm: () => {},
  onCancel: () => {},
};

XummDialog.propTypes = {
  open: PropTypes.bool,
  header: PropTypes.string,
  tx: PropTypes.object,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

export default XummDialog;