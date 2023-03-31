console.log("welcome")
// initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let songItems = Array.from(document.getElementsByClassName('songItem'))
let masterPlay = document.getElementById('masterPlay');
let masterSongName = document.getElementById('masterSongName')
let progressBar = document.getElementById('progressBar');

let musicList = [
    {songName: "i love you", filepath:"songs/1.mp3", duration:"4:50"},
    {songName: "Selena-Gomez-Look-At-Her-Now", filepath:"songs/2.mp3", duration:"3:50"},
    {songName: "Jhené-Aiko-None-Of-Your", filepath:"songs/3.mp3",  duration:"6:50"},
    {songName: "Mothers-Daughter-Ringtone-instrumental", filepath:"songs/4.mp3", duration:"7:50"},
    {songName: "Lana-Del-Rey-Love-Official-Instrumental", filepath:"songs/5.mp3", duration:"2:50"}
]

songItems.forEach((element,i)=>{
    // console.log(element,i)
    element.getElementsByClassName('songName')[0].innerText = musicList[i].songName;
    element.getElementsByClassName('songDuration')[0].innerText = musicList[i].duration;
})
// audioElement.play()

// handle play/pause button
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
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

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.addEventListener('click', ()=>{
            if(audioElement.paused || audioElement.currentTime<=0){
                // audioElement.play();
                element.classList.add('fa-circle-play');
                element.classList.remove('fa-circle-pause');
            }
            else{
                // audioElement.pause();
                element.classList.remove('fa-circle-play');
                element.classList.add('fa-circle-pause');

            }
        })
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = musicList[songIndex].songName;
        audioElement.currentTime = 0;
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
        }
        else{
            audioElement.pause();
        }
        masterPlay.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = musicList[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = musicList[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');

})