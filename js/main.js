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
    game.pioneer = game.clone_pioneer(game.log_board[game.current_display_tour])
    view.updateBoard(game)
    nextButton.disabled = false;
    if (game.current_display_tour <= 0) {
        beforeButton.disabled = true;
    }
});

nextButton.addEventListener("click", function(){
    game.current_display_tour ++;
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
    if(game.turn == "Your" && (view.clickCounter != 0 || game.pioneer[index[0]][index[1]] != 0)) {
        if(view.clickCounter == 0) {
            view.board.querySelector(`.cell[data-index="${i}"]`).classList.add("cellClicked")
            view.clickCounter++
            view.cellClicked.push(index)
            addColorToPossibleMove(index)
        }
        else if(view.clickCounter == 1) {
            if(arrayIncludesArray(game.checkPioneerCanJump(view.cellClicked[0][0], view.cellClicked[0][1]), index)) {
                console.log("here")
                view.board.querySelector(`.cell[data-index="${i}"]`).classList.add("cellClicked")
                view.clickCounter++
                view.cellClicked.push(index)
                removeColorInPossibleMove(view.cellClicked[0])
                game.makeMove(view.cellClicked[0], view.cellClicked[1])
                removeColorInPossibleMove(view.cellClicked[0])
                view.clickCounter = 0
                view.cellClicked.length = 0
            }
            else {
                console.log("no here")
                removeColorInPossibleMove(view.cellClicked[0])
                let lastCellClicked = view.board.querySelector(`.cell[data-index="${view.cellClicked[0][0]*9+view.cellClicked[0][1]}"]`)
                lastCellClicked.classList.remove("cellClicked")
                if((view.cellClicked[0][0] != index[0] || view.cellClicked[0][1] != index[1]) && (game.pioneer[index[0]][index[1]] != 0)) {
                    view.board.querySelector(`.cell[data-index="${i}"]`).classList.add("cellClicked")
                    view.cellClicked[0][0] = index[0], view.cellClicked[0][1] = index[1]
                    addColorToPossibleMove(view.cellClicked[0])
                }
                else {
                    view.clickCounter = 0
                    view.cellClicked.length = 0
                }
            }

            view.update(game)
        }
        if (game.log_board.length > 0)  {
            beforeButton.disabled = false;
        }
    }
    else
        console.log("it's not your turn")
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
        game.changeTurn()
        view.removeColor()
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

function addColorToPossibleMove(index) {
    let possbileMoves = game.checkPioneerCanJump(index[0], index[1])
    if(possbileMoves.length > 0) {
        for(let i = 0; i < possbileMoves.length; i++) {
            let k = possbileMoves[i][0]
            let l = possbileMoves[i][1]
            const nextCell = view.board.querySelector(`.cell[data-index="${k*9+l}"]`)
            nextCell.classList.add("possibleMove")
        }
    }
}

function removeColorInPossibleMove(index) {
    // console.log("here")
    console.log(index)
    let possbileMoves = game.checkPioneerCanJump(index[0], index[1])
    if(possbileMoves.length > 0) {
        for(let i = 0; i < possbileMoves.length; i++) {
            console.log(possbileMoves[i])
            let k = possbileMoves[i][0]
            let l = possbileMoves[i][1]
            const nextCell = view.board.querySelector(`.cell[data-index="${k*9+l}"]`)
            nextCell.classList.remove("possibleMove")
            console.log(nextCell.classList)
        }
    }
}