const player1 = document.querySelector('#boy');
const player2 = document.querySelector('#girl');
const girlZombie = new Audio('./audio/female-attack.wav');
const boyZombie = new Audio('./audio/boy-attack.wav');

export const killPlayer1 = () => {
    removeClasses();
    player1.classList.add('dead');
    player2.classList.add('attack');
    girlZombie.play();
}

export const killPlayer2 = () => {
    removeClasses();
    player2.classList.add('dead');
    player1.classList.add('attack');
    boyZombie.play();
}

export const killBoth = () => {
    removeClasses();
    player2.classList.add('dead');
    player1.classList.add('dead');
}

export const respawn = () => {
    removeClasses();
    player2.classList.add('idle');
    player1.classList.add('idle');
}

const removeClasses = () => {
    player1.className = '';
    player2.className = '';
}