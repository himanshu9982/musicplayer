const musicContainer = document.querySelector('.music-container')
const playbtn = document.querySelector('#play')
const prevbtn = document.querySelector('#prev')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const next = document.querySelector('#next')
const progressConatiner = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')


// song title
const songs = ['hey','summer','ukulele'];

// keep track of songs
let songIndex = 0;

// Initailly loads song info DOM
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `image/${song}.mp3`
    cover.src = `image/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playbtn.querySelector('i.fas').classList.remove('fa-play')
    playbtn.querySelector('i.fas').classList.add('fa-pause')


    audio.play()
}
function pauseSong() {
    musicContainer.classList.remove('play')
    playbtn.querySelector('i.fas').classList.add('fa-play')
    playbtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    songIndex--

   if (songIndex < 0) {
      songIndex = songs.length - 1 
   }
    loadSong(songs[songIndex])

    playSong()
}

function nextSong () {
    songIndex++

   if (songIndex > songs.length - 1) {
      songIndex = 0 
   }
    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration,currentTime} = e.srcElement
    const progressPercent = (currentTime/duration)*100
    progress.style.width = `${progressPercent}%`
}


function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime =(clickX/width)*duration
}

// Event listener
playbtn.addEventListener('click',() =>{
    const isplaying = musicContainer.classList.contains('play')


    if (isplaying) {
        pauseSong()
    }else{
        playSong()
    }
}) 


// change song events
prevbtn.addEventListener('click',prevSong)
next.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)

progressConatiner.addEventListener('click',setProgress)

audio.addEventListener('ended',nextSong)