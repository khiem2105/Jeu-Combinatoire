import Game from "./GameMP.js"
import View from "./ViewMP.js"

let view = new View(document.getElementById("app"))

// let game = new Game()
let game = new Game(view)
view.updateColors(game)
view.update(game)

// Cell click function
view.onCellClick = function(i) {
    let index = [(i - i % view.size) / view.size, i % view.size]
    if(view.clickCounter < 2) {
        view.clickCounter++
        view.cellClicked.push(index)
        if(view.clickCounter == 2) {
            game.makeMove(view.cellClicked[0], view.cellClicked[1])
            view.cellClicked.forEach(index => {
                const cell = this.board.querySelector(`.cell[data-index="${index[0]*9+index[1]}"`)
                cell.classList.remove("cellClicked")
            })
            view.clickCounter = 0
            view.cellClicked.length = 0

        }
        view.update(game)
    }
}

// Listen for "P" pressed then pass the turn
document.addEventListener("keypress", (e) => {
    if(e.key == "p" && game.inMultiJump) {
        console.log("pass the turn")
        game.changeTurn()
    }
    else
        console.log("here")
})