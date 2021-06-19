import Game from "./Game.js"
import View from "./View.js"


let view = new View(document.getElementById("game-board"))
let game = new Game()

for(var i = 0; i < game.size; i++) {
    console.log("Line " + i + "th:")
    for(var j = 0; j < game.size; j++) {
        console.log(game.pioneer[i][j])
    }
}

view.updateBoard(game)