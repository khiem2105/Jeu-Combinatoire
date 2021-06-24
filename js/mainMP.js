import Game from "./GameMP.js"
import View from "./ViewMP.js"
console.log("heere")

let view = new View(document.getElementById("app"))

// let game = new Game()
let game = new Game(view)
view.updateColors(game)
view.update(game)

var beforeButton = document.getElementById("before");
var nextButton = document.getElementById("next");
beforeButton.disabled = false;

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

view.update(game)
// Listen for "P" pressed then pass the turn
document.addEventListener("keypress", (e) => {
    if(e.key == "p" && game.inMultiJump) {
        console.log("pass the turn")
        game.changeTurn()
    }
    else
        console.log("here")
})

// A helper function to check whether an array a2 is included inside an array a1
function arrayIncludesArray(a1, a2) {
    for(let i = 0; i < a1.length; i++) {
        if(a1[i][0] == a2[0] && a1[i][1] == a2[1])
            return true
    }
    return false
}

