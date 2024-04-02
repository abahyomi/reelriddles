// Function to save high score
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
            // Redirect to highscores page after saving
            window.location.assign('./highscores.html');
        } else {
            throw new Error('Failed to save score');
        }
    } catch (error) {
        console.error('Error saving score:', error);
    }
}

// Function to fetch missed questions

async function fetchMissedQuestions() {
    console.log('Fetching missed questions...');
    // Implement the logic to fetch missed questions
    // Return an array of missed questions with their corrections
    // Example:
    const missedQuestions = [
        { question: "Missed question 1", correction: "Correction 1" },
        { question: "Missed question 2", correction: "Correction 2" },
        // Add more missed questions and corrections as needed
    ];
    console.log('Missed questions:', missedQuestions);
    return missedQuestions;
}

// Function to display missed questions in modal
function displayResults(missedQuestions) {
    console.log('Displaying Results:', missedQuestions);
    const modalText = document.querySelector('.modal_text');
    modalText.innerHTML = ''; // Clear previous results

    // Iterate through missed questions and their corrections
    missedQuestions.forEach(question => {
        const questionText = document.createElement('p');
        questionText.textContent = `Question: ${question.question}`;
        const correctionText = document.createElement('p');
        correctionText.textContent = `Correction: ${question.correction}`;

        modalText.appendChild(questionText);
        modalText.appendChild(correctionText);
    });

    // Show the modal
    showModal();
}


function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

function hideModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Event listener for "See results" button click
var playBtn = document.querySelectorAll('.modal_show');
if (playBtn) {
    playBtn.addEventListener('click', async function () {
        console.log('See results button clicked...');
        const missedQuestions = await fetchMissedQuestions();
        if (missedQuestions && missedQuestions.length > 0) {
            displayResults(missedQuestions);
        } else {
            console.log('No missed questions found.');
        }
    });
} else {
    console.error('Element with class .modal_show not found.');
}

// Event listener for closing the modal
var closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function () {
    hideModal();
});

// Event listener to close modal when clicking outside
window.addEventListener('click', function (event) {
    var modal = document.getElementById("modal");
    if (event.target === modal) {
        hideModal();
    }
});
