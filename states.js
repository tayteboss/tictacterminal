
var initToggleElems = document.querySelectorAll('.init-toggle')
var commandBtn = document.querySelector('.commands__btn')
var commandListElem = document.querySelector('.commands__list')
var homeBtn = document.querySelector('.home-btn')

function expandTerminal() {
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

commandBtn.addEventListener('click', expandCommands)
homeBtn.addEventListener('click', homeExpand)







