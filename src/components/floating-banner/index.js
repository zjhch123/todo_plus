import React from 'react';
import ReactDOM from 'react-dom';
import { FloatingBanner, Types } from './floating-banner';

const render = (msg, type) => (
  <FloatingBanner type={type} key={Date.now()}>
    {msg}
  </FloatingBanner>
);

export const renderSuccess = (msg) => {
  ReactDOM.render(ReactDOM.createPortal(render(msg, Types.Success), document.body), document.getElementById('banner'));
};

export const renderError = (msg) => {
  ReactDOM.render(ReactDOM.createPortal(render(msg, Types.Error), document.body), document.getElementById('banner'));
};

export const renderWarning = (msg) => {
  ReactDOM.render(ReactDOM.createPortal(render(msg, Types.Warning), document.body), document.getElementById('banner'));
};
