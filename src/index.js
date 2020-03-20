import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/app';
import { IsAndroid } from './constants';
import * as serviceWorker from './serviceWorker';

if (module.hot) {
  module.hot.accept();
}

if (IsAndroid) {
  document.querySelector('#i_music').setAttribute('src', require('./asset/music/music.mp3'));  
} else {
  document.querySelector('#i_video').setAttribute('src', require('./asset/video/video.mp4'));
}

ReactDOM.render(<App />, window.document.getElementById('root'));
serviceWorker.unregister();
