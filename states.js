
var initToggleElems = document.querySelectorAll('.init-toggle')
var commandBtn = document.querySelector('.commands__btn')
var commandListElem = document.querySelector('.commands__list')
var homeBtn = document.querySelector('.home-btn')
var landingScreen = document.querySelector('.landing-screen')

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
    console.log('landing')
    $(landingScreen).delay(2500).fadeOut("slow")

}
landingAnimation()

commandBtn.addEventListener('click', expandCommands)
homeBtn.addEventListener('click', homeExpand)







