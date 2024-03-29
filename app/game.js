window.onload = () => {
    const url = '../assets/data/data.json';
    // Fetch para el JSON
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // variable questions con la info del JSON
            const questions = data;

            startGame(questions); // 
        })
        .catch(error => console.error('Error loading questions:', error));

    startGame = (questions) => {
        let questionCounter = 0;
        let score = 0;
        let availableQuestions = [...questions];
        let maxQuestions = 5;
        let scorePoints = 100;

        //  DOM elements
        let question = document.getElementById('question');
        let choices = Array.from(document.querySelectorAll('.choice-text'));
        let progressText = document.getElementById('progressText');
        let scoreText = document.getElementById('score');
        let progressBarFull = document.getElementById('progressBarFull');
        let timerElement = document.getElementById('timer');
        let gameContainer = document.querySelector('.game_container');

        // Define la dificultad
        const difficultyLevels = {
            easy: 10, 
            medium: 15, 
            hard: 20 
        };

        // FUNCIONES

        getNewQuestion = () => {
            clearInterval(timer); // resetear el timer
        
            if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
                localStorage.setItem('mostRecentScore', score);
                return window.location.assign('end.html');
            }
        
            questionCounter++;
            progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
            progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;
        
            let questionIndex = Math.floor(Math.random() * availableQuestions.length);
            currentQuestion = availableQuestions[questionIndex];
        
            question.innerText = currentQuestion.question;
        
            // Change background image
            gameContainer.style.backgroundImage = `url('../assets/${currentQuestion.background}')`;
        
            choices.forEach(choice => {
                let number = choice.dataset['number'];
                choice.innerText = currentQuestion['choice' + number];
            });
        
            // Define la dificultad 
            let timeLimit = difficultyLevels[currentQuestion.difficulty] || 25;  // tiempo que da en default, si no se selecciona dificultad
        
            startTimer(timeLimit);
            availableQuestions.splice(questionIndex, 1);
            acceptingAnswers = true;
        }
        
        //funcion del contador
        let timer; 
        function startTimer(timeLimit) {
            let timeLeft = timeLimit;

            timer = setInterval(() => {
                timeLeft--;
                timerElement.innerText = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    getNewQuestion(); // pasar a la siguiente pregunta
                }
            }, 1000); 
        }

        choices.forEach(choice => {
            choice.addEventListener('click', function(e) {
                if (!acceptingAnswers) return;
        
                acceptingAnswers = false;
                const selectedChoice = e.currentTarget; // Use currentTarget to refer to the div element
                const selectedAnswer = parseInt(selectedChoice.dataset['number']);
        
                const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';
        
                if (classToApply === 'correct') {
                    incrementScore(scorePoints);
                }
        
                selectedChoice.classList.add(classToApply); // Add class to the selected choice container
        
                setTimeout(() => {
                    selectedChoice.classList.remove(classToApply); // Remove class from the selected choice container
                    getNewQuestion();
                }, 1000);
            });
        });
        
        incrementScore = num => {
            score += num;
            scoreText.innerText = score;
        }

        getNewQuestion(); // Empezar
    }
}
