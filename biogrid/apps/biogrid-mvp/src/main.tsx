import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';

declare global {
  interface GlobalFetch {
    [k: string]: any;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
