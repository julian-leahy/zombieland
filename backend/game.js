module.exports = {
    initGameState
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
        questions: {}
    }
}