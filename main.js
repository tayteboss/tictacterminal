// THE GAME
// recieve input a move (string) 'playerInputMove'
// determine whose move it is (if 0 than playerOne if 1 than playerTwo)
// store a variable of the players cell reference (1 = 'top-centre')
// use these as an arguement for the rest of the method
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





var commands = [ // list of all valid commands
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

var board = { // cell references
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

var game = { // storing all generic game details
    numMoves: 0,
    playerMoves: {
        playerOneMoves: [],
        playerTwoMoves: [],
    },
    currentPlayer: 0,
    playerOneScore: 0,
    playerTwoScore: 0
}

// GUI variables
var input = document.querySelector('.player-move-input')
var playerTurnElem = document.querySelector('.player-turn')
var cellsEl = document.querySelectorAll('.cells')
var errorElem = document.querySelector('.error-field') 
var terminalSectionHistory = document.querySelector('.terminal__section--history')
var terminalSection = document.querySelector('.terminal__section')
var playerOneTotalScoreElem = document.querySelector('.player-one-score')
var playerTwoTotalScoreElem = document.querySelector('.player-two-score')

// Backend Variables
var playerOneMovesArr = game.playerMoves.playerOneMoves
var playerTwoMovesArr = game.playerMoves.playerTwoMoves
var totalNumMoves = game.numMoves
var currentTurn = game.currentPlayer
var playerOneTotalScore = game.playerOneScore
var playerTwoTotalScore = game.playerTwoScore
var counter = 5


function changePlayer() { // finally change the player turn
    if (currentTurn === 0) { //playerOne Turn
        currentTurn = 1
        currentPlayer = 'playerTwo'
    } else {
        currentTurn = 0
        currentPlayer = 'playerOne'
    }

    playerTurnElem.textContent = currentPlayer // update text for next persons turn
}

function winningState(currentPlayer) { // run a 5 sec countdown before clearing round and notify who won
    var newGame = setInterval(function(){
        errorElem.textContent = `${currentPlayer} wins! new round in ${counter}secs`
        counter--
        if (counter === -1) {
            clearRound();
            clearInterval(newGame);
        }
    }, 1000);
    counter = 5 // reset counter to 5 for next round
}

function checkGameWin() { // checking if game has been won. if so show player won credit screen and clear the game
    if (playerOneTotalScore === 2) {
        matchWinCredit('playerOne')
        clearGame()
    } else if (playerTwoTotalScore === 2) {
        matchWinCredit('playerTwo')
        clearGame()
    }
}

function checkGameStatus() { // checks game status for winning round/game and if its a tie

    if (totalNumMoves === 9) { // testing whether it's a tie
        errorElem.textContent = "notification: it's a tie - type 'clear' to play again"
    }

    var currentPlayerArr = [] // creating a temporary array for the current player (generic winning testing)

    if (currentPlayer === 'playerOne') { // making the current players move array the generic array
        currentPlayerArr = playerOneMovesArr
    } else {
        currentPlayerArr = playerTwoMovesArr
    }

    var winningCombos = [ // list of all winning combinations
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    winningCombos.forEach(function(winningCombosArr) { // loops through each array

        var thereIsAWinner = winningCombosArr.every(function(val) { // testing whether the current player array has the same numbers in one of the winning combo arrays - if so make 'thereisawinner' variable true
            return currentPlayerArr.indexOf(val) >= 0;
        })

        if (thereIsAWinner) { // if thereisawinner is true, check which player is current and update their scores
            if (currentPlayer === 'playerOne') {
                playerOneTotalScore++
                playerOneTotalScoreElem.textContent = playerOneTotalScore
                checkGameWin() // check if the game has been won yet
                winningState(currentPlayer) // get next round ready
            } else {
                console.log(currentPlayer)
                playerTwoTotalScore++
                playerTwoTotalScoreElem.textContent = playerTwoTotalScore
                checkGameWin()  // check if the game has been won yet
                winningState(currentPlayer)  // get next round ready
            }
        }
    })
}

function updateGameStats(cellReference) { // updating all backend stats

    if (currentPlayer === 'playerOne') {
        playerOneMovesArr.push(cellReference) // pushing the players move into their array
    } else {
        playerTwoMovesArr.push(cellReference) // pushing the players move into their array
    }
    totalNumMoves++ //update the totalnummoves 
}

function updateGUI(chosenCellElem) { // updates all GUI 

    input.placeholder = "enter command" // changing input.placeholder to enter command for the rest of the game

    chosenCellElem.classList.add(`cell-fill-${currentPlayer}`) // adds styling to chosen cell (fill or stroke depending on player)
    chosenCellElem.setAttribute('data-cell-usage', 'filled') // sets chosen cell attribute usage to filled for future reference
    
    errorElem.textContent = "" // clearing any errors (so errors don't get appending to terminal history)

    // $(terminalSectionHistory).append(terminalSectionHistory)
    $(terminalSectionHistory).append($(terminalSection).clone()) // append current move to the terminal history section make sure to clone it
    $(terminalSectionHistory).slideDown('slow') // animate in the history section for the first time

    input.value = "" //clearing the input field for next move
}

function checkIfLegalMove(playerMoveCommand) { // checks if move has already been made. if so, throw an error. if not, store that move for future ref

    var cellReference = board[playerMoveCommand] // storing cell reference (1)
    var chosenCellElem = cellsEl[cellReference] // storing cell chosen
    var chosenCellAttrCellUsage = chosenCellElem.getAttribute('data-cell-usage') // variable for chosen cell data attribute

    if (chosenCellAttrCellUsage === 'filled') { // if the chosen cell already has a data attribute of filled - throw error. if not, move on with control flow
        errorElem.textContent = 'typeError: move already played'
    } else {
        updateGUI(chosenCellElem)
        updateGameStats(cellReference)
        checkGameStatus(playerMoveCommand)
        changePlayer()

    }
}

function clearRound() { // runs once round is complete - clears most GUI & some Backend stats
    totalNumMoves = 0
    playerOneMovesArr = []
    playerTwoMovesArr = []

    errorElem.textContent = ''
    playerTurnElem.textContent = ''
    input.value = "type 'init' to begin"

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

    newGame()

}

function clearGame() { // runs once game is complete - clears all GUI & Backend stats
    totalNumMoves = 0
    playerOneMovesArr = []
    playerTwoMovesArr = []
    playerOneTotalScore = 0
    playerOneTotalScoreElem.textContent = playerOneTotalScore
    playerTwoTotalScore = 0
    playerTwoTotalScoreElem.textContent = playerTwoTotalScore
    playerTurnElem.textContent = 'playerOne'
    errorElem.textContent = ''
    input.value = ''

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

function checkCommand() { // checks the input value to decide whether to continue the control flow or reply with an error

    var playerMoveCommand = input.value // storing the players input value

    if (playerMoveCommand === 'init') { // if init is input - collapses the instructions section & displays playerturn
        expandTerminal()
        playerTurnElem.textContent = currentPlayer
        return
    }

    if (playerMoveCommand === 'clear') { // if clear is input - it runs clearRound function
        clearRound()
        playerTurnElem.textContent = currentPlayer
        return
    }

    if (commands.includes(playerMoveCommand)) { // if input is one of the commands it moves on through to the next stage of the control flow
        checkIfLegalMove(playerMoveCommand)
    } else { // if input doesn't match any of the commands it throws an error
        errorElem.textContent = 'typeError: invalid command'
    }
}


input.addEventListener('keypress', function (e) { // game waits for the enter key to pressed while the user is focused on the input field
    if (e.key === 'Enter') {
        checkCommand()
    }
});

function newGame() { // on refresh this function runs to get everything setup for the game

    input.placeholder = "type 'init' to begin"

    currentPlayer = 'playerOne'
    currentTurn = 0

}

newGame()


