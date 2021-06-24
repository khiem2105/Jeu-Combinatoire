export default class GameView {
    constructor(root) {
        this.root = root
        this.board = root.querySelector("#game-board")
        this.size = 9
        // A counter for numbers of cell the player has clicked
        this.clickCounter = 0
        // An array to store the position of the cells the player has clicked
        this.cellClicked = new Array()
        for(var i = 0; i < this.size * this.size; i++) {
            this.board.innerHTML += `
                <div class="cell" data-index=` + i + `></div>
            `
        }
        // Function for handling click event on cell
        this.onCellClick = undefined
        // Function for handling click event on restart button
        this.onRestartClick = undefined
        // Adding event listener for all the cells
        this.board.querySelectorAll(".cell").forEach(cell => {
            cell.addEventListener("click", () => {
                if(this.onCellClick)
                    this.onCellClick(cell.dataset.index)
            })
        })    
    }

    updateBoard(game) {
        for(var i = 0; i < game.size; i++) {
            for(let j = 0; j < game.size; j++) {
                const cell = this.board.querySelector(`.cell[data-index="${i*9+j}"`)
                cell.textContent = ""
                if(game.pioneer[i][j] != 0) {
                    cell.textContent = game.pioneer[i][j]
                    cell.addEventListener("mouseover", mouseOn)
                    cell.addEventListener("mouseout", mouseOut)
                }
                else {
                    cell.removeEventListener("mouseover", mouseOn)
                    cell.removeEventListener("mouseout", mouseOut)
                }
            }
        }
    }

    updateTurn(game) {
        const turn = this.root.querySelector("#turn")
        turn.textContent = `${game.turn}'s turn`
    }

    updateStatus(game) {
        if(game.checkTerminalState()) {
            this.removeColor()
            const winner = this.root.querySelector("#winner")
            winner.textContent = "Winner: "
            let pointArray = game.calculatePoint()
            if(pointArray[0] < pointArray[1])
                winner.textContent += "P1"
            else if(pointArray[1] < pointArray[0])
                winner.textContent += "P2"
            else
                winner.textContent +=  "Tie"
            console.log(winner.textContent)
        }
    }

    updatePoint(game) {
        let pointArray = game.calculatePoint()
        const p1Point = this.root.querySelector("#player1")
        const p2Point = this.root.querySelector("#player2")

        p1Point.textContent = `P1 points: ${pointArray[0]}`
        p2Point.textContent = `P2 points: ${pointArray[1]}`

    }

    updateColors(game){
        for(var i = 0; i < game.size; i++) {
            for(let j = 0; j < game.size; j++) {
                const cell = this.board.querySelector(`.cell[data-index="${i*9+j}"`)
                
                if (game.board[i][j] == 1) cell.classList.add("light")

                else{
                    if(game.board[i][j] == 2) cell.classList.add("medium")
                    else{
                        if (game.board[i][j] == 3) cell.classList.add("dark")
                        else cell.classList.add("neutral")
                    }
                }
            }
        }
    }

    update(game) {
        this.updateTurn(game)
        this.updateBoard(game)
        this.updatePoint(game)
        this.updateStatus(game)
    }

    removeColor() {
        this.board.querySelectorAll(".cell").forEach((cell) => {
            cell.classList.remove("cell-on")
            cell.classList.remove("possible-move")
            cell.classList.remove("cellClicked")
        })
    }
}

// mouse on function
let mouseOn = function(event) {
    event.currentTarget.classList.add("cell-on")
}
// mouse out function
let mouseOut = function(event) {
    event.currentTarget.classList.remove("cell-on")
}