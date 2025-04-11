const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    repeatBtn = document.getElementById('repeat'); // ปุ่ม Repeat

const music = new Audio();

const songs = [
    {
        path: 'assets/1 stay gold.mp3',
        displayName: 'stay gold',
        cover: 'assets/1 stay gold.jpg',
        artist: 'Jax Jones, Ado',
    },
    {
        path: 'assets/2 Usseewa.mp3',
        displayName: 'Usseewa',
        cover: 'assets/2 Usseewa.jpg',
        artist: 'Ado',
    },
];

let musicIndex = 0;
let isPlaying = false;
let isRepeat = false; // สถานะ Repeat

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

// 🎵 กดปุ่ม Repeat
repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    music.loop = isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    repeatBtn.setAttribute('title', isRepeat ? 'Repeat On' : 'Repeat Off');
});

// 🔁 เปลี่ยนเพลงเมื่อเพลงจบ (ถ้าไม่ repeat)
music.addEventListener('ended', () => {
    if (!music.loop) {
        changeMusic(1);
    }
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// เริ่มโหลดเพลงแรก
loadMusic(songs[musicIndex]);
