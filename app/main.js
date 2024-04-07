window.onload = () => {
  //SONIDOS HAWLER
  var click1 = new Howl({
    src: ['../assets/sound/click.mp4'] 
  });

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
      // If background music is playing, stop it
      backgroundMusic.pause();
    } else {
      // If background music is not playing, start it
      backgroundMusic.play();
    }
  }

  // Event listener for clicking the button to toggle background music playback
  var toggleMusicBtn = document.getElementById('toggleMusicBtn');
  toggleMusicBtn.addEventListener('click', function () {
    // Toggle background music playback
    toggleBackgroundMusic();
  });


  //FUNCIONALIDAD

  // Fetch data.json
  fetch('../assets/data/data.json')
    .then(response => response.json())
    .then(data => {
      questions = data;

      for (let question of questions) {
        console.log(questions);
      }
    });

  // Logic for Google Translate initialization
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
  }

  // Logic for displaying modal
  function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  }

  // Logic for hiding modal
  function hideModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  // Event listener for clicking "Play" button
  var playBtn = document.querySelector('.modal_show');
  playBtn.addEventListener('click', function () {
    showModal();
    // Play the sound
    click1.play();
  });

  // Event listener for clicking close button
  var closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', function () {
    hideModal();
    click1.play();
  });

  // Event listener for clicking outside the modal
  window.addEventListener('click', function (event) {
    var modal = document.getElementById("modal");
    if (event.target === modal) {
      hideModal();
      click1.play();
    }
  });

  // Event listener for clicking "Leaderboard" link
  var leaderboardLink = document.querySelector('a[href="pages/highscores.html"]');
  leaderboardLink.addEventListener('click', function () {
    // Play the sound
    click1.play();
  });
}
