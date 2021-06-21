export default class Game {
    constructor(ai) {
        // link to AI
        this.ai = ai
        // Size of the board
        this.size = 9
        // Turn: 
        this.turn = "P1";
        // Turn count
        this.turnCount = 1
        // the index that the pioneer from the previous turn moved to
        // use for multi jump
        this.lastIndex = new Array(2).fill(null)
        // move left in a turn
        // for making 2 move in a turn
        this.moveLeft = 2 
        // matrix 9x9 for the board 
        this.board = new Array(this.size).fill(null)
        for(let i = 0; i < this.size; i++) {
            this.board[i] = new Array(this.size)
        }
        // Initialize the board with a value correspond for each case
        for(let i = 0; i < this.size / 2; i++) {
            for(let j = 0; j < this.size; j++) {
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
        for(let i = 0; i < this.size; i++) {
            this.pioneer[i] = new Array(this.size).fill(null)
        }
        //Initialize the postion of the pionners (0 means no pioneer)
        for(let i = 0; i < this.size / 2; i++) {
            for(let j = 0; j < this.size; j++) {
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

    //Calculate points for both players
    calculatePoint() {
        // A point array: point[0]: P1's point, point[1]: P2's point 
        let point = new Array(2).fill(0)
        for(let i = 0; i < this.size / 2 - 1; i++) {
            for(let j = 0; j < this.size; j++) {
                point[0] += this.pioneer[i][j] * this.board[i][j]
                point[1] += this.pioneer[this.size-1-i][j] * this.board[this.size-1-i][j]
            }
        }
        return point
    }

    // Check whether a pioneer can be moved, if yes return the possible positions that it can be moved to 
    checkPioneerCanJump(i, j) {
        // An array to store the possible positions that a pioneer can move to
        let possiblePosition = new Array()
            
        if(i <= this.size- 3 && 0 <= j < this.size && this.pioneer[i+1][j] != 0 && this.pioneer[i+2][j] == 0)
            possiblePosition.push([i+2, j])
        if(i >= 2 && 0 <= j < this.size && this.pioneer[i-1][j] != 0 && this.pioneer[i-2][j] == 0)
            possiblePosition.push([i-2, j])
        if(j <= this.size-3 &&  0 <= i < this.size && this.pioneer[i][j+1] != 0 && this.pioneer[i][j+2] == 0)
            possiblePosition.push([i, j+2])
        if(j >= 2 &&  0 <= i < this.size && this.pioneer[i][j-1] != 0 && this.pioneer[i][j-2] == 0)
            possiblePosition.push([i, j-2])
        
        if(i == 3 || i == 5) {
            if(i == 3 && 0 <= j < this.size && this.pioneer[i+1][j] == 0)
                possiblePosition.push([i+1, j])
            else if(i == 5 &&  0 <= j < this.size && this.pioneer[i-1][j] == 0)
                possiblePosition.push([i-1, j])
        }
        
        return possiblePosition
    }

    // Check terminal state
    checkTerminalState() {
        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                if(this.checkPioneerCanJump(i, j).length > 0)
                    return false
            }
        }
        return true
    }

    // AI Make a jump from index (i, j) to index (k, l)
    AImakeMove([i, j], [k, l]) {

    }

    // Make a jump from index (i, j) to index (k, l)
    makeMove([i, j], [k, l]) {
        if(this.checkTerminalState())
            return

        let possibleMove = this.checkPioneerCanJump(i, j)

        if(!this.checkTerminalState() && possibleMove.length > 0 && arrayIncludesArray(possibleMove, [k, l])) {
            this.pioneer[k][l] = this.pioneer[i][j]
            this.pioneer[i][j] = 0
            if(k-i == 2 || l-j == 2 || k-i == -2 || l-j == -2)
                this.pioneer[i+0.5*(k-i)][j+0.5*(l-j)] = 0
            
            // If the player move a different pioneer than the previous one
            if((this.lastIndex[0] == null && this.lastIndex[1] == null) || (this.lastIndex[0] != i || this.lastIndex [1] != j)) {
                this.moveLeft--
                // If the player has moved 2 different pioneer in his turn
                if(this.moveLeft == 0) {
                    this.changeTurn()
                    return
                }
            }
            // If the player continue to move the same pioneer that he has moved previously and after that
            // no more move can be made, change turn
            if(this.lastIndex[0] == i && this.lastIndex[1] == j && this.checkPioneerCanJump(k, l).length == 0) {
                this.changeTurn()
                return
            }

            this.lastIndex[0] = k, this.lastIndex[1] = l
        }
    }


    AI_make_move_from_list(list_actions) {
        for (let k = 1; k<list_actions.length; k++) {
            let i = list_actions[k-1][0];
            let j = list_actions[k-1][1];
            let ni = list_actions[k][0];
            let nj = list_actions[k][1];
            this.pioneer[ni][nj] = this.pioneer[i][j];
            this.pioneer[i][j] = 0;
            this.pioneer[i+(ni-i)/2][j+(nj-j)/2] = 0;
        }
    }

    testingAI() {
        //console.log(this.ai.Pioneer);
        //console.log(this.pioneer)
        this.ai.sync_data(this.pioneer);
        //console.log(this.ai.Pioneer);
        let ai_pioneer_moved = this.ai.run();
        this.pioneer = ai_pioneer_moved;

        //let list_actions = this.ai.find_the_best_move_all_pioneer()
        //this.AI_make_move_from_list(list_actions)
        //for (let i = 0 ; i<list_actions.length - 1; i++) {
            ////this.AImakeMove(list_actions[i], list_actions[i+1]);

        //}
    }

    changeTurn() {
        this.moveLeft = 2
        this.lastIndex.fill(null)
        this.turnCount++
        this.turn = this.turn == "P1" ? "P2":"P1"
        // Testing AI
        this.testingAI()
        //this.turn = this.turn == "P1" ? "AI":"P1"
    }
}

// A helper function to check whether an array a2 is included inside an array a1
function arrayIncludesArray(a1, a2) {
    for(let i = 0; i < a1.length; i++) {
        if(a1[i][0] == a2[0] && a1[i][1] == a2[1])
            return true
    }
    return false
}


