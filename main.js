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

var board = { //cell references
    'top_left': 0,
    'top_centre': 1,
    'top_right': 2,
    'middle_left': 3,
    'middle': 4,
    'middle_right': 5,
    'bottom_left': 6,
    'bottom_centre': 7,
    'bottom_right': 8
}

var game = { //storing all generic game details
    numMoves: 0,
    playerMoves: {
        playerOneMoves: [0, 1,],
        playerTwoMoves: [],
    },
    currentPlayer: 0
}

var input = document.querySelector('.player-move-input') //variable for input field
var playerTurnElem = document.querySelector('.player-turn')
var cellsEl = document.querySelectorAll('.cells') // location cells elements

var playerOneMovesArr = game.playerMoves.playerOneMoves //variable for playerOneArray
var playerTwoMovesArr = game.playerMoves.playerTwoMoves //variable for playerTwoArray
var totalNumMoves = game.numMoves //variable for total moves played
var currentTurn = game.currentPlayer //variable for currentTurn







function checkGameStatus() {
    //check if playerMovesArr has these numbers 123 || 456 || 789 || 147 || 258 || 369 || 159 || 357
    //if so evaluateWinner
    //if not play next move
    if (playerOneMovesArr.includes(0) && playerOneMovesArr.includes(1) && playerOneMovesArr.includes(2)) {
        console.log('player one wins')
        // print which player wins
        // don't allow next turn
    }
}


function updateGameStats(playerTurn, cellReference) {

    if (playerTurn === 'playerOne') {
        playerOneMovesArr.push(cellReference) // pushing the players move into their array
    } else {
        playerTwoMovesArr.push(cellReference)
    }

    totalNumMoves++ //update the totalnummoves 
}



function updateGUI(playerTurn, cellReference) { //function to update board

    //looping through each cell
    cellsEl.forEach(function(chosenCellElem) {

        
        var chosenCellAttrCellUsage = chosenCellElem.getAttribute('data-cell-usage')
        var chosenCellAttrCellRef = Number(chosenCellElem.getAttribute('data-cell-ref'))
        
        if (chosenCellAttrCellRef === cellReference) {
    
            //checking if choosen cell has already been made
            if (chosenCellAttrCellUsage === 'filled') { 
                console.log('move already made')
                // if (currentTurn === 0) { //revert back player
                //     currentTurn = 1
                //     var playerTurn = 'playerOne'
                // } else {
                //     currentTurn = 0
                //     var playerTurn = 'playerTwo'
                // }
            

            }
            //if not than fill that cell with appropriate style
            else if (chosenCellAttrCellRef == cellReference) {
                chosenCellElem.classList.add(`cell-fill-${playerTurn}`)
                chosenCellElem.setAttribute('data-cell-usage', 'filled')
            }
        }

    })
}


//function to recieve input once triggered
function submitInputMove() {

    var playerMove = input.value //turning players input into string
    var cellReference = board[playerMove] //getting cell reference

    if (currentTurn === 0) { //playerOne Turn
        currentTurn = 1
        var playerTurn = 'playerOne'
    } else {
        currentTurn = 0
        var playerTurn = 'playerTwo'
    }

    // var playerTwoInputMove = 'top_right'
    updateGUI(playerTurn, cellReference) //call updateboard function
    updateGameStats(playerTurn, cellReference) //call updategamestats function
    checkGameStatus()

}


//while inputting value wait for enter key to be pressed
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        submitInputMove()
    }
});




