window.onload = async () => {
    const highScoresList = document.querySelector('#highScoreList');
    const latestScoreContainer = document.querySelector('#latestScore');
    const showMoreButton = document.querySelector('#showMoreButton');
    const showLessButton = document.querySelector('#showLessButton');
    let displayedScores = 5;
    const API_ENDPOINT = 'https://65f1e141034bdbecc763eec4.mockapi.io/leaderboard/lead'; //mockapi

    //howler
    var click1 = new Howl({
        src: ['../assets/sound/click.mp4']
    });

    // Event listener for clicking the button to toggle background music
    var toggleMusicBtn = document.getElementById('toggleMusicBtn');
    toggleMusicBtn.addEventListener('click', function () {
        toggleBackgroundMusic();
    });

    // Pintar los Scores
    const renderScores = (scores, startIndex) => {
        return scores.map((entry, index) => {
            const position = startIndex + index + 1;
            return `<li class="high-score">${position}. ${entry.name} - ${entry.score}</li>`;
        }).join('');
    };

    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        if (response.ok) {
            data.sort((a, b) => b.score - a.score);
            // 5 scores
            const topFiveScores = data.slice(0, displayedScores);
            highScoresList.innerHTML = renderScores(topFiveScores, 0);
            // Por id
            const highestId = data.reduce((maxId, current) => {
                return current.id > maxId ? current.id : maxId;
            }, -Infinity);

            const latestScore = data.find(entry => entry.id === highestId);
            // Display 
            const latestScoreHTML = `<p>Latest Score: ${latestScore.name} - ${latestScore.score}</p>`;
            latestScoreContainer.innerHTML = latestScoreHTML;

            // Show More / Less
            showMoreButton.addEventListener('click', () => {
                click1.play(); // Play click sound
                const startIndex = displayedScores;
                displayedScores += 5; // Se suman 5 cadenas
                const additionalScores = data.slice(startIndex, displayedScores);
                highScoresList.innerHTML += renderScores(additionalScores, startIndex);
                // cambio de "show more" a "show less"
                if (displayedScores >= 10) {
                    showMoreButton.style.display = 'none';
                    showLessButton.style.display = 'inline-block';
                }
            });


            showLessButton.addEventListener('click', () => {
                click1.play(); // Play click sound
                displayedScores = 5;
                const topFiveScores = data.slice(0, displayedScores);
                highScoresList.innerHTML = renderScores(topFiveScores, 0);

                // cambio de "show more" a "show less"
                showMoreButton.style.display = 'inline-block';
                showLessButton.style.display = 'none';
            });
            showLessButton.style.display = 'none';
        } else {
            throw new Error('Failed to fetch leaderboard data');
        }
    } catch (error) {
        console.error(error);
    }
}




