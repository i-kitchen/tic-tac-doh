import { Component, OnInit } from '@angular/core';
import { WINNING_COMBOS } from '../app-constants';

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

  /**
   * Converts 'X' to 'You' as the player, and 'AI' as the computer for
   * conveying game state messages
   */
  get playerNormalized() {
    return this.xIsNext ? 'You' : 'AI';
  }

  /**
   * Determines if the game is tied or not
   */
  get isTied() {
    return (!this.winner) && (this.emptyCells().length == 0);
  }

  /**
   * Determines the text to be displayed after a game ending move
   */
  get gameEndText() {
    let winText = 'Tie Game!';
    if (this.winner && !this.isTied) {
      if (this.winner == 'X') {
        winText = 'You Won the Game!';
      } else {
        winText = 'The AI won the game, somehow...';
      }
    }

    return winText;
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
    let availableMoves = this.emptyCells();
    if (!this.winner && this.xIsNext === false && availableMoves.length > 0) {
      // Calling this AI feels dirty, it just picks a random square from any available square
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
    // Loop through the winning combos list
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const [a, b, c] = WINNING_COMBOS[i];

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
