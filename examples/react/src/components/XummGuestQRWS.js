import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, CardMedia, Alert } from '@mui/material';

import { xummGuestBlob } from '../services/xumm/services';

// const useStyles = makeStyles((theme) => ({
//   media: {
// height: 200,
// width: 200,
// margin: 'auto',
// backgroundColor: theme.palette.background.dark
//   },
// }));

function XummGuestQRWS({ payloadId, onSignSuccess }) {
  // const classes = useStyles();
  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`wss://xumm.app/sign/${payloadId}`);
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onclose = () => console.log('ws closed');

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  const [isOpened, setOpened] = useState(false);
  const [isSigned, setSigned] = useState(false);
  const [isExpired, setExpired] = useState(false);
  const [isError, setError] = useState(null);
  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = async (e) => {
      if (isPaused) return;
      const result = JSON.parse(e.data);
      if ('opened' in result) {
        setOpened(result.opened);
      }
      if ('signed' in result) {
        setSigned(result.signed);
        // const response = await getBlob(result.payload_uuidv4);
        onSignSuccess("response");
      }
      if ('expired' in result) {
        setExpired(result.expired);
      }
    };
  }, [isPaused]);

  return (
    <Box p={1}>
      {isOpened && (
        <Box p={2}>
          <Alert severity="info">
            <div>Opened in xumm.</div>
          </Alert>
        </Box>
      )}
      {isSigned && (
        <Box p={2}>
          <Alert severity="success">
            <div>The sign request has been signed succesfully.</div>
          </Alert>
        </Box>
      )}
      {isError && (
        <Box p={2}>
          <Alert severity="warning">
            <div>{isError}</div>
          </Alert>
        </Box>
      )}
      {isExpired && (
        <Box p={2}>
          <Alert severity="warning">
            <div>Sign request expired.</div>
          </Alert>
        </Box>
      )}
      <CardMedia
        sx={{
          height: 200,
          width: 200,
          margin: 'auto',
          backgroundColor: (theme) => theme.palette.background.dark,
        }}
        image={`https://xumm.app/sign/${payloadId}_q.png`}
      />
    </Box>
  );
}

XummGuestQRWS.propTypes = {
  payloadId: PropTypes.string.isRequired,
  onSignSuccess: PropTypes.func.isRequired,
};

export default XummGuestQRWS;
