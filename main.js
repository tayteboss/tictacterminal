

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
    'restart'
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
    currentPlayer: 0
}

var input = document.querySelector('.player-move-input') //variable for input field
var playerTurnElem = document.querySelector('.player-turn') //variable for where playerturn text will go
var cellsEl = document.querySelectorAll('.cells') //location cells elements
var errorElem = document.querySelector('.error-field') //variable for where errors will be logged

var playerOneMovesArr = game.playerMoves.playerOneMoves //variable for playerOneArray
var playerTwoMovesArr = game.playerMoves.playerTwoMoves //variable for playerTwoArray
var totalNumMoves = game.numMoves //variable for total moves played
var currentTurn = game.currentPlayer //variable for currentTurn
var currentPlayer = ''



function winningState(playerMoveCommand) {
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (playerMoveCommand !== 'restart') {
                errorElem.textContent = `type 'restart' to play again!`
            } else {
                clearGame()
            }
        }
    });
}

function checkGameStatus(playerMoveCommand) {

    if (totalNumMoves === 9) { //testing whether it's a tie
        errorElem.textContent = "notification: it's a tie - type 'clear' to play again"
    }

    var currentPlayerArr = [] //creating a temporary array for the current player

    if (currentPlayer === 'playerOne') {
        currentPlayerArr = playerOneMovesArr //current player array now = their global array
    } else {
        currentPlayerArr = playerTwoMovesArr
    }

    var winningCombo1 = currentPlayerArr.includes(0) && currentPlayerArr.includes(1) && currentPlayerArr.includes(2)
    var winningCombo2 = currentPlayerArr.includes(3) && currentPlayerArr.includes(4) && currentPlayerArr.includes(5)
    var winningCombo3 = currentPlayerArr.includes(6) && currentPlayerArr.includes(7) && currentPlayerArr.includes(8)
    var winningCombo4 = currentPlayerArr.includes(0) && currentPlayerArr.includes(3) && currentPlayerArr.includes(6)
    var winningCombo5 = currentPlayerArr.includes(1) && currentPlayerArr.includes(4) && currentPlayerArr.includes(7)
    var winningCombo6 = currentPlayerArr.includes(2) && currentPlayerArr.includes(5) && currentPlayerArr.includes(8)
    var winningCombo7 = currentPlayerArr.includes(0) && currentPlayerArr.includes(4) && currentPlayerArr.includes(8)
    var winningCombo8 = currentPlayerArr.includes(2) && currentPlayerArr.includes(4) && currentPlayerArr.includes(6)

    if (winningCombo1 || winningCombo2 || winningCombo3 || winningCombo4 || winningCombo5 || winningCombo6 || winningCombo7 || winningCombo8) {
        errorElem.textContent = `notification: ${currentPlayer} wins - type 'clear' to play again`
        winningState(playerMoveCommand)
    }
}

function updateGameStats(cellReference) {

    if (currentPlayer === 'playerOne') {
        playerOneMovesArr.push(cellReference) // pushing the players move into their array
    } else {
        playerTwoMovesArr.push(cellReference)
    }
    totalNumMoves++ //update the totalnummoves 
}

function updateGUI(chosenCellElem) { //function to update board

    chosenCellElem.classList.add(`cell-fill-${currentPlayer}`)
    chosenCellElem.setAttribute('data-cell-usage', 'filled')

    errorElem.textContent = "" //clearing any errors
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

//function to recieve input once triggered
function checkIfLegalMove(playerMoveCommand) {
    var cellReference = board[playerMoveCommand] //getting cell reference (1)
    var chosenCellElem = cellsEl[cellReference] //cell chosen
    var chosenCellAttrCellUsage = chosenCellElem.getAttribute('data-cell-usage')

    if (chosenCellAttrCellUsage === 'filled') {
        errorElem.textContent = 'typeError: move already played'
    } else {
        updateGUI(chosenCellElem) //call updateboard function
        updateGameStats(cellReference) //call updategamestats function
        checkGameStatus(playerMoveCommand)
        changePlayer()

    }
}

function clearGame() {
    //update GUI stuff
    totalNumMoves = 0
    playerOneMovesArr = []
    playerTwoMovesArr = []

    currentPlayer = 'playerOne'
    currentTurn = 0

    playerTurnElem.textContent = '' //clearing playerturn text
    errorElem.textContent = '' //clearing any errors
    input.value = '' //clearing the input field

    cellsEl.forEach(function (e) {
        e.classList.remove(`cell-fill-playerOne`)
        e.classList.remove(`cell-fill-playerTwo`)
        e.setAttribute('data-cell-usage', 'clear')
    })
}

function checkCommand() {

    var playerMoveCommand = input.value // storing player move input value (middle)

    if (playerMoveCommand === 'init') {
        playerTurnElem.textContent = currentPlayer
        expandTerminal()
        return
    }

    if (playerMoveCommand === 'clear') {
        clearGame()
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

clearGame()




// stop the game once there's a winner
// only start the game once 'init' has been input
// store scores
