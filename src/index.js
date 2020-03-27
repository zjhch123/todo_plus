import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/app';
import { IsAndroid, MediaElementId } from './constants';
import { shareWelcome } from './utils/set-share';
import * as serviceWorker from './serviceWorker';

if (module.hot) {
  module.hot.accept();
}

const media = IsAndroid
  ? require('./asset/music/music.mp3')
  : require('./asset/video/video.mp4');
document.getElementById(MediaElementId).setAttribute('src', media);
shareWelcome();

ReactDOM.render(<App />, window.document.getElementById('root'));
serviceWorker.unregister();
