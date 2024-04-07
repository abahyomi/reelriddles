window.onload = () => {
  //SONIDOS HAWLER
  var click1 = new Howl({
    src: ['../assets/sound/click.mp4']
  });

  // Event listener for clicking the button to toggle background music
  var toggleMusicBtn = document.getElementById('toggleMusicBtn');
  toggleMusicBtn.addEventListener('click', function () {
    toggleBackgroundMusic();
  });


  //FUNCIONALIDAD

  // Fetch data.json
  fetch('../assets/data/data.json')
    .then(response => response.json())
    .then(data => {
      questions = data;
    });


  //MODAL
  function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  }

  function hideModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  var playBtn = document.querySelector('.modal_show');
  playBtn.addEventListener('click', function () {
    showModal();
    // Play the sound
    click1.play();
  });

  var closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', function () {
    hideModal();
    click1.play();
  });

  window.addEventListener('click', function (event) {
    var modal = document.getElementById("modal");
    if (event.target === modal) {
      hideModal();
      click1.play();
    }
  });

  // Leadboard
  var leaderboardLink = document.querySelector('a[href="pages/highscores.html"]');
  leaderboardLink.addEventListener('click', function () {
    // Play the sound
    click1.play();
  });
}
