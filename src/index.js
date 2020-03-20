import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, window.document.getElementById('root'));
serviceWorker.unregister();
