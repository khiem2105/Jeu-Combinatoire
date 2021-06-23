export default class AI {
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
      //this.Pioneer =  [
               //[ 3,  0,  0,  0,  3,  0,  0,  0,  0],
               //[ 0,  0,  0,  0,  0,  0,  1,  0,  1],
               //[ 0,  0,  0,  0,  0,  0,  0,  0,  3],
               //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
               //[ 3,  0,  5,  3,  3,  0,  3,  0,  0],
               //[ 0,  0,  0,  1,  0,  0,  0,  1,  1],
               //[ 0,  0,  0,  0,  3,  0,  0,  0,  0],
               //[ 0,  0,  0,  0,  0,  0,  0,  0,  1],
               //[ 0,  0,  0,  5,  0,  3,  0,  0,  0]
               //]
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
      //this.Pioneer =  [
                  //[ 0,  1,  1,  1,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
                  //[ 0,  1,  1,  1,  0,  1,  0,  0,  0],
                  //[ 0,  0,  0,  0,  0,  0,  0,  0,  0]
               //];
      this.SIZE_BOARD = 9

      // direction table 
      //          [right, left,   up,  down]
      this.direction_i = [1,    -1,    0,    0];
      this.direction_j = [0,     0,    -1,   1];
      this.INFINITY = 9999999
   }

   sync_data(pioneer) {
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            this.Pioneer[i][j] = pioneer[i][j];
         }
      }
   }

   run() {
      //let ans = this.minimax(this.Pioneer, 2, -this.INFINITY, this.INFINITY, true, []);
      //return;
      //let arr = this.generate_all_possible_move(this.Pioneer);
      ////console.log(arr);
      //for (let i=0; i<arr.length; i++) {
         //console.log("i = ", i)
         //console.log(arr[i].heuristic)
         //console.log(arr[i].pioneer)
         //console.log(arr[i].actions);
      //}


      this.first_turn = false;
      this.count_evaluation = 0;
   let ans = this.minimax(this.Pioneer, 3, -this.INFINITY, this.INFINITY, true, []);
   console.log("minimax :",ans);
   //this.display_pioneer(ans.pioneer);
   console.log("actions :", ans.Actions);
      console.log("bilan analyzation :", this.count_evaluation, " possibilities calculated");
      //this.display_pioneer(ans.Pioneer);
      //this.first_turn = false;
      ////console.log(ans)
      return ans.Actions;
   }

   create_object_for_minimax(pioneer, actions) {
      let obj = {
         Heuristic : this.heuristic(pioneer), 
         Pioneer : pioneer,
         Actions : actions
      };
      return obj;
   }

   return_all_possibilities() {
      return this.all_possibilites;
   }

   minimax(pioneer, depth, alpha, beta, maximizingPlayer, actions) {
      this.count_evaluation++
      if (depth == 0 || this.game_over(pioneer)) {
         return this.create_object_for_minimax(pioneer, actions);
      }

      let all_pos = this.generate_all_possible_move(pioneer);
      //if (all_pos.length == 0) console.log("err")
      //let all_actions = this.generate_all_possible_actions();

      // Special case : when we have there is only one more move to do
      // So we can create new all_moves and all_actions for this coin-case
      if (all_pos.length == 0) {
         this.generate_jump_two_times(pioneer, []);
         all_pos = this.return_all_possibilities();
      }

      let save_actions = this.make_clone_action(actions);
      if (maximizingPlayer) {
         let maxHeuristic = -this.INFINITY;
         let maxPosition = [];
         let maxActions = [];

         for (let i=all_pos.length-1; i>=0; i--) {
            if (actions.length == 0) {
               save_actions = this.make_clone_action(all_pos[i].actions);
            }
            let obj_evaluation = this.minimax(all_pos[i].pioneer, depth-1, alpha,beta, false, save_actions);
            let heuristic_eval = obj_evaluation.Heuristic;
            let pioneer_eval = obj_evaluation.Pioneer;
            let actions_eval = obj_evaluation.Actions;

            if (maxHeuristic < heuristic_eval) {
               maxHeuristic = heuristic_eval;
               maxPosition = pioneer_eval;
               maxActions = actions_eval;
            }

            alpha = Math.max(alpha, heuristic_eval);
            if (beta <= alpha)   break;
         }

         return this.create_object_for_minimax(maxPosition, maxActions);

      } else {
         let minHeuristic = this.INFINITY;
         let minPosition = [];
         let minActions = [];
         for (let i=0; i<all_pos.length; i++) {
            if (actions.length == 0) {
               save_actions = this.make_clone_action(all_pos[i].actions);
            }
            let obj_evaluation = this.minimax(all_pos[i].pioneer, depth-1, alpha,beta, true, save_actions);
            let heuristic_eval = obj_evaluation.Heuristic;
            let pioneer_eval = obj_evaluation.Pioneer;
            let actions_eval = obj_evaluation.Actions;

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

   game_over(pioneer) {
      for (let i=0; i<this.SIZE_BOARD; i++) {
         for (let j=0; j<this.SIZE_BOARD; j++) {
            for (let dir = 0; dir < 4; dir++ ) {
               let nexti = i + this.direction_i[dir];
               let nextj = j + this.direction_j[dir];
               let next2i = i + 2*this.direction_i[dir];
               let next2j = j + 2*this.direction_j[dir];
               if (this.pos_is_valid(nexti, nextj) && this.pos_is_valid(next2i, next2j)) {
                  if (pioneer[i][j] != 0 && pioneer[nexti][nextj] != 0 && pioneer[next2i][next2j] == 0)  {
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
                  if (pioneer[i][j] != 0 && pioneer[nexti][nextj] != 0 && pioneer[next2i][next2j] == 0)  {
                     let clone_actions = this.make_clone_action(actions) ;
                     let clone_pioneer = this.make_clone_pioneer(pioneer);
                     // Update after jump
                     clone_pioneer[next2i][next2j] = clone_pioneer[i][j];
                     clone_pioneer[i][j] = 0;
                     clone_pioneer[nexti][nextj] = 0;
                     clone_actions.push([i, j]);
                     clone_actions.push([next2i, next2j]);
                     this.all_possibilities.push(this.create_state(clone_pioneer, clone_actions))
                  }
               }
            }
         }
      }
   }

   create_state( pioneer, actions) {
      let state = new State(this.heuristic(pioneer), pioneer, actions);
      return state;
   }

   generate_multiple_jump(start_pioneer, pioneer, i, j, actions) {
      if (this.first_turn) {
         this.generate_jump_two_times(pioneer, actions);
         return;
      }
      let has_no_move = true;
      for (let dir = 0; dir < 4; dir++ ) {
         let nexti = i + this.direction_i[dir];
         let nextj = j + this.direction_j[dir];
         let next2i = i + 2*this.direction_i[dir];
         let next2j = j + 2*this.direction_j[dir];
         if (this.pos_is_valid(nexti, nextj) && this.pos_is_valid(next2i, next2j)) {
            if (pioneer[i][j] != 0 && pioneer[nexti][nextj] != 0 && pioneer[next2i][next2j] == 0)  {
               let clone_actions = this.make_clone_action(actions) ;
               let clone_pioneer = this.make_clone_pioneer(pioneer);
               // Update after jump
               clone_pioneer[next2i][next2j] = clone_pioneer[i][j];
               clone_pioneer[i][j] = 0;
               clone_pioneer[nexti][nextj] = 0;
               has_no_move = false;
               clone_actions.push([i, j]);
               clone_actions.push([next2i, next2j]);
               if (clone_actions.length > 2) {
                  this.all_possibilities.push(this.create_state(clone_pioneer, clone_actions))
               }
               this.generate_multiple_jump(start_pioneer, clone_pioneer, next2i, next2j, clone_actions);
            }
         }
      }
      if (has_no_move) {
         if (this.two_array_are_equals(start_pioneer, pioneer)) { return; }
         else {
            // check whether the actions is not a multiple-jump
            if (actions.length > 2) {
               this.all_possibilities.push(this.create_state(pioneer, actions))
            }  else if (actions.length == 2) {
		this.generate_jump_two_times(pioneer, actions);
            }
         }
      }
   }

   two_array_are_equals(a, b) {
      for (let i=0; i<this.SIZE_BOARD; i++) {
         for (let j=0; j<this.SIZE_BOARD; j++) {
            if (a[i][j] != b[i][j] ) return false;
         }
      }
      return true;
   }


   generate_all_possible_move(pioneer) {
      this.all_possibilities = new Array();
      //this.all_possible_positions = new Array();
      //this.all_possible_actions = new Array();
      // option multi jump
      for (let i = 0; i<this.SIZE_BOARD; i++) {
         for (let j = 0; j<this.SIZE_BOARD; j++) {
            this.generate_multiple_jump(pioneer, pioneer, i, j, []);
         }
      }
      // Sort the array
      this.all_possibilities.sort(this.function_sort);
      return this.all_possibilities;
   }

   function_sort(a, b) {
      if (a.heuristic === b.heuristic) {
         return 0;
      } else {
         return (a.heuristic < b.heuristic ) ? -1 : 1;
      }
   }

   // Idea is avoid using this.<shared variables>
   //generate_all_possible_actions() {
      //return this.all_possible_actions;
   //}

   //return_all_possible_positions() {
      //return this.all_possible_positions;
   //}
   return_all_possibilities() {
      return this.all_possibilities;
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
}


class State {
  constructor(heuristic, pioneer, actions) {
     this.heuristic = heuristic
     this.pioneer = pioneer
     this.actions = actions
  }
}

//pq = new PriorityQueue()
//pq.enqueue("1", 1)
//pq.enqueue("5", 5)
//pq.enqueue("3", 3)
//pq.enqueue("2", 2)
//console.log(pq.values)
//let ai = new AI();
//ai.run();
//https://javascript.plainenglish.io/introduction-to-priority-queues-in-javascript-30cfc49b01ee
