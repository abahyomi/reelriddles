window.onload = () => {
  fetch('assets/data/data.json')
    .then(response => response.json())
    .then(data => {
      questions = data;

      for (let question of questions) {
        console.log(questions);
      }
    });

 //Logica del modal
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
  });


  var closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', function () {
    hideModal();
  });

  window.addEventListener('click', function (event) {
    var modal = document.getElementById("modal");
    if (event.target === modal) {
      hideModal();
    }
  });

}
