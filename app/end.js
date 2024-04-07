// Define click1 sound effect
var click1 = new Howl({
    src: ['../assets/sound/click.mp4']
});

// Function to show modal
function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    click1.play(); // Play click sound when modal is shown

    var closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', function () {
        hideModal();
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            hideModal();
        }
    });
}

// Function to hide modal
function hideModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
    click1.play(); // Play click sound when modal is hidden
}

window.onload = () => {
    const playBtn = document.querySelector('.modal_show');
    playBtn.addEventListener('click', async function () {
        const queryParams = new URLSearchParams(window.location.search);
        const missedQuestions = JSON.parse(queryParams.get('missedQuestions'));

        if (missedQuestions && missedQuestions.length > 0) {
            displayResults(missedQuestions);
        } else {
            console.log('No missed questions found.');
        }
    });

    const modalText = document.querySelector('.modal_text');
    const queryParams = new URLSearchParams(window.location.search);
    const missedQuestions = JSON.parse(queryParams.get('missedQuestions'));

    if (missedQuestions && missedQuestions.length > 0) {
        displayResults(missedQuestions);
    } else {
        modalText.textContent = 'No missed questions found.';
    }
};

// Preguntas falladas en el Modal:
function displayResults(missedQuestions) {
    const modalText = document.querySelector('.modal_text');
    modalText.innerHTML = ''; // Clear previous results

    // Iterate through missed questions and their corrections
    missedQuestions.forEach((question, index) => {
        // Create container element for each question+correction pair
        const container = document.createElement('div');
        container.classList.add('question-container');

        const questionText = document.createElement('p');
        questionText.textContent = `Question: ${question.question}`;
        const correctionText = document.createElement('p');
        correctionText.textContent = `Correction: ${question.correction}`;

        container.appendChild(questionText);
        container.appendChild(correctionText);
        modalText.appendChild(container);
    });

    // Show the modal
    showModal();
}

// Function save high score
async function saveHighScore(e) {
    e.preventDefault();
    console.log('Saving high score...');
    const username = document.querySelector('#username').value;
    const mostRecentScore = localStorage.getItem('mostRecentScore');
    console.log('Username:', username);
    console.log('Most recent score:', mostRecentScore);
    const API_ENDPOINT = 'https://65f1e141034bdbecc763eec4.mockapi.io/leaderboard/lead';
    const scoreData = {
        name: username,
        score: mostRecentScore
    };

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scoreData)
        });

        if (response.ok) {
            console.log('Score saved successfully!');
            window.location.assign('./highscores.html');
        } else {
            throw new Error('Failed to save score');
        }
    } catch (error) {
        console.error('Error saving score:', error);
    }
}
