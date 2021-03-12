module.exports = {
    initGameState,
    question,
    checkAnswers,
    updateLives
}

function initGameState() {
    return {
        players: [{
                id: 1,
                zombie: 'boy',
                lives: 10
            },
            {
                id: 2,
                zombie: 'girl',
                lives: 10
            }
        ],
        question: {},
        options: []
    }
}

function question(options) {
    const type = getQuestionType(options);
    let question = {};

    switch (type) {
        case 'tables':
            question = getTables();
            break;
        case 'multiplication':
            question = getMultiplication();
            break;
        case 'subtraction':
            question = getSubtraction();
            break;
    }

    return question;

}

/**
 * 
 * @param {obj} p players results
 * @param {int} c correct answer
 * @returns player who won or 0 for neither
 */
function checkAnswers(p, c) {

    /* Both answered correctly - fastest wins */
    if (p[0].answer == c && p[1].answer == c) {
        return (p[0].time < p[1].time) ? 1 : 2;
    }

    /* One correct answer only */
    if (p[0].answer == c && p[1].answer != c) {
        return 1;
    }

    if (p[0].answer != c && p[1].answer == c) {
        return 2;
    }

    return 0; // Both incorrect
}

/**
 * 
 * @param {obj} p players state
 * @param {int} w winning player
 * @returns true if anyone dies
 */
function updateLives(p, w) {
    if (w == 1) {
        let p2 = p[1].lives;
        p2 -= 1;
        p[1].lives = p2;
        return (p2 == 0) ? true : false
    } else if (w == 2) {
        let p1 = p[0].lives;
        p1 -= 1;
        p[0].lives = p1;
        return (p1 == 0) ? true : false
    } else {
        return false;
    }
}

function getQuestionType(options) {
    return options[getRandomInt(options.length)];
}

function getTables() {
    let question = {};
    question.number1 = getRandomArbitrary(3, 12);
    question.operand = 'x';
    question.number2 = getRandomArbitrary(3, 12);
    question.answer = question.number1 * question.number2;

    return question
}

function getMultiplication() {
    let question = {};
    question.number1 = getRandomArbitrary(100, 999);
    question.operand = 'x';
    question.number2 = getRandomArbitrary(3, 99);
    question.answer = question.number1 * question.number2;

    return question;
}

function getSubtraction() {
    let question = {};
    let v1 = getRandomArbitrary(3, 999);
    let v2 = getRandomArbitrary(3, 999);
    if (v1 >= v2) {
        question.number1 = v1;
        question.number2 = v2;
    } else {
        question.number1 = v2;
        question.number2 = v1;
    }
    question.operand = '-';
    question.answer = question.number1 - question.number2;

    return question;

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}