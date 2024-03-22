window.onload = () => {
  fetch('assets/data/data.json')
    .then(response => response.json())
    .then(data => {
      questions = data;

      for (let question of questions) {
        console.log(questions);
      }
    });



  function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  }

  // Function to hide the modal
  function hideModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  // Show modal when play button is clicked
  var playBtn = document.querySelector('.modal_show');
  playBtn.addEventListener('click', function () {
    showModal();
  });

  // Hide modal when close button is clicked
  var closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', function () {
    hideModal();
  });

  // Hide modal when user clicks outside of it
  window.addEventListener('click', function (event) {
    var modal = document.getElementById("modal");
    if (event.target === modal) {
      hideModal();
    }
  });

}
