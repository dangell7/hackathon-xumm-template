import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, Box, Button, Divider, Grid, Typography, CircularProgress } from '@mui/material';
import { useMutation, gql } from '@apollo/client';

import XummGuestQRWS from './XummGuestQRWS';

import useIsMountedRef from '../hooks/useIsMountedRef';
// import { isMobileAndTablet } from '../../utils/isMobileAndTablet';

const CREATE_PAYLOAD = gql`
  mutation CreatePayload($payload: XummAppPayload!) {
    createPayload(payload: $payload) {
      uuid
    }
  }
`;

function XummGuestConfirmation({ transaction, onComplete, onBack }) {
  const isMountedRef = useIsMountedRef();

  const [createPayload, { error, data }] = useMutation(CREATE_PAYLOAD);

  const [isError, setIsError] = useState(null);
  const startConfimation = useCallback(async () => {
    if (isMountedRef.current) {
      try {
        const payload = {
          txjson: transaction,
          options: {
            submit: true,
            expire: 240,
            return_url: {
              web: 'https://samydev.page.link/fJc4?payloadId={id}',
            },
          },
        };
        // if (isMobileAndTablet()) {
        //   payload.options.return_url.app = 'https://samydev.page.link/fJc4?payloadId={id}';
        // }
        await createPayload({
          variables: { payload }
        });
        // if (isMobileAndTablet()) {
        //   window.open(`https://xumm.app/sign/${response}`, '_blank');
        // }
      } catch (error) {
        setIsError(error.message);
      }
    }
  }, [isMountedRef]);

  useEffect(() => {
    startConfimation();
  }, [startConfimation]);

  if (!data || !data.createPayload) {
    return null
  }

  const uuid = data.createPayload.uuid;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          {!uuid && (
            <>
              {isError && (
                <Alert severity="warning">
                  <div>{isError}</div>
                </Alert>
              )}
              {!isError && (
                <>
                  <Box mt={2} display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress />
                  </Box>
                  <Box mt={2} style={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1" color="textSecondary">
                      Waiting for payload...
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
          {uuid && <XummGuestQRWS payloadId={uuid} onSignSuccess={onComplete} />}
          <Box mt={2}>
            <Divider />
          </Box>
        </Grid>
      </Grid>
      <Box mt={6} display="flex" alignItems="center" justifyContent="center">
        {onBack && (
          <Button onClick={onBack}>
            Back
          </Button>
        )}
      </Box>
    </>
  );
}

XummGuestConfirmation.propTypes = {
  transaction: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onBack: PropTypes.func,
};

export default XummGuestConfirmation;
