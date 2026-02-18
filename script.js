// Playlist of Archive.org videos with channel names
const playlist = [
  {name: "ALF Pilot", url: "https://ia801505.us.archive.org/25/items/alf-complete/S01E00%20-%20Unaired%20Pilot.mp4"},
  {name: "ALF S01E01", url: "https://ia801505.us.archive.org/25/items/alf-complete/S01E01%20-%20SomeOtherEpisode.mp4"},
  {name: "ALF S01E02", url: "https://ia801505.us.archive.org/25/items/alf-complete/S01E02%20-%20AnotherEpisode.mp4"},
  {name: "Retro Commercials", url: "https://archive.org/download/80s_commercials/80sCommercial.mp4"},
  {name: "Saturday Cartoon", url: "https://archive.org/download/saturday_cartoon/SaturdayCartoon.mp4"}
];

let currentIndex = 0;
const video = document.getElementById('tvScreen');
const overlay = document.getElementById('channelOverlay');
const staticEffect = document.getElementById('staticEffect');
let isPoweredOn = true;

// Preload all videos
playlist.forEach(item => {
  const vid = document.createElement('video');
  vid.src = item.url;
});

// Initialize first channel
function setChannel(index){
  currentIndex = index;
  overlay.textContent = playlist[index].name;

  // show static briefly
  staticEffect.style.display = 'block';
  setTimeout(() => staticEffect.style.display = 'none', 500);

  video.src = playlist[index].url;
  if(isPoweredOn) video.play();
}

// Buttons
document.getElementById('channelUp').addEventListener('click', () => {
  if(!isPoweredOn) return;
  setChannel((currentIndex + 1) % playlist.length);
});

document.getElementById('channelDown').addEventListener('click', () => {
  if(!isPoweredOn) return;
  setChannel((currentIndex - 1 + playlist.length) % playlist.length);
});

document.getElementById('power').addEventListener('click', () => {
  isPoweredOn = !isPoweredOn;
  if(isPoweredOn) video.play();
  else video.pause();
});

document.getElementById('volUp').addEventListener('click', () => {
  video.volume = Math.min(1, video.volume + 0.1);
});

document.getElementById('volDown').addEventListener('click', () => {
  video.volume = Math.max(0, video.volume - 0.1);
});

// Start on first channel
setChannel(currentIndex);
