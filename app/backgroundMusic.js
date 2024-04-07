// Define background music
var backgroundMusic = new Howl({
    src: ['../assets/sound/bg.mp3'],
    loop: true
});

// Function to check if background music is playing
function isBackgroundMusicPlaying() {
    return backgroundMusic.playing();
}

// Function to toggle background music playback
function toggleBackgroundMusic() {
    if (isBackgroundMusicPlaying()) {
        // If background music is playing, pause it
        backgroundMusic.pause();
        // Store the playback status in local storage
        localStorage.setItem('backgroundMusicPlaying', 'false');
    } else {
        backgroundMusic.play();
        localStorage.setItem('backgroundMusicPlaying', 'true');
    }
}

// Check if background music was playing before
window.onload = () => {
    const backgroundMusicPlaying = localStorage.getItem('backgroundMusicPlaying');
    if (backgroundMusicPlaying === 'true') {
        // If background music was playing before, start it again
        backgroundMusic.play();
    }
};
