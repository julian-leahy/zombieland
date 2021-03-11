const deadBoy = document.querySelector('#boy');
const deadGirl = document.querySelector('#girl');

export const gameOverPlayer1 = () => {
    deadBoy.className = '';
    deadBoy.src = './images/rip-boy.png'
}

export const gameOverPlayer2 = () => {
    deadGirl.className = '';
    deadGirl.src = './images/rip-girl.png'
}