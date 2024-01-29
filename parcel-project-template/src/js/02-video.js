import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

// Get or set the playback time from/to local storage
function setPlaybackTime(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

function getPlaybackTime() {
  return parseFloat(localStorage.getItem('videoplayer-current-time')) || 0;
}

// Initialize Vimeo player
const player = new Vimeo('vimeo-player');

// Track timeupdate event and save playback time to local storage
player.on('timeupdate', throttle((data) => {
    const currentTime = data.seconds;
    setPlaybackTime(currentTime);
  }, 1000));

// Set the playback time on page reload
const savedPlaybackTime = getPlaybackTime();
player.setCurrentTime(savedPlaybackTime);
