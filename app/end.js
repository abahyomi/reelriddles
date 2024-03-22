async function saveHighScore(e) {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const mostRecentScore = localStorage.getItem('mostRecentScore');
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
            // llevar a higscore despues de guardar
            window.location.assign('./highscores.html'); 
        } else {
            throw new Error('Failed to save score');
        }
    } catch (error) {
        console.error(error);
    }
}



