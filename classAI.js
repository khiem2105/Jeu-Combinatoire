class AI {
   constructor() {
      this.Board =  [[-2, -1, -2, -2, -1, -2, -2, -1, -2],
                     [-1, -2, -1, -1, -1, -1, -1, -2, -1],
                     [-1, -1, -2, -1, -3, -1, -2, -1, -1],
                     [-1, -1, -1, -2, -1, -2, -1, -1, -1],
                     [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                     [ 1,  1,  1,  2,  1,  2,  1,  1,  1],
                     [ 1,  1,  2,  1,  3,  1,  2,  1,  1],
                     [ 1,  2,  1,  1,  1,  1,  1,  2,  1],
                     [ 2,  1,  2,  2,  1,  2,  2,  1,  2]
               ]
      this.Pionneer =  [[ 3,  5,  3,  3,  3,  3,  3,  3,  5],
                  [ 1,  1,  1,  1,  5,  1,  1,  1,  1],
                  [ 3,  3,  5,  3,  3,  3,  5,  3,  3],
                  [ 1,  1,  1,  1,  1,  1,  1,  1,  1],
                  [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  [ 1,  1,  1,  1,  1,  1,  1,  1,  1],
                  [ 3,  3,  5,  3,  3,  3,  5,  3,  3],
                  [ 1,  1,  1,  1,  5,  1,  1,  1,  1],
                  [ 3,  5,  3,  3,  3,  3,  3,  3,  5]
               ]
      this.SIZE_BOARD = 9

      // direction table 
      //          [right, left,   up,  down]
      this.direction_i = [1,    -1,    0,    0];
      this.direction_j = [0,     0,    -1,   1];
      this.INFINITY = 9999
   }
   
   minimax_pseudo_code () {
         // Minimax pseudo code :
         // function minimax(position, depth, alpha, beta, maximizingPlayer):
         //      if depth == 0 or game_over in position:
         //              return static evaluation of position
         //
         //      if maximizingPlayer:
         //              maxEval = -infinity
         //              for each child of position:
         //                      eval = minimax(child, depth -1, alpha, beta, false) 
         //                      maxEval = max(maxEval, eval) 
         //                      alpha = max(alpha, eval)
         //                      if beta <= alpha :
         //                              break
         //              return maxEval
         //      else:
         //             minEval = + infinity
         //          for each child of position
         //                  eval = minimax (child, depth - 1, alpha, beta, true)
         //                  minEval = min(minEval, eval)
         //                  beta = min (beta, eval) 
         //          return minEval
   }

   game_over(pionner) {

      return true ;
   }

   generate_all_possible_staete
ssssasdsad
   minimax(pionneer, depth, alpha, beta, miximizingPlayer) {
      if (depth == 0 || this.game_over()) {
         return this.heuristic(pionneer);
      }

      if (maximizingPlayer) {
         maxEval = -this.INFINITY;

      }
   }

   display_pionneer(pionneer) {
      console.log("Display PIONNEER");
      console.log("    0  1  2  3  4  5  6  7  8");
      console.log("_____________________________");
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         process.stdout.write(i.toString() + " |");
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            //console.log(pionneer[i][j]);
            if (j%2==0) {
               if (pionneer[i][j] >= 0)  {
                  process.stdout.write(" "+ pionneer[i][j].toString()+ " " );
               }
               else
                  process.stdout.write(pionneer[i][j].toString() + " " );
            } else {
               if (pionneer[i][j] >= 0)  {
                  process.stdout.write(" "+ pionneer[i][j].toString()+ "|" );
               }
               else
                  process.stdout.write(pionneer[i][j].toString() + "|" );
            }
         }
         console.log();
         if (i%2)
            console.log("--------------------------------");
      }
   }

   score_player (pionneer) {
      let ans = 0;
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            if (this.Board[i][j] <= 0 ) continue;
            ans += this.Board[i][j] * pionneer[i][j];
         }
      }
      return ans;
   }

   score_AI ( pionneer) {
      let ans = 0;
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            if (this.Board[i][j] >= 0 ) continue;
            ans += this.Board[i][j] * pionneer[i][j];
         }
      }
      return -ans;
   }

   make_clone_pionneer (pionneer) {
      let clone_pion = []
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         let row = [];
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            row.push(pionneer[i][j]);
         }
         clone_pion.push(row);
      }
      return clone_pion;
   }

   heuristic (pionneer) {
      let ans = 0;
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            ans += this.Board[i][j] * pionneer[i][j];
         }
      }
      return ans;
   }

   // function check if a position (i, j) is valid 
   // it's mean that 0 < i, j  < SIZE_BOARD
   pos_is_valid(i, j) {
      return 0 <= i && i < this.SIZE_BOARD && 0 <= j && j < this.SIZE_BOARD;
   }

   find_the_best_move_one_pionneer (pionneer, i, j, actions=[], max_heuristic=-999) {
      let max_actions = [...actions]
      let can_not_move = true;
      let first = true;
      for (let dir = 0; dir < 4; dir++ ) {
         // position next and next*2
         let nexti = i + this.direction_i[dir];
         let nextj = j + this.direction_j[dir];
         let next2i = i + 2*this.direction_i[dir];
         let next2j = j + 2*this.direction_j[dir];
         // check if it's valid
         if (this.pos_is_valid(nexti, nextj) && this.pos_is_valid(next2i, next2j)) {
            // check if : the next case has a this.Pionneer, and the next of next case is empty
            if (pionneer[nexti][nextj] != 0 && pionneer[next2i][next2j] == 0)  {
               // Jump , and remove the this.Pionneer which is jumped
               let clone_actions = actions.slice();
               let clone_pionneer= this.make_clone_pionneer(pionneer);
               clone_pionneer[next2i][next2j] = clone_pionneer[i][j];
               clone_pionneer[i][j] = 0;
               clone_pionneer[nexti][nextj] = 0;
               clone_actions.push([next2i, next2j])
               let ans = this.find_the_best_move_one_pionneer(clone_pionneer, next2i, next2j, clone_actions, this.heuristic(clone_pionneer))
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
      }
      return [max_heuristic, max_actions];
   }

   action_move(list_actions) {
      for (let k = 1; k<list_actions.length; k++) {
         let i = list_actions[k-1][0];
         let j = list_actions[k-1][1];
         let ni = list_actions[k][0];
         let nj = list_actions[k][1];
         this.Pionneer[ni][nj] = this.Pionneer[i][j];
         this.Pionneer[i][j] = 0;
         this.Pionneer[i+(ni-i)/2][j+(nj-j)/2] = 0;
      }
   }

   // calculate the the next best move 
   //      argument : status of this.Board, status of this.Pionneer
   //      return   : a list contient a succession of position of the best move [(i, j), (i1, j1), (j2, j2) ...]
   find_the_best_move_all_pionneer() {
      // declaration of variable, we need : 
      //let max_heuristic = heuristic(this.Board, this.Pionneer)

      // for each this.Pionneer
      // for each direction
      // check if it can be jump
      // if yes, update the status of this.Pionneer, then recursive
      // 
      // if it can be jumped any more : calculate heuristic and return the list of actions
      //
      let first = true;
      let max_heuristic = this.heuristic(this.Pionneer);
      let max_actions = [];

      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            if (this.Pionneer[i][j] == 0) continue;
            //console.log("Pion :", i, j, "=>", this.Board[i][j]);
            let ans = this.find_the_best_move_one_pionneer(i, j, [[i,j]] )
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
         if (this.score_player( this.Pionneer) > this.score_AI(this.Pionneer)) {
            console.log("Congratulation ! You won the game!!!")
         } else {
            console.log("AI won the game! Let's try again");
         }
      }

      console.log("--------------------------------------------------------")
      console.log("Before move:")
      this.display_pionneer(this.Pionneer);
      console.log()
      console.log("--------------------------------------------------------")
      console.log("Current heuristic :", this.heuristic( this.Pionneer));
      console.log("AI analyse:");
      console.log("The best heuristic can be reached : ", max_heuristic);
      console.log("The best moves:", max_actions);
      console.log("--------------------------------------------------------")
      this.action_move(max_actions);
      console.log("After move:")
      this.display_pionneer(this.Pionneer);
      console.log("Your score:", this.score_player( this.Pionneer));
      console.log("AI's score:", this.score_AI(this.Pionneer));
      //return the list
   }

   play_with_AI() {
      //var name = readline();
      //console.log(name);
      while (true) {
         this.find_the_best_move_all_pionneer();
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
            this.action_move(l);
         }
         console.log(res);

         //process.exit();
      }
   }

}

//let ai = new AI();
//console.log(ai.Board);
//ai.display_pionneer(ai.Pionneer)
//console.log(ai.score_AI(ai.Pionneer))
//console.log(ai.score_player(ai.Pionneer))
//ai.play_with_AI()
