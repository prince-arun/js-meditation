let playBtn = document.querySelector(".play-btn");
let replayBtn = document.querySelector(".replay-btn");

let outline = document.querySelector(".moving-outline circle");
let soundSelectors = document.querySelectorAll(".sound-selector button");
let timeDisplay = document.querySelector(".time-display");

let outlineLength = outline.getTotalLength();

let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60
)}`;

let video = document.querySelector(".vid-container video");
let audioTrack = document.querySelector(".audio-track");
let timeSelectors = document.querySelectorAll(".time-selector button");

soundSelectors.forEach((selector) => {
  selector.addEventListener("click", () => {
    audioTrack.src = selector.getAttribute("data-sound");
    video.src = selector.getAttribute("data-video");
    checkPlaying(audioTrack);
  });
});

playBtn.addEventListener("click", () => {
  checkPlaying(audioTrack);
});

replayBtn.addEventListener("click", () => {
  restartAudio(audioTrack);
});

const restartAudio = (audio) => {
  let currentTime = audio.currentTime;
  audio.currentTime = 0;
};

timeSelectors.forEach((selector) => {
  selector.addEventListener("click", () => {
    fakeDuration = selector.getAttribute("data-duration");
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

const checkPlaying = (audio) => {
  if (audio.paused) {
    audio.play();
    video.play();
    playBtn.src = "./images/pause.svg";
  } else {
    audio.pause();
    video.pause();
    playBtn.src = "./images/play.svg";
  }
};

audioTrack.ontimeupdate = function () {
  let currentTime = audioTrack.currentTime;
  let lDuratiion = fakeDuration - currentTime;
  let seconds = Math.floor(lDuratiion % 60);
  let minutes = Math.floor(lDuratiion / 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    audioTrack.pause();
    audioTrack.currentTime = 0;
    playBtn.src = "./images/play.svg";
    video.pause();
  }
};
