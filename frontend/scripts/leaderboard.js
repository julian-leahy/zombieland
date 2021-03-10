const first = document.querySelector('#first');
const second = document.querySelector('#second');
const firstAnswer = document.querySelector('#firstAnswer');
const secondAnswer = document.querySelector('#secondAnswer');
const firstTimeDiff = document.querySelector('#firstTimeDiff');
const secondTimeDiff = document.querySelector('#secondTimeDiff');
const firstLives = document.querySelector('#firstLives');
const secondLives = document.querySelector('#secondLives');

const updateLeaderBoard = (winner, p) => {
    if (winner == 0) return; // TODO
    winner == 1 ? first.classList.add('flash-winner') : second.classList.add('flash-winner');
    const t1 = parseInt(p[0].time);
    const t2 = parseInt(p[1].time);
    let timeDif = (Math.max(t1, t2) - Math.min(t1, t2)) / 1000;
    let timeDif1 = (winner == 1) ? '' : `+ ${timeDif}`;
    let timeDif2 = (winner == 2) ? '' : `+ ${timeDif}`;

    displayResultFirst(p[0].answer, timeDif1, p[0].lives);
    displayResultSecond(p[1].answer, timeDif2, p[1].lives);

}

const displayResultFirst = (a, t, l) => {
    firstAnswer.innerText = a;
    firstTimeDiff.innerText = t;
    firstLives.innerText = l
}

const displayResultSecond = (a, t, l) => {
    secondAnswer.innerText = a;
    secondTimeDiff.innerText = t;
    secondLives.innerText = l
}

export default updateLeaderBoard;

/**
 answer: "132"
id: 1
lives: 10
time: 1615415919141
zombie: "boy"

 */