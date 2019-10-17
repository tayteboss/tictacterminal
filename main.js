

// THE GAME
// recieve input a move (string) 'playerInputMove'
// determine whose move it is (if 0 than playerOne if 1 than playerTwo)
// store a variable of the players cell reference (1 = 'top-centre')
// use these as an arguement for the rest of the methods

// trigger function to update the board -------------
// loop through all cells
// if the cellreference has a data-attribute-usage 'fill' - alert this move has already been made and stop remaining functions
// else if cell data-attribute-fill === cell reference - style that cell with current player style
// next trigger function to update the game stats -------------
// if player is playerOne - push that cell reference into playerOneMoves arr... else playerTwo
// update totalNumMoves
// if totalNumMoves = 9 - stop game as it's a tie
// next trigger function to check game status -------------
// loop through the player arrays. 
// if any of the arrays have winning combos (123, 147 etc)
// stop the game and post the winner

var commands = [
    'init',
    'clear',
    'top_left',
    'top_centre',
    'top_right',
    'middle_left',
    'middle',
    'middle_right',
    'bottom_left',
    'bottom_centre',
    'bottom_right',
]

var board = { //cell references
    'top_left': 0,
    'middle_left': 1,
    'bottom_left': 2,
    'top_centre': 3,
    'middle': 4,
    'bottom_centre': 5,
    'top_right': 6,
    'middle_right': 7,
    'bottom_right': 8
}

var game = { //storing all generic game details
    numMoves: 0,
    playerMoves: {
        playerOneMoves: [],
        playerTwoMoves: [],
    },
    currentPlayer: 0,
    playerOneScore: 0,
    playerTwoScore: 0
}

var input = document.querySelector('.player-move-input') //variable for input field
var playerTurnElem = document.querySelector('.player-turn') //variable for where playerturn text will go
var cellsEl = document.querySelectorAll('.cells') //location cells elements
var errorElem = document.querySelector('.error-field') //variable for where errors will be logged
var terminalSectionHistory = document.querySelector('.terminal__section--history')
var terminalSection = document.querySelector('.terminal__section')
var playerOneTotalScoreElem = document.querySelector('.player-one-score')
var playerTwoTotalScoreElem = document.querySelector('.player-two-score')
var counter = 5

var playerOneMovesArr = game.playerMoves.playerOneMoves //variable for playerOneArray
var playerTwoMovesArr = game.playerMoves.playerTwoMoves //variable for playerTwoArray
var totalNumMoves = game.numMoves //variable for total moves played
var currentTurn = game.currentPlayer //variable for currentTurn
var playerOneTotalScore = game.playerOneScore
var playerTwoTotalScore = game.playerTwoScore




function checkMatchWin() {
    if (playerOneTotalScore === 2) {
        matchWinCredit('playerOne')
        clearRound()
    } else if (playerTwoTotalScore === 2) {
        matchWinCredit('playerTwo')
        clearRound()
    }
}

function winningState(currentPlayer) {
    var newGame = setInterval(function(){
    errorElem.textContent = `${currentPlayer} wins! new game in ${counter}secs`
    counter--
    if (counter === -1) {
        clearGame();
        clearInterval(newGame);
    }
    }, 1000);
    counter = 5
}

function checkGameStatus() {

    if (totalNumMoves === 9) { //testing whether it's a tie
        errorElem.textContent = "notification: it's a tie - type 'clear' to play again"
    }

    var currentPlayerArr = [] //creating a temporary array for the current player

    if (currentPlayer === 'playerOne') {
        currentPlayerArr = playerOneMovesArr //current player array now = playerOneArr
    } else {
        currentPlayerArr = playerTwoMovesArr //current player array now = playerTwoArr
    }

    var winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    winningCombos.forEach(function(winningCombosArr) {

        var thereIsAWinner = winningCombosArr.every(function(val) {
            return currentPlayerArr.indexOf(val) >= 0;
        })

        if (thereIsAWinner) {
            if (currentPlayer === 'playerOne') { //updating total scores
                playerOneTotalScore++
                playerOneTotalScoreElem.textContent = playerOneTotalScore
                checkMatchWin()
                winningState(currentPlayer)
            } else {
                console.log(currentPlayer)
                playerTwoTotalScore++
                playerTwoTotalScoreElem.textContent = playerTwoTotalScore
                checkMatchWin()
                winningState(currentPlayer)
            }
        }
    })
}

function updateGameStats(cellReference) {

    if (currentPlayer === 'playerOne') {
        playerOneMovesArr.push(cellReference) // pushing the players move into their array
    } else {
        playerTwoMovesArr.push(cellReference) // pushing the players move into their array
    }
    totalNumMoves++ //update the totalnummoves 
}

