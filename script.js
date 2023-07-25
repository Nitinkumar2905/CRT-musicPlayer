console.log("welcome");
// initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterPlay = document.getElementById("masterPlay");
let masterSongName = document.getElementById("masterSongName");
let songItemPlay = document.getElementsByClassName("songItemPlay");
let progressBar = document.getElementById("progressBar");

let musicList = [
  { songName: "i love you", filepath: "songs/1.mp3", duration: "4:50" },
  {
    songName: "Selena-Gomez-Look-At-Her-Now",
    filepath: "songs/2.mp3",
    duration: "3:50",
  },
  {
    songName: "Jhené-Aiko-None-Of-Your",
    filepath: "songs/3.mp3",
    duration: "6:50",
  },
  {
    songName: "Mothers-Daughter-Ringtone-instrumental",
    filepath: "songs/4.mp3",
    duration: "7:50",
  },
  {
    songName: "Lana-Del-Rey-Love-Official-Instrumental",
    filepath: "songs/5.mp3",
    duration: "2:50",
  },
];

songItems.forEach((element, i) => {
  // console.log(element,i)
  element.getElementsByClassName("songName")[0].innerText =
    musicList[i].songName;
  element.getElementsByClassName("songDuration")[0].innerText =
    musicList[i].duration;
});
// audioElement.play()

// handle play/pause button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    console.log("played");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    console.log("stopped");
  }
});

// progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  progressBar.value = progress;
});

// seek audio with progress
progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(function (
  element
) {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    const clickedSongIndex = parseInt(e.target.id);

    if (songIndex !== clickedSongIndex) {
      songIndex = clickedSongIndex;
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = musicList[songIndex].songName;
    }

    if (audioElement.paused) {
      audioElement.currentTime = 0;
      audioElement.play();
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      console.log("Audio started playing");
    } else {
      audioElement.pause();
      e.target.classList.add("fa-circle-play");
      e.target.classList.remove("fa-circle-pause");
      console.log("Audio paused");
    }
  });
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 4) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = musicList[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.add("fa-circle-pause");
  masterPlay.classList.remove("fa-circle-play");
  // songItemPlay.classList.remove("fa-circle-play");
  // songItemPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = musicList[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.add("fa-circle-pause");
  masterPlay.classList.remove("fa-circle-play");
  // songItemPlay.classList.remove("fa-circle-play");
  // songItemPlay.classList.add("fa-circle-pause");
});
