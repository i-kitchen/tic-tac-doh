import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  /**
   * Resets the game state to a fresh game
   */
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  /**
   * Returns if the current turn is player 'X' or player 'O'
   */
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  get playerNormalized() {
    return this.xIsNext ? 'You' : 'AI';
  }

  /**
   * Sets game state based on the move that was made
   * 
   * @param {Number} square 
   */
  makeMove(square: number) {
    // End function if there is a winner
    if (this.winner) {
      return;
    }

    if (!this.squares[square]) {
      this.squares.splice(square, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.determineWinner();

    // Have AI take a move if they are up
    if (!this.winner && this.xIsNext === false) {
      // Calling this AI feels dirty, it just picks a random square from any available square
      let availableMoves = this.emptyCells();
      let aiMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
      this.makeMove(aiMove);
    }
  }

  /**
   * Determines a winner based on game state. 
   * 
   * @returns {String|null}
   */
  determineWinner() {
    // Create list of winning combinations
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Loop through the winning combos list
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];

      // IF there is an 'X' or an 'O' in each slot of a winning combo, there is a winner
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  /**
   * Determines the squares left empty for the "AI" to take
   *
   * @returns {Array}
   */
  emptyCells() {
    let emptyCells = [];
    for (let i = 0; i < this.squares.length; i++) {
      if (!this.squares[i]) {
        emptyCells.push(i);
      }
    }

    return emptyCells;
  }
}
