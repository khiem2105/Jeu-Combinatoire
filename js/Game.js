export default class Game {
    constructor() {
        // Total cell on the board
        this.size = 9
        // Turn: 
        this.turn = "P1";
        // matrix 9x9 for the board 
        this.board = new Array(this.size).fill(null)
        for(var i = 0; i < this.size; i++) {
            this.board[i] = new Array(this.size)
        }
        // Initialize the board with a value correspond for each case
        for(var i = 0; i < this.size / 2; i++) {
            for(var j = 0; j < this.size; j++) {
                if(i == 0) {
                    if(j == 1 || j == 4 || j == 7)
                        this.board[i][j] = this.board[this.size-1-i][j] =  1
                        
                    else
                        this.board[i][j] = this.board[this.size-1-i][j] = 2
                }
                else if(i == 1) {
                    if(j == 1 || j == 7)
                        this.board[i][j] = this.board[this.size-1-i][j] = 2
                    else
                        this.board[i][j] = this.board[this.size-1-i][j] = 1
                }
                else if(i == 2) {
                    if(j == 4)
                        this.board[i][j] = this.board[this.size-1-i][j] = 3
                    else if(j == 2 || j == 6)
                        this.board[i][j] = this.board[this.size-1-i][j] = 2
                    else
                        this.board[i][j] = this.board[this.size-1-i][j] = 1
                }
                else if(i == 3) {
                    if(j == 3 || j == 5)
                        this.board[i][j] = this.board[this.size-1-i][j] = 2
                    else
                        this.board[i][j] = this.board[this.size-1-i][j] = 1
                }
                else
                    this.board[i][j] = 0
            }

        }
        //A 9x9 matrix for the position of the pionners
        this.pioneer = new Array(this.size).fill(null)
        for(var i = 0; i < this.size; i++) {
            this.pioneer[i] = new Array(this.size).fill(null)
        }
        //Initialize the postion of the pionners (0 means no pioneer)
        for(var i = 0; i < this.size / 2; i++) {
            for(var j = 0; j < this.size; j++) {
                if(i == 0) {
                    if(j == 1 || j == 7)
                        this.pioneer[i][j] = this.pioneer[this.size-1-i][j] = 5
                    else
                        this.pioneer[i][j] = this.pioneer[this.size-1-i][j] = 3
                }
                else if(i == 1) {
                    if(j == 4)
                        this.pioneer[i][j] = this.pioneer[this.size-1-i][j] = 5
                    else
                        this.pioneer[i][j] = this.pioneer[this.size-1-i][j] = 1
                }
                else if(i == 2) {
                    if(j == 2 || j == 6)
                        this.pioneer[i][j] = this.pioneer[this.size-1-i][j] = 5
                    else
                        this.pioneer[i][j] = this.pioneer[this.size-1-i][j] = 3
                }
                else if(i == 3)
                    this.pioneer[i][j] = this.pioneer[this.size-1-i][j] = 1
                else
                    this.pioneer[i][j] = 0    
            }
        }
    }
}