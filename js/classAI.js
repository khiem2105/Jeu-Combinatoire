//export default 
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
      this.Pioneer =  [[ 3,  5,  3,  3,  3,  3,  3,  3,  5],
                  [ 1,  1,  1,  1,  5,  1,  1,  1,  1],
                  [ 3,  3,  5,  3,  3,  3,  5,  3,  3],
                  [ 1,  1,  1,  1,  1,  1,  1,  1,  1],
                  [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  [ 1,  1,  1,  1,  1,  1,  1,  1,  1],
                  [ 3,  3,  5,  3,  3,  3,  5,  3,  3],
                  [ 1,  1,  1,  1,  5,  1,  1,  1,  1],
                  [ 3,  5,  3,  3,  3,  3,  3,  3,  5]
               ]
      //this.pioneer =  [
                  //[ 0,  1,  1,  1,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0]
               //];
      this.SIZE_BOARD = 9

      // direction table 
      //          [right, left,   up,  down]
      this.direction_i = [1,    -1,    0,    0];
      this.direction_j = [0,     0,    -1,   1];
      this.INFINITY = 9999
   }

   sync_data(pioneer) {
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            this.Pioneer[i][j] = pioneer[i][j];
         }
      }
   }

   run() {
      this.generate_all_possible_move(this.Pioneer);
      for (let i=0; i<this.all_possible_positions.length; i++) {
         this.display_pioneer(this.all_possible_positions[i]);

      }
      //console.log(this.all_possible_positions);
      //console.log(this.all_possible_actions);
      //return;
      //this.generate_all_possible_move(this.Pioneer);
      //console.log("Number of possible position: ", this.all_possible_positions.length);
      this.first_turn = false;
      this.count_evaluation = 0;
      let ans = this.minimax(this.Pioneer, 2, -99999, +99999, true);
      console.log("Minimax :",ans);
      this.display_pioneer(ans.Pioneer);
      console.log("Actions :", ans.Actions);
      console.log("Bilan analyzation :", this.count_evaluation, " possibilities calculated");
      //this.first_turn = false;
      return ans.Pioneer;
   }

   create_object_for_minimax(pioneer, actions) {
      this.display_pioneer(pioneer);
      console.log(actions);
         let obj = {Heuristic : this.heuristic(pioneer), 
                    Pioneer:pioneer,
                    Actions:actions};
         //return this.heuristic(pioneer);
         return obj;
   }

   minimax(pioneer, depth, alpha, beta, maximizingPlayer, actions=[]) {
      this.count_evaluation++
      if (depth == 0 || this.game_over(pioneer)) {
         return this.create_object_for_minimax(pioneer, actions);
      }

      let all_moves = this.generate_all_possible_move(pioneer);
      //console.log("all moves:"  ,all_moves);

      //console.log(maximizingPlayer);
      if (maximizingPlayer) {
         let maxHeuristic = -this.INFINITY;
         let maxPosition = [];
         let maxActions = [];
         for (let i=0; i<all_moves.length; i++) {
            //console.log("hi", i);
            let save_actions = actions.length == 0 ? this.all_possible_actions[i] : actions;
            let obj_evaluation = this.minimax(all_moves[i], depth-1, alpha,beta, false, save_actions);
            let heuristic_eval = obj_evaluation.Heuristic;
            let pioneer_eval = obj_evaluation.Pioneer;
            let actions_eval = obj_evaluation.Actions;

            //maxEval = Math.max(maxEval, evaluation);
            if (maxHeuristic < heuristic_eval) {
               maxHeuristic = heuristic_eval;
               maxPosition = pioneer_eval;
               maxActions = actions_eval;
            }

            alpha = Math.max(alpha, heuristic_eval);
            if (beta <= alpha)   break;
            //console.log("hi", i);
         }
         return this.create_object_for_minimax(maxPosition, maxActions);
      } else {
         let minHeuristic = this.INFINITY;
         let minPosition = [];
         let minActions = [];
         for (let i=0; i<all_moves.length; i++) {
            let save_actions = actions.length == 0 ? this.all_possible_actions[i] : actions;
            let obj_evaluation = this.minimax(all_moves[i], depth-1, alpha,beta, true, save_actions);
            let heuristic_eval = obj_evaluation.Heuristic;
            let pioneer_eval = obj_evaluation.Pioneer;
            let actions_eval = obj_evaluation.Actions;

            //minEval = Math.min(minEval, evaluation);
            if (minHeuristic > heuristic_eval) {
               minHeuristic = heuristic_eval;
               minPosition = pioneer_eval;
               minActions = actions_eval;
            }

            beta = Math.min(beta, heuristic_eval);
            if (beta <= alpha) break;
         }
         return this.create_object_for_minimax(minPosition, minActions);
      }
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

   game_over(pioneer) {
      for (let i=0; i<this.SIZE_BOARD; i++) {
         for (let j=0; j<this.SIZE_BOARD; j++) {
            for (let dir = 0; dir < 4; dir++ ) {
               let nexti = i + this.direction_i[dir];
               let nextj = j + this.direction_j[dir];
               let next2i = i + 2*this.direction_i[dir];
               let next2j = j + 2*this.direction_j[dir];
               if (this.pos_is_valid(nexti, nextj) && this.pos_is_valid(next2i, next2j)) {
                  if (pioneer[nexti][nextj] != 0 && pioneer[next2i][next2j] == 0)  {
                     return false;
                  }
               }
            }
         }
      }
      return true ;
   }

   make_clone_action(actions) {
      let clone = [];
      for (let i =0; i<actions.length; i++) {
         clone.push(actions[i]);
      }
      return clone;
   }

   generate_jump_two_times(pioneer, actions) {
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            for (let dir = 0; dir < 4; dir++ ) {
               let nexti = i + this.direction_i[dir];
               let nextj = j + this.direction_j[dir];
               let next2i = i + 2*this.direction_i[dir];
               let next2j = j + 2*this.direction_j[dir];
               if (this.pos_is_valid(nexti, nextj) && this.pos_is_valid(next2i, next2j)) {
                  if (pioneer[nexti][nextj] != 0 && pioneer[next2i][next2j] == 0)  {
                     let clone_actions = this.make_clone_action(actions) ;
                     let clone_pioneer = this.make_clone_pioneer(pioneer);
                     // Update after jump
                     clone_pioneer[next2i][next2j] = clone_pioneer[i][j];
                     clone_pioneer[i][j] = 0;
                     clone_pioneer[nexti][nextj] = 0;
                     clone_actions.push([i, j]);
                     clone_actions.push([next2i, next2j]);
                     this.all_possible_positions.push(clone_pioneer);
                     this.all_possible_actions.push(clone_actions);
                  }
               }
            }
         }
      }
   }

   generate_multiple_jump(start_pioneer, pioneer, i, j, actions) {
      if (this.first_turn) {
         this.generate_jump_two_times(pioneer, actions);
         //console.log("here")
         return;
      }
      let has_no_move = true;
      for (let dir = 0; dir < 4; dir++ ) {
         let nexti = i + this.direction_i[dir];
         let nextj = j + this.direction_j[dir];
         let next2i = i + 2*this.direction_i[dir];
         let next2j = j + 2*this.direction_j[dir];
         if (this.pos_is_valid(nexti, nextj) && this.pos_is_valid(next2i, next2j)) {
            if (pioneer[nexti][nextj] != 0 && pioneer[next2i][next2j] == 0)  {
               let clone_actions = this.make_clone_action(actions) ;
               let clone_pioneer = this.make_clone_pioneer(pioneer);
               // Update after jump
               clone_pioneer[next2i][next2j] = clone_pioneer[i][j];
               clone_pioneer[i][j] = 0;
               clone_pioneer[nexti][nextj] = 0;
               has_no_move = false;
               clone_actions.push([i, j]);
               clone_actions.push([next2i, next2j]);
               this.generate_multiple_jump(start_pioneer, clone_pioneer, next2i, next2j, clone_actions);
            }
         }
      }
      if (has_no_move) {
         //if (actions.length == 2) this.display_pioneer(pioneer);
         if (start_pioneer == pioneer) { return; }
         else {
            // check whether the actions is not a multiple-jump
            if (actions.length > 2) {
               this.all_possible_positions.push(pioneer);
               this.all_possible_actions.push(actions);
            }  else if (actions.length == 2) {
		this.generate_jump_two_times(pioneer, actions);
            }
         //return pioneer;
         }
      }
   }


   generate_all_possible_move(pioneer) {
      //if (pioneer)
      this.all_possible_positions = new Array();
      this.all_possible_actions = new Array();
      // option multi jump
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            this.generate_multiple_jump(pioneer, pioneer, i, j, []);
         }
      }
      //console.log("Number possibles possition :", this.all_possible_positions.length);
      // display all the possible positions :
      //for (let i=0; i<this.all_possible_positions.length; i++) {
         ////this.display_pioneer( this.all_possible_positions[i])
      //}
      return this.all_possible_positions;
   }


   display_pioneer(pioneer) {
      //console.log(pioneer)
      console.log("Display PIONNEER");
      console.log("    0  1  2  3  4  5  6  7  8");
      console.log("_____________________________");
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         process.stdout.write(i.toString() + " |");
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            //console.log(pioneer[i][j]);
            if (j%2==0) {
               if (pioneer[i][j] >= 0)  {
                  process.stdout.write(" "+ pioneer[i][j].toString()+ " " );
               }
               else
                  process.stdout.write(pioneer[i][j].toString() + " " );
            } else {
               if (pioneer[i][j] >= 0)  {
                  process.stdout.write(" "+ pioneer[i][j].toString()+ "|" );
               }
               else
                  process.stdout.write(pioneer[i][j].toString() + "|" );
            }
         }
         console.log();
         if (i%2)
            console.log("--------------------------------");
      }
   }

   score_player (pioneer) {
      let ans = 0;
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            if (this.Board[i][j] <= 0 ) continue;
            ans += this.Board[i][j] * pioneer[i][j];
         }
      }
      return ans;
   }

   score_AI ( pioneer) {
      let ans = 0;
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            if (this.Board[i][j] >= 0 ) continue;
            ans += this.Board[i][j] * pioneer[i][j];
         }
      }
      return -ans;
   }

   make_clone_pioneer (pioneer) {
      let clone_pion = []
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         let row = [];
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            row.push(pioneer[i][j]);
         }
         clone_pion.push(row);
      }
      return clone_pion;
   }

   heuristic (pioneer) {
      let ans = 0;
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            ans += this.Board[i][j] * pioneer[i][j];
         }
      }
      return ans;
   }

   // function check if a position (i, j) is valid 
   // it's mean that 0 < i, j  < SIZE_BOARD
   pos_is_valid(i, j) {
      return 0 <= i && i < this.SIZE_BOARD && 0 <= j && j < this.SIZE_BOARD;
   }

   find_the_best_move_one_pioneer (pioneer, i, j, actions=[], max_heuristic=-999) {
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
            // check if : the next case has a this.Pioneer, and the next of next case is empty
            if (pioneer[nexti][nextj] != 0 && pioneer[next2i][next2j] == 0)  {
               // Jump , and remove the this.Pioneer which is jumped
               let clone_actions = actions.slice();
               let clone_pioneer= this.make_clone_pioneer(pioneer);
               clone_pioneer[next2i][next2j] = clone_pioneer[i][j];
               clone_pioneer[i][j] = 0;
               clone_pioneer[nexti][nextj] = 0;
               clone_actions.push([next2i, next2j])
               let ans = this.find_the_best_move_one_pioneer(clone_pioneer, next2i, next2j, clone_actions, this.heuristic(clone_pioneer))
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
         this.Pioneer[ni][nj] = this.Pioneer[i][j];
         this.Pioneer[i][j] = 0;
         this.Pioneer[i+(ni-i)/2][j+(nj-j)/2] = 0;
      }
   }

   // calculate the the next best move 
   //      argument : status of this.Board, status of this.Pioneer
   //      return   : a list contient a succession of position of the best move [(i, j), (i1, j1), (j2, j2) ...]
   find_the_best_move_all_pioneer() {
      // declaration of variable, we need : 
      //let max_heuristic = heuristic(this.Board, this.Pioneer)

      // for each this.Pioneer
      // for each direction
      // check if it can be jump
      // if yes, update the status of this.Pioneer, then recursive
      // 
      // if it can be jumped any more : calculate heuristic and return the list of actions
      //
      let first = true;
      let max_heuristic = this.heuristic(this.Pioneer);
      let max_actions = [];

      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            if (this.Pioneer[i][j] == 0) continue;
            //console.log("Pion :", i, j, "=>", this.Board[i][j]);
            let ans = this.find_the_best_move_one_pioneer(this.Pioneer, i, j, [[i,j]] )
            let tmp_heuristic = ans[0];
            let tmp_actions = ans[1];
            console.log(ans)
            if (first || max_heuristic < tmp_heuristic ) {
               first = false;
               max_heuristic = tmp_heuristic ;
               max_actions = tmp_actions;
            }
         }
      }
      // check if the game finish :
      if (max_heuristic == -999) {
         if (this.score_player( this.Pioneer) > this.score_AI(this.Pioneer)) {
            console.log("Congratulation ! You won the game!!!")
         } else {
            console.log("AI won the game! Let's try again");
         }
      }

      console.log("--------------------------------------------------------")
      //console.log("Before move:")
      //this.display_pioneer(this.Pioneer);
      console.log()
      console.log("--------------------------------------------------------")
      console.log("Current heuristic :", this.heuristic( this.Pioneer));
      console.log("AI analyse:");
      console.log("The best heuristic can be reached : ", max_heuristic);
      console.log("The best moves:", max_actions);
      console.log("--------------------------------------------------------")
      //this.action_move(max_actions);
      //console.log("After move:")
      //this.display_pioneer(this.Pioneer);
      console.log("Your score:", this.score_player( this.Pioneer));
      console.log("AI's score:", this.score_AI(this.Pioneer));
      //return the list
      return max_actions;
   }

   play_with_AI() {
      //var name = readline();
      //console.log(name);
      while (true) {
         this.find_the_best_move_all_pioneer();
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

let ai = new AI();
ai.run();

//ai.find_the_best_move_all_pioneer()
//let k = ai.find_the_best_move_one_pioneer(ai.Pioneer, 6, 0 )
//console.log(k)
//ai.run();
//console.log(ai.Board);
//ai.display_pioneer(ai.Pioneer)
//console.log(ai.score_AI(ai.Pioneer))
//console.log(ai.score_player(ai.Pioneer))
//ai.play_with_AI()
