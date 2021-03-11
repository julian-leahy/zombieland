const first = document.querySelector('#first');
const second = document.querySelector('#second');
const firstIcon = document.querySelector('#firstIcon');
const secondIcon = document.querySelector('#secondIcon');
const firstAnswer = document.querySelector('#firstAnswer');
const secondAnswer = document.querySelector('#secondAnswer');
const firstTimeDiff = document.querySelector('#firstTimeDiff');
const secondTimeDiff = document.querySelector('#secondTimeDiff');
const firstLives = document.querySelector('#firstLives');
const secondLives = document.querySelector('#secondLives');

const updateLeaderBoard = (winner, p, gameOver) => {
    if (winner == 0) return; // TODO

    /* Calculate time difference */
    let timeDif = (Math.max(p[0].time, p[1].time) - Math.min(p[0].time, p[1].time)) / 1000;
    let timeDif1 = (winner == 1) ? '' : `+ ${timeDif}`;
    let timeDif2 = (winner == 2) ? '' : `+ ${timeDif}`;

    let player1Position, player2Position;
    /* Determine position on leaderboard */
    if (p[0].lives >= p[1].lives) {
        player1Position = first;
        player2Position = second;
        displayResultFirst(1, p[0].zombie, p[0].answer, timeDif1, p[0].lives);
        displayResultSecond(2, p[1].zombie, p[1].answer, timeDif2, p[1].lives);
    } else {
        player2Position = first;
        player1Position = second;
        displayResultSecond(1, p[0].zombie, p[0].answer, timeDif1, p[0].lives);
        displayResultFirst(2, p[1].zombie, p[1].answer, timeDif2, p[1].lives);
    }
    /* Flash winner */

    winner == 1 ? player1Position.classList.add('flash-winner') : player2Position.classList.add('flash-winner');

    setTimeout(() => {
        resetLeaderboard(gameOver);
    }, 3000);

}

const displayResultFirst = (player, icon, answer, timeDif, lives) => {
    firstIcon.innerText = `Player ${player}`;
    firstIcon.style.backgroundImage = `url('./images/${icon}-icon.png')`;
    firstAnswer.innerText = answer;
    firstTimeDiff.innerText = timeDif;
    firstLives.innerText = lives
}

const displayResultSecond = (player, icon, answer, timeDif, lives) => {
    secondIcon.innerText = `Player ${player}`;
    secondIcon.style.backgroundImage = `url('./images/${icon}-icon.png')`;
    secondAnswer.innerText = answer;
    secondTimeDiff.innerText = timeDif;
    secondLives.innerText = lives
}

const resetLeaderboard = (gameOver) => {
    first.classList.remove('flash-winner');
    second.classList.remove('flash-winner');
    if (!gameOver)
        document.querySelector('#nextQuestionBtn').classList.remove('hidden');
}


export default updateLeaderBoard;