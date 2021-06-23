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
        turn.textContent = `${game.turn} turn`
    }

    updateStatus(game) {
        if(game.checkTerminalState()) {
            const winner = this.root.querySelector("#winner")
            winner.textContent = "Winner: "
            let pointArray = game.calculatePoint()
            if(pointArray[0] < pointArray[1])
                winner.textContent += "AI"
            else if(pointArray[1] < pointArray[0])
                winner.textContent += "You"
            else
                winner.textContent +=  "Tie"
            console.log(winner.textContent)
        }
    }

    updatePoint(game) {
        let pointArray = game.calculatePoint()
        const p1Point = this.root.querySelector("#player1")
        const p2Point = this.root.querySelector("#player2")

        p1Point.textContent = `AI points: ${pointArray[0]}`
        p2Point.textContent = `Your points: ${pointArray[1]}`

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

    async visualizeAIMove([i, j], [k, l]) {
        const cellSrc = this.board.querySelector(`.cell[data-index="${i*9+j}"`)
        const cellDst = this.board.querySelector(`.cell[data-index="${k*9+l}"`)
        cellSrc.classList.add("cellClicked")
        cellDst.classList.add("cellClicked")
        await new Promise(r => setTimeout(r, 500))
        cellSrc.classList.remove("cellClicked")
        cellDst.classList.remove("cellClicked")
    }
}