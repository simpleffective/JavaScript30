const video = document.querySelector('video');
window.onload = initVideo

function initVideo() {
  
  // set play and pause on click
  video.onclick = () => playPause(video);
  document.querySelector('.player__button.toggle').onclick = () => playPause(video)

  // fill progress bar initially
  progress__filled = document.querySelector('.progress__filled');
  progress__filled.style.flexBasis = `${video.currentTime / video.duration * 100}%`
  // set progress update
  video.ontimeupdate = () => fillProgress(video, progress__filled)
  
  // set clickable & draggable progress bar
  progress = document.querySelector('.progress');
  progress.onclick = (e) => onProgressClick(video, progress, e);
  progress.onmousedown = () => progress.onmousemove = (e) => onProgressClick(video, progress, e);
  progress.onmouseup = () => progress.onmousemove = null;
  
  // volume 
  volume_bar = document.querySelector('input[name="volume"]');
  volume_bar.oninput = () => changeVolume(video, volume_bar);

  // playback rate
  volume_bar = document.querySelector('input[name="playbackRate"]');
  volume_bar.oninput = () => changePlaybackRate(video, volume_bar);

  // fast-forward / backwards
  // console.log(document.querySelector('.player__button:not(.toggle)').dataset.skip)
  document.querySelectorAll('.player__button:not(.toggle)').forEach(btn => {
    btn.onclick = (e) => setVideoTime(video, e.target.dataset.skip) 
  });
   
}

function setVideoTime(video, val) {
  video.currentTime = Math.max(Math.min(video.duration, video.currentTime + parseInt(val)), 0)
}

// play and pause on click
function playPause(video) {
  if (video.paused)
    video.play()
  else
    video.pause()
}

// progress bar updated with timeupdate event
function fillProgress(video, bar) {
  bar.style.flexBasis = `${video.currentTime / video.duration * 100}%`
}

// progress bar click
function onProgressClick(video, progress, e) {
  x = (e.clientX - progress.getBoundingClientRect().left)
  video.currentTime =  (x / progress.offsetWidth) * video.duration
}

// set volume
function changeVolume(video, bar) {
  video.volume = bar.value
}

// change speed
function changePlaybackRate(video, bar) {
  video.playbackRate = bar.value
}



