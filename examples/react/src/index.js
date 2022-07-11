import 'react-perfect-scrollbar/dist/css/styles.css';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { XrplGraphProvider } from './contexts/XrplGraphContext';
import { XrplProvider } from './contexts/XrplContext';
import * as serviceWorker from './serviceWorker';
import App from './App';

import './index.css';

enableES5();

ReactDOM.render(
  <XrplProvider>
    <XrplGraphProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </XrplGraphProvider>,
  </XrplProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
