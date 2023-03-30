console.log("welcome")
// initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar')

let musicList = [
    {songName: "i love you", filepath:"songs/1.mp3"},
    {songName: "i love you", filepath:"songs/1.mp3"},
    {songName: "i love you", filepath:"songs/1.mp3"},
    {songName: "i love you", filepath:"songs/1.mp3"},
    {songName: "i love you", filepath:"songs/1.mp3"}
]
// audioElement.play()

// handle play/pause button
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
    }
}) 

// progress bar
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

// seek audio with progress
progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (progressBar.value * audioElement.duration)/100;
})