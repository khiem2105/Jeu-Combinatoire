import Game from "./Game.js"
import View from "./View.js"


let view = new View(document.getElementById("app"))
let game = new Game()
view.updateColors(game)
view.update(game)

// for(var i = 0; i < game.size; i++) {
//     console.log("Line " + i + "th:")
//     for(var j = 0; j < game.size; j++) {
//         console.log(game.pioneer[i][j])
//     }
// }

// view.updateBoard(game)
// console.log(game.pioneer)

// console.log(game.calculatePoint())

// console.log(game.turn)
// game.makeMove([3, 5], [4, 5])
// game.makeMove([3, 7], [4, 7])
// console.log("Line 3:" + game.pioneer[3])
// console.log("Line 4:" + game.pioneer[4])
// // console.log(game.moveLeft)
// console.log(game.turn)
// game.makeMove([5, 5], [3, 5])
// game.makeMove([3, 5], [3, 7])
// console.log("Line 3:" + game.pioneer[3])
// console.log("Line 4:" + game.pioneer[4])
// console.log(game.turn)

// view.updateBoard(game)


// console.log(game.calculatePoint())
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
        // console.log(game.turn)
    }
}

//Restart function
view.onRestartClick = function() {
    game = new Game()
    view.update(game)
}

view.update(game)