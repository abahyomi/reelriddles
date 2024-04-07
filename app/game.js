window.onload = () => {
    const url = '../assets/data/data.json';
    let missedQuestions = [];

    // Fetch JSON data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const questions = data;
            startGame(questions);
        })
        .catch(error => console.error('Error loading questions:', error));

    // Function to start the game
    startGame = (questions) => {
        let questionCounter = 0;
        let score = 0;
        let availableQuestions = [...questions];
        let maxQuestions = 5;
        let scorePoints = 100;

        // DOM elements
        let question = document.getElementById('question');
        let choices = Array.from(document.querySelectorAll('.choice-text'));
        let progressText = document.getElementById('progressText');
        let scoreText = document.getElementById('score');
        let progressBarFull = document.getElementById('progressBarFull');
        let timerElement = document.getElementById('timer');
        let gameContainer = document.querySelector('.game_container');

        // Difficulty levels
        const difficultyLevels = {
            easy: 10,
            medium: 15,
            hard: 20
        };

        // Function to get a new question
        getNewQuestion = () => {
            clearInterval(timer);

            if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
                localStorage.setItem('mostRecentScore', score);
                const queryParams = new URLSearchParams({ missedQuestions: JSON.stringify(missedQuestions) });
                return window.location.assign(`end.html?${queryParams.toString()}`);
            }

            questionCounter++;
            progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
            progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

            let questionIndex = Math.floor(Math.random() * availableQuestions.length);
            currentQuestion = availableQuestions[questionIndex];

            question.innerText = currentQuestion.question;
            gameContainer.style.backgroundImage = `url('../assets/${currentQuestion.background}')`;

            choices.forEach(choice => {
                let number = choice.dataset['number'];
                choice.innerText = currentQuestion['choice' + number];
            });

            let timeLimit = difficultyLevels[currentQuestion.difficulty] || 25;
            startTimer(timeLimit);
            availableQuestions.splice(questionIndex, 1);
            acceptingAnswers = true;
        };

        // Timer function
        let timer;
        function startTimer(timeLimit) {
            let timeLeft = timeLimit;

            timer = setInterval(() => {
                timeLeft--;
                timerElement.innerText = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    getNewQuestion();
                }
            }, 1000);
        }

        // Add event listeners to choices
        choices.forEach(choice => {
            choice.addEventListener('click', function (e) {
                if (!acceptingAnswers) return;

                acceptingAnswers = false;
                const selectedChoice = e.currentTarget;
                const selectedAnswer = parseInt(selectedChoice.dataset['number']);

                const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

                if (classToApply === 'incorrect') {
                    // Track missed question
                    missedQuestions.push(currentQuestion);
                }

                if (classToApply === 'correct') {
                    incrementScore(scorePoints);
                }
                selectedChoice.classList.add(classToApply);

                setTimeout(() => {
                    selectedChoice.classList.remove(classToApply);
                    getNewQuestion();
                }, 1000);
            });
        });

        // Increment score function
        incrementScore = num => {
            score += num;
            scoreText.innerText = score;
        };

        // Start the game
        getNewQuestion();
    };
};

