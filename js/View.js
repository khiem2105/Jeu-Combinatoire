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
                cell.classList.add("cellClicked")
                if(this.onCellClick)
                    this.onCellClick(cell.dataset.index)
            })
        })
        // Adding event listener for the restart button
        this.root.querySelector("#reset").addEventListener("click", () => {
            if(this.onRestartClick)
                this.onRestartClick();
        })        
    }

    updateBoard(game) {
        for(var i = 0; i < game.size; i++) {
            for(let j = 0; j < game.size; j++) {
                const cell = this.board.querySelector(`.cell[data-index="${i*9+j}"`)
                cell.textContent = ""
                if(game.pioneer[i][j] != 0)
                    cell.textContent = game.pioneer[i][j]
            }
        }
    }

    updateTurn(game) {
        const turn = this.root.querySelector("#turn")
        turn.textContent = `${game.turn}'s turn`
    }

    updateStatus(game) {
        const winner = this.root.querySelector("#winner")
        winner.textContent = "Winner: "
        if(game.checkTerminalState()) {
            let pointArray = game.calculatePoint()
            if(pointArray[0] > point[1])
                winner.textContent += "Player 1"
            else if(pointArray[1] > point[0])
                winner.textContent += "Player 2"
            else
                winner.textContent +=  "Tie"
        }
    }

    updatePoint(game) {
        let pointArray = game.calculatePoint()
        const p1Point = this.root.querySelector("#player1")
        const p2Point = this.root.querySelector("#player2")

        p1Point.textContent = `P1 points: ${pointArray[1]}`
        p2Point.textContent = `AI points: ${pointArray[0]}`

    }

    update(game) {
        this.updateTurn(game)
        this.updateBoard(game)
        this.updateStatus(game)
        this.updatePoint(game)
    }
}