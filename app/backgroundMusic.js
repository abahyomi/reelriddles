// Define background music
var backgroundMusic = new Howl({
    src: ['../assets/sound/bg.mp3'],
    loop: true,
    volume:0.6
});

function isBackgroundMusicPlaying() {
    return backgroundMusic.playing();
}

function toggleBackgroundMusic() {
    if (isBackgroundMusicPlaying()) {
        backgroundMusic.pause();
        localStorage.setItem('backgroundMusicPlaying', 'false');
    } else {
        backgroundMusic.play();
        localStorage.setItem('backgroundMusicPlaying', 'true');
    }
}

window.onload = () => {
    const backgroundMusicPlaying = localStorage.getItem('backgroundMusicPlaying');
    if (backgroundMusicPlaying === 'true') {
        backgroundMusic.play();
    }
};
