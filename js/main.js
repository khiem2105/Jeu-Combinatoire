import Game from "./Game.js"
import View from "./View.js"
import AI from "./AI.js"

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


// let view = new View(document.getElementById("game-board"))
// let game = new Game()
view.updateColors(game)
// Cell click function
view.onCellClick = function(i) {
    let index = [(i - i % view.size) / view.size, i % view.size]
    if(view.clickCounter < 2) {
        view.clickCounter++
        view.cellClicked.push(index)
        if(view.clickCounter == 2) {
            game.makeMove(view.cellClicked[0], view.cellClicked[1])
            view.clickCounter = 0
            view.cellClicked.length = 0
        }

        view.update(game)
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
