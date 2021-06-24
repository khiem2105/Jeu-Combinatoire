import Game from "./Game.js"
import View from "./View.js"
import AI from "./AI.js"

var beforeButton = document.getElementById("before");
var nextButton = document.getElementById("next");

let view = new View(document.getElementById("app"))
let ai = new AI()
var element_mode = document.getElementById("mode");
var mode = element_mode.getAttribute("name")
//var name = element.getAttribute("name");
//console.log("mode", mode)
// let game = new Game()
let game = new Game(ai, view, mode)
view.updateColors(game)
view.update(game)
view.updateBoard(game)
view.updateTurn(game)

beforeButton.addEventListener("click", function(){
    game.current_display_tour --;
    console.log(game.current_display_tour, game.turnCount)
    game.pioneer = game.clone_pioneer(game.log_board[game.current_display_tour])
    view.updateBoard(game)
    nextButton.disabled = false;
    if (game.current_display_tour <= 0) {
        beforeButton.disabled = true;
    }
});

nextButton.addEventListener("click", function(){
    game.current_display_tour ++;
    console.log(game.current_display_tour, game.turnCount)
    game.pioneer = game.clone_pioneer(game.log_board[game.current_display_tour])
    view.updateBoard(game)
    beforeButton.disabled = false;
    if (game.current_display_tour >= game.turnCount-2) {
        nextButton.disabled = true;
    }
});

// let view = new View(document.getElementById("game-board"))
// let game = new Game()
view.updateColors(game)
// Cell click function
view.onCellClick = function(i) {
    let index = [(i - i % view.size) / view.size, i % view.size]
    if(view.clickCounter == 0) {
        view.clickCounter++
        view.cellClicked.push(index)
    }
    else if(view.clickCounter == 1) {
        console.log(game.checkPioneerCanJump(view.cellClicked[0][0], view.cellClicked[0][1]).includes(index))
        if(arrayIncludesArray(game.checkPioneerCanJump(view.cellClicked[0][0], view.cellClicked[0][1]), index)) {
            view.clickCounter++
            view.cellClicked.push(index)
            if(view.clickCounter == 2) {
                game.makeMove(view.cellClicked[0], view.cellClicked[1])
                view.clickCounter = 0
                view.cellClicked.length = 0
            }
        }
        else {
            let lastCellClicked = view.board.querySelector(`.cell[data-index="${view.cellClicked[0][0]*9+view.cellClicked[0][1]}"]`)
            lastCellClicked.classList.remove("cellClicked")
            view.cellClicked[0][0] = index[0], view.cellClicked[0][1] = index[1]
            console.log(view.cellClicked)
        }

        view.update(game)
    }
    if (game.log_board.length > 0)  {
        beforeButton.disabled = false;
    }
}

//Restart function
view.onRestartClick = function() {
    game = new Game(ai, view)
    view.update(game)
    view.updateBoard(game)
    view.updateTurn(game)
}

// Listen for "P" pressed then pass the turn
document.addEventListener("keypress", (e) => {
    if(e.key === "p" && game.inMultiJump) {
        console.log("Pass the turn")
        game.changeTurn()
        // game.testingAI()
    }
})

// A helper function to check whether an array a2 is included inside an array a1
function arrayIncludesArray(a1, a2) {
    for(let i = 0; i < a1.length; i++) {
        if(a1[i][0] == a2[0] && a1[i][1] == a2[1])
            return true
    }
    return false
}
