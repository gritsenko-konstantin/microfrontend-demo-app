import React from 'react';
import ReactDOM from 'react-dom';

import App1 from 'application_1/application_1';
import App2 from 'application_2/application_2';

import App from './app';

ReactDOM.render(
  <>
    <App1 />
    <App2 />
  </>,
  document.getElementById('root')
);