function updateGUI(chosenCellElem) { //function to update board

    chosenCellElem.classList.add(`cell-fill-${currentPlayer}`)
    chosenCellElem.setAttribute('data-cell-usage', 'filled')
    
    errorElem.textContent = "" //clearing any errors

    $(terminalSectionHistory).append(terminalSectionHistory)
    $(terminalSectionHistory).append($(terminalSection).clone())
    $(terminalSectionHistory).slideDown('slow')

    input.value = "" //clearing the input field
}

function changePlayer() {
    if (currentTurn === 0) { //playerOne Turn
        currentTurn = 1
        currentPlayer = 'playerTwo'
    } else {
        currentTurn = 0
        currentPlayer = 'playerOne'
    }

    playerTurnElem.textContent = currentPlayer // update text for next persons turn
}

function checkIfLegalMove(playerMoveCommand) {
    var cellReference = board[playerMoveCommand] //getting cell reference (1)
    var chosenCellElem = cellsEl[cellReference] //cell chosen
    var chosenCellAttrCellUsage = chosenCellElem.getAttribute('data-cell-usage')

    if (chosenCellAttrCellUsage === 'filled') {
        errorElem.textContent = 'typeError: move already played'
    } else {
        updateGUI(chosenCellElem) //call updateboard function
        updateGameStats(cellReference) //call update game stats function
        checkGameStatus(playerMoveCommand)
        changePlayer()

    }
}

function clearGame() {
    //update GUI stuff
    totalNumMoves = 0
    playerOneMovesArr = []
    playerTwoMovesArr = []

    playerTurnElem.textContent = 'playerOne' //clearing playerturn text
    errorElem.textContent = '' //clearing any errors
    input.value = '' //clearing the input field

    cellsEl.forEach(function (e) {
        e.classList.remove(`cell-fill-playerOne`)
        e.classList.remove(`cell-fill-playerTwo`)
        e.setAttribute('data-cell-usage', 'clear')
    })

    currentPlayer = 'playerOne'
    currentTurn = 0

    $(terminalSectionHistory).hide()

    var terminalSectionHistoryChildren = terminalSectionHistory.childNodes; 
    while (terminalSectionHistoryChildren.length > 0) {
        terminalSectionHistoryChildren[0].remove()
    }

}

function clearRound() {
    //update GUI stuff
    totalNumMoves = 0
    playerOneMovesArr = []
    playerTwoMovesArr = []
    playerOneTotalScore = 0
    playerOneTotalScoreElem.textContent = playerOneTotalScore
    playerTwoTotalScore = 0
    playerTwoTotalScoreElem.textContent = playerTwoTotalScore

    playerTurnElem.textContent = 'playerOne' //clearing playerturn text
    errorElem.textContent = '' //clearing any errors
    input.value = '' //clearing the input field

    cellsEl.forEach(function (e) {
        e.classList.remove(`cell-fill-playerOne`)
        e.classList.remove(`cell-fill-playerTwo`)
        e.setAttribute('data-cell-usage', 'clear')
    })

    currentPlayer = 'playerOne'
    currentTurn = 0

    $(terminalSectionHistory).hide()

    var terminalSectionHistoryChildren = terminalSectionHistory.childNodes; 
    while (terminalSectionHistoryChildren.length > 0) {
        terminalSectionHistoryChildren[0].remove()
    }

    expandTerminal()

}

function checkCommand() {

    var playerMoveCommand = input.value // storing player move input value (middle)

    input.placeholder = "enter command"

    if (playerMoveCommand === 'init') {
        playerTurnElem.textContent = currentPlayer
        expandTerminal()
        return
    }

    if (playerMoveCommand === 'clear') {
        clearGame()
        playerTurnElem.textContent = currentPlayer
        return
    }

    if (commands.includes(playerMoveCommand)) {
        checkIfLegalMove(playerMoveCommand)
    } else {
        errorElem.textContent = 'typeError: invalid command'
    }
}

//while inputting value wait for enter key to be pressed
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkCommand()
    }
});

function newGame() {

    cellsEl.forEach(function (e) {
        e.classList.remove(`cell-fill-playerOne`)
        e.classList.remove(`cell-fill-playerTwo`)
        e.setAttribute('data-cell-usage', 'clear')
    })

    input.placeholder = "type 'init' to begin" //clearing the input field

    currentPlayer = 'playerOne'
    currentTurn = 0

    var terminalSectionHistoryChildren = terminalSectionHistory.childNodes; 
    while (terminalSectionHistoryChildren.length > 0) {
        terminalSectionHistoryChildren[0].remove()
    }

}

newGame()




// reset game completely after winner reaches 2 wins
// only start the game once 'init' has been input
// play a sound on landing screen
// get explanation of iffi on winningstate function -->

// bugs
// when playertwo ones. the counter goes to playerone
