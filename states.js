
var initToggleElems = document.querySelectorAll('.init-toggle')
var commandBtn = document.querySelector('.commands__btn')
var commandListElem = document.querySelector('.commands__list')
var homeBtn = document.querySelector('.home-btn')
var landingScreen = document.querySelector('.landing-screen')
var playerOneCreditScreen = document.querySelector('.player-one-credit')
var playerTwoCreditScreen = document.querySelector('.player-two-credit')
// var sound = new Audio('img/landing.mp3');

function expandTerminal() {
    input.value = '' //clearing the input field
    initToggleElems.forEach(function(elem) {
        $(elem).slideToggle('slow')
    })
}

function expandCommands() {
    $(commandListElem).slideToggle('slow')
}

function homeExpand() {
    initToggleElems.forEach(function(elem) {
        $(elem).slideToggle('slow')
    })
}

function landingAnimation() {
    // sound.play();
    $(playerOneCreditScreen).css("display", "flex").hide()
    $(playerTwoCreditScreen).css("display", "flex").hide()
    var $svgElems = $('#Layer_1-2 path')
    // $svgElems.delay(100).fadeIn()

    $(landingScreen).delay(100).fadeOut("slow")
}
landingAnimation()

function matchWinCredit(player) {
    if (player === 'playerOne') {
        $(playerOneCreditScreen).fadeIn().delay(5000).fadeOut();
    } else {
        $(playerTwoCreditScreen).fadeIn().delay(5000).fadeOut();
    }
}

commandBtn.addEventListener('click', expandCommands)
homeBtn.addEventListener('click', homeExpand)







