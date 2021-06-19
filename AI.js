var readline = require('readline');

SIZE_BOARD = 9

_board = [[-2, -1, -2, -2, -1, -2, -2, -1, -2],
         [-1, -2, -1, -1, -1, -1, -1, -2, -1],
         [-1, -1, -2, -1, -3, -1, -2, -1, -1],
         [-1, -1, -1, -2, -1, -2, -1, -1, -1],
         [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
         [ 1,  1,  1,  2,  1,  2,  1,  1,  1],
         [ 1,  1,  2,  1,  3,  1,  2,  1,  1],
         [ 1,  2,  1,  1,  1,  1,  1,  2,  1],
         [ 2,  1,  2,  2,  1,  2,  2,  1,  2]
]
const Board = Object.freeze(_board)

_pion  = [[ 3,  5,  3,  3,  3,  3,  3,  3,  5],
         [ 1,  1,  1,  1,  5,  1,  1,  1,  1],
         [ 3,  3,  5,  3,  3,  3,  5,  3,  3],
         [ 1,  1,  1,  1,  1,  1,  1,  1,  1],
         [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
         [ 1,  1,  1,  1,  1,  1,  1,  1,  1],
         [ 3,  3,  5,  3,  3,  3,  5,  3,  3],
         [ 1,  1,  1,  1,  5,  1,  1,  1,  1],
         [ 3,  5,  3,  3,  3,  3,  3,  3,  5]
]
const Pion = Object.freeze(_pion)

function make_clone_pion (pion) {
    let clone_pion = []
    for (let i = 0; i<SIZE_BOARD; i++) {
        let row = [];
        for (let j = 0; j<SIZE_BOARD; j++) {
            row.push(pion[i][j]);
        }
        clone_pion.push(row);
    }
    return clone_pion;
}

function display(table, text="BOARD") {
    console.log("Display", text);
    console.log("    0  1  2  3  4  5  6  7  8");
    console.log("_____________________________");
    for (let i = 0; i<SIZE_BOARD; i++) {
          process.stdout.write(i.toString() + " |");
           for (let j = 0; j<SIZE_BOARD; j++) {
            //console.log(table[i][j]);
            if (j%2==0) {
               if (table[i][j] >= 0)  {
                   process.stdout.write(" "+ table[i][j].toString()+ " " );
               }
               else
                   process.stdout.write(table[i][j].toString() + " " );
            } else {
            if (table[i][j] >= 0)  {
                process.stdout.write(" "+ table[i][j].toString()+ "|" );
            }
            else
                process.stdout.write(table[i][j].toString() + "|" );
            }
        }
        console.log();
       if (i%2)
         console.log("--------------------------------");
    }
}


function score_player (board, pion) {
    let ans = 0;
    for (let i = 0; i<SIZE_BOARD; i++) {
        for (let j = 0; j<SIZE_BOARD; j++) {
           if (board[i][j] <= 0 ) continue;
            ans += board[i][j] * pion[i][j];
        }
    }
   return ans;
}


function score_AI (board, pion) {
    let ans = 0;
    for (let i = 0; i<SIZE_BOARD; i++) {
        for (let j = 0; j<SIZE_BOARD; j++) {
           if (board[i][j] >= 0 ) continue;
            ans += board[i][j] * pion[i][j];
        }
    }
   return -ans;
}

function heuristic (board, pion) {
    //console.log();
    //console.log("---------------------")
    //console.log(pion);
    //display(pion, "Calculate heuristic PION");
    let ans = 0;
    for (let i = 0; i<SIZE_BOARD; i++) {
        for (let j = 0; j<SIZE_BOARD; j++) {
            ans += board[i][j] * pion[i][j];
        }
    }
    //console.log("---------------------")
    //console.log();
   return ans;
}

//console.log(heuristic(Board, Pion));


// direction table 
//          [right, left,   up,  down]
direction_i = [1,    -1,    0,    0];
direction_j = [0,     0,    -1,   1]


// function check if a position (i, j) is valid 
// it's mean that 0 < i, j  < SIZE_BOARD
function pos_is_valid(i, j) {
    return 0 <= i && i < SIZE_BOARD && 0 <= j && j < SIZE_BOARD;
}

//function find_the_next_move(board, pion)  {

//}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function find_the_best_move_one_pion (board, pion, i, j, actions=[], max_heuristic=-999) {
    let max_actions = [...actions]
    let can_not_move = true;
    let first = true;
    for (let dir = 0; dir < 4; dir++ ) {
        //sleep(1000);
        // position next and next*2
        let nexti = i + direction_i[dir];
        let nextj = j + direction_j[dir];
        let next2i = i + 2*direction_i[dir];
        let next2j = j + 2*direction_j[dir];
        // check if it's valid
        if (pos_is_valid(nexti, nextj) && pos_is_valid(next2i, next2j)) {
            // check if : the next case has a pion, and the next of next case is empty
            if (pion[nexti][nextj] != 0 && pion[next2i][next2j] == 0)  {
                // Jump , and remove the pion which is jumped
                let clone_actions = actions.slice();
                let clone_pion = make_clone_pion(pion);
                clone_pion[next2i][next2j] = clone_pion[i][j];
                clone_pion[i][j] = 0;
                clone_pion[nexti][nextj] = 0;
                clone_actions.push([next2i, next2j])
                //display(clone_pion)
                //console.log("new heuristic", heuristic(board, clone_pion));
                //console.log(clone_actions)
                let ans = find_the_best_move_one_pion(board, clone_pion,next2i, next2j, clone_actions,heuristic(board, clone_pion))
                let tmp_heuristic = ans[0]
                let tmp_actions = ans[1]
                if (first || tmp_heuristic > max_heuristic) {
                    first = false;
                    max_heuristic = tmp_heuristic;
                    max_actions  = tmp_actions;
                }

                can_not_move = false;
            }
        }
        //if (can_not_move) {
            //return  [heuristic(board, pion), actions]
        //}
    }
    return [max_heuristic, max_actions];
    //if (!can_not_move) {
        //let heuristic  
    //}

}

function action_move(list_actions) {
    for (let k = 1; k<list_actions.length; k++) {
        let i = list_actions[k-1][0];
        let j = list_actions[k-1][1];
        let ni = list_actions[k][0];
        let nj = list_actions[k][1];
        Pion[ni][nj] = Pion[i][j];
        Pion[i][j] = 0;
        Pion[i+(ni-i)/2][j+(nj-j)/2] = 0;
    }
}

// calculate the the next best move 
//      argument : status of board, status of pion
//      return   : a list contient a succession of position of the best move [(i, j), (i1, j1), (j2, j2) ...]
function find_the_best_move_all_pion (board, pion) {
    // declaration of variable, we need : 
    //let max_heuristic = heuristic(board, pion)

    // for each pion
        // for each direction
            // check if it can be jump
            // if yes, update the status of pion, then recursive
                // 
        // if it can be jumped any more : calculate heuristic and return the list of actions
    //
    let first = true;
    let max_heuristic = heuristic(board, pion);
    let max_actions = [];
    
    for (let i = 0; i<SIZE_BOARD; i++) {
        for (let j = 0; j<SIZE_BOARD; j++) {
            if (pion[i][j] == 0) continue;
            //console.log("Pion :", i, j, "=>", board[i][j]);
            let ans = find_the_best_move_one_pion(board, pion, i, j, [[i,j]] )
            let tmp_heuristic = ans[0];
            let tmp_actions = ans[1];
            //console.log(ans)
            if (first || max_heuristic < tmp_heuristic ) {
                first = false;
                max_heuristic = tmp_heuristic ;
                max_actions = tmp_actions;
            }
        }
    }
   // check if the game finish :
   if (max_heuristic == -999) {
      if (score_player(board, pion) > score_AI(board, pion)) {
         console.log("Congratulation ! You won the game!!!")
      } else {
         console.log("AI won the game! Let's try again");
      }
   }

    console.log("--------------------------------------------------------")
    console.log("Before move:")
    display(board)
    display(pion, "Pion")
    console.log()
    console.log("--------------------------------------------------------")
    console.log("Current heuristic :", heuristic(board, pion));
    console.log("AI analyse:");
    console.log("The best heuristic can be reached : ", max_heuristic);
    console.log("The best moves:", max_actions);
    console.log("--------------------------------------------------------")
    action_move(max_actions);
    console.log("After move:")
    display(board)
    display(Pion, "Pion");
   console.log("Your score:", score_player(board, pion));
   console.log("AI's score:", score_AI(board, pion));

    //return the list


}

function play_with_AI() {
      //var name = readline();
      //console.log(name);
      while (true) {
         find_the_best_move_all_pion(Board, Pion);
            let readlineSync = require('readline-sync');
            let res = readlineSync.question("Your turn:");
            console.log(res);
             res = res.split(" ");
            let l = []
            for (let i = 0; i<res.length; i++) {
               let ni = parseInt(res[i]); 
               let nj = parseInt(res[i+1]);
               l.push([ni, nj]);
               i++;
               action_move(l);
            }
             console.log(res);
            
            //process.exit();
         }
}
play_with_AI();
//find_the_best_move_one_pion(Board, Pion, 6, 0)

// calculate all next possible status in case of multi-jump: 
//      argument : status of board, status_pion, position of pion (i,j)
//      return   : status_pion
//function next_move_multi_jump (board, pion, i, j )  { 
    
//}


// calculate the next
// 

   // check if a pion can't not jump 
   //function can_not_jump_any_more (board, pion, i, j ) {

//}

