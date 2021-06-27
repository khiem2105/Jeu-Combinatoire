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
            }
        }
    }

    updateMove(game, [i, j], [k, l]) {
        const cellSrc = this.board.querySelector(`.cell[data-index="${i*9+j}"`)
        const cellDst = this.board.querySelector(`.cell[data-index="${k*9+l}"`)
        let iBetween = i + (k-i)/2
        let jBetween = j + (l-j)/2
        const cellBetween = this.board.querySelector(`.cell[data-index="${iBetween*9+jBetween}"`)
        cellSrc.textContent = ""
        cellBetween.textContent = ""
        cellDst.textContent = game.pioneer[k][l]
        cellSrc.classList.remove("cell-on")
        cellSrc.removeEventListener("mouseover", mouseOn)
        cellSrc.removeEventListener("mouseout", mouseOut)
        cellDst.addEventListener("mouseover", mouseOn)
        cellDst.addEventListener("mouseout", mouseOut)
        cellBetween.classList.remove("cell-on")
        cellBetween.removeEventListener("mouseover", mouseOn)
        cellBetween.removeEventListener("mouseout", mouseOut)
    }

    updateTurn(game) {
        const turn = this.root.querySelector("#turn")
        turn.textContent = `${game.turn} turn`
    }

    updateStatus(game) {
        if(game.checkTerminalState()) {
            this.removeColor()
            const gameOver = this.root.querySelector("#playernameDiv")
            let status = new String(gameOver.textContent)
            if(status.includes("lost") || status.includes("won") || status.includes("tie"))
                return
            let pointArray = game.calculatePoint()
            if(pointArray[0] < pointArray[1]) {
                gameOver.textContent += " lost"
            }
            else if(pointArray[1] < pointArray[0]) {
                gameOver.textContent += " won"
            }
            else {
                gameOver.textContent += " tie"
            }
            var mainDiv = document.getElementById("app");
            var gameOverMenu = document.createElement("div");
            var restartButton = document.createElement("button");
            var menuButton = document.createElement("button");
            var paragraph = document.createElement("p");
            var textGameOver = document.createTextNode("Game Over");
            var textRestart = document.createTextNode("Play Again");
            var textMenu = document.createTextNode("Main Menu");
            paragraph.appendChild(textGameOver);
            restartButton.appendChild(textRestart);
            menuButton.appendChild(textMenu);

            gameOverMenu.className = "pause";
            restartButton.className = "pauseButtons";
            menuButton.className = "pauseButtons";
            paragraph.id = "parag";
            gameOverMenu.appendChild(paragraph);
            gameOverMenu.appendChild(restartButton);
            gameOverMenu.appendChild(menuButton);

            menuButton.addEventListener("click", function(){
                window.location.href = 'index.html';
            });

            restartButton.addEventListener("click", function(){
                window.location.href = 'level.html';
            })

            mainDiv.appendChild(gameOverMenu);

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
        // this.updateTurn(game)
        // this.updateBoard(game)
        this.updatePoint(game)
        this.updateStatus(game)
    }

    async visualizeAIMove([i, j], [k, l]) {
        const cellSrc = this.board.querySelector(`.cell[data-index="${i*9+j}"`)
        const cellDst = this.board.querySelector(`.cell[data-index="${k*9+l}"`)
        cellSrc.classList.add("cellClickedAI")
        cellDst.classList.add("cellClickedAI")
        await new Promise(r => setTimeout(r, 500))
        cellSrc.classList.remove("cellClickedAI")
        cellDst.classList.remove("cellClickedAI")
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
