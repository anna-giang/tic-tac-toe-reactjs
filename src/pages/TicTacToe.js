import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";

// TODO: Consider allowing users to change the board size, and the how many in a row to win

function Square(props) {
	// IF THE SQUARE IS A WINNING SQUARE, THEN RETURN A COLOURED SQUARE
	
	if (props.winningSquare) {
		return( <button className="square" style={{backgroundColor: 'aquamarine', width: props.squareSize + 'px', height: props.squareSize + 'px', fontSize: props.fontSize + 'px', lineHeight: props.lineHeight + 'px'}} onClick={props.onClick}>{props.value}</button> );
	}
	else {
		return( <button className="square" style={{height: props.squareSize + 'px', width: props.squareSize + 'px', fontSize: props.fontSize + 'px', lineHeight: props.lineHeight + 'px'}} onClick={props.onClick}>{props.value}</button> );
	}


}

class Board extends React.Component {
  // NOTE -- conventional to name with on[Event] for event handlers, and handle[Event] for event handlers (thing to when when the event occurs)
  renderSquare(i, isWinner, squareSize, fontSize, lineHeight) {
	// pass two props to square
    return (
	 <Square
	   value={this.props.squares[i]}
	   squareSize={squareSize}
	   fontSize={fontSize}
	   lineHeight={lineHeight}
       onClick={() => this.props.onClick(i)}
			 	winningSquare={isWinner}
	 />

	);
  }

	// Help from: https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
  createBoard() {
		let row = Math.floor(Math.sqrt(this.props.squares.length));
		let col = row;
		let squareNo = 0; // number the squares sequentially starting from 0
		let board = [];
		let squareSize = 200; // size of square for 3 by 3 or 2 by 2 grid. Total size 360 x 360 px.
		let fontSize = 100;
		let lineHeight = 34;

		// determine new square size and font size
		if (row > 3) {
			squareSize = Math.floor((squareSize*3)/row);
			fontSize = Math.floor(fontSize - row**2);
			if (fontSize < 15) {
				fontSize = 15;
				lineHeight = 0;
			}
		}

		// outer loop to create the rows
		for (let r = 0; r < row; r++) {
			let columns = [];
			// inner loop to create the columns (i.e. the squares)
			for (let c = squareNo; c < col + squareNo; c++) {
				var winningSquare = false;
				if (this.props.winningSquares) {
					// IF C IS IN THIS.PROPS.LINES,
					// the square is a 'winningSquare', and will render coloured
					winningSquare = this.props.winningSquares.includes(c);
				}
				columns.push(this.renderSquare(c, winningSquare, squareSize, fontSize ,lineHeight));
			}
			squareNo += row;
			board.push(<div className = "board-row">{columns}</div>);
		}
		return board;

	}

  render() {
		// USE TWO LOOPS TO RENDER THE SQUARES INSTEAD OF HARDCODING
	  // renders child square components, and passes them 'props'
	  // Board class is parent
    return (
      <div>
				{this.createBoard(this.props.boardSize)}
      </div>
    );
  }


}

function calculateWinner(scoreState, movesPlayed, boardSize) {
	console.log("scoreState: " + scoreState + " movesPlayed: " + movesPlayed + " boardSize: " + boardSize);
	for (let i = 0; i < scoreState.length; i++) {
		if (scoreState[i] === boardSize || scoreState[i] === -boardSize) {
			console.log("scoreState[i]: " + scoreState[i] + " i: " + i)
			let winner = (scoreState[i] > 0) ? 1 : 2; // which player won?
			let line = [];
			// calculate the square numbers in the winning line
			// Is a row or col or diagonal
			if (i < boardSize) { // row
				for (let j = 0; j < boardSize; j++) {
					line.push(boardSize*i+j);
				}
			}
			else if (i < 2*boardSize) { // col
				for (let j = 0; j < boardSize; j++) {
					// colNumber + j*boardSize
					line.push((i - boardSize) + j*boardSize);
				}

			}
			else { // diagonal
				if (i == 2*boardSize) { // left to right diagonal
					for (let j = 0; j < boardSize; j++) {
						line.push((boardSize+1)*j);
					}
				}
				else { // right to left diagonal
					for (let j = 1; j <= boardSize; j++) {
						line.push((boardSize-1)*j);
					}
				}
			}
			// FOR HIGHLIGHTING THE THREE SQUARES THAT CAUSED WIN
			// Return an object with BOTH who won, and the winning line
			return {winner: winner, lines: line};
		}

	}

	// HANDLING WHEN GAME IS A DRAW
	// If we have played boardSize*boardSize number of moves and there is no winner,
	// then it is automatically a draw
	if (movesPlayed === boardSize*boardSize) {
		return false;
	}

	// If not all squares are filled, there is no winner yet
	return null;

}

class TicTacToe extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
			/* 'history':
			 *
			 * 'scoreState': Array for checking the current score:
		 	 * 		scoreState[0..n-1] = (number of p1Symbol in rows 0..n-1) - (number of p2Symbol in rows 0..n-1)
		 	 * 		scoreState[n...2*n-1] = (number of p1Symbol in columns 0..n-1) - (number of p2Symbol in columns 0..n-1)
		 	 * 		scoreState[2*n, 2*n+1] = (number of p1Symbol in each diagonals) - (number of p2Symbol in each diagonals)
			 * 'move': move number
			 *	  will be changing the order of the moves for display, hence every move should know its move number
			 */
		  history: [{squares: Array(this.props.settings.boardSize**2).fill(null), move: 0, scoreState: Array(2*this.props.settings.boardSize+2).fill(0)}],

		  p1IsNext: true, // change to 'true' when stepNumber is even
		  stepNumber: 0, // the move we are currently viewing
			displayAsc: true, // the order moves are currently displayed in

			// NOTE: 'p1Symbol', 'p2Symbol', 'boardSize' will NOT be modified by setState functions anywhere in TicTacToe component
			p1Symbol: this.props.settings.p1Symbol,
			p2Symbol: this.props.settings.p2Symbol,
			boardSize: this.props.settings.boardSize

	  }
  }
  render() { // render the currently selected move, according to stepNumber


	let history = this.state.history.slice()
	const current = history[this.state.stepNumber];
	const winner = calculateWinner(current.scoreState, this.state.stepNumber, this.state.boardSize);

	// TOGGLE THE ORDER OF THE DISPLAY OF THE MOVES
	// if the displayAsc is FALSE, we must reverse the order of history for moves display
	if (!this.state.displayAsc) {
	 	history = history.reverse()
	}

	const moves = history.map(step => { // step == board at every move (is mapped to every) move = move number 0,1,2,3...

		let move = step.move;
		let desc = null;
		if (move == 0){
			desc = 'Go to game start';
		}
		else {
			// determine the location (col, row) of the current step
			// compare the current step with the previous step, and find the Square that changed from null to filled
			const prevStep = this.state.history[move-1].squares;
			const thisStep = step.squares;
			var coord = [0,0];
			var i = 0;
			for (i = 0; i < prevStep.length; i++){

				if (prevStep[i] != thisStep[i]) {
					break

				}
				// UPDATE AND DISPLAY COORDINATE OF CHANGE
				coord[0] = (coord[0] + 1) % this.state.boardSize; // the column number changes with every index in array, within range 1-3
				if ((i+1) % this.state.boardSize == 0 && i+1 != 0){ // meanwhile row number will change every 3 iterations
					coord[1]++;
				}

			}

			desc = 'Go to move #' + move + ": (" + (coord[0] + 1).toString() + "," + (coord[1] + 1).toString() + ")";
	    }

		// BOLDING THE CURRENT MOVE SHOWN
		// if the move number is equal to the stepNumber, bold the button
		if (move == this.state.stepNumber) {
			return (
				<li key={move}>
					<button onClick={()=> this.jumpTo(move)}><strong>{desc}</strong></button>
				</li>
			);
		}
		else {
			// NOTE: assign proper KEYS (unique between component and its siblings) whenever building dynamic lists
			return (
				<li key={move}>
					<button onClick={()=> this.jumpTo(move)}>{desc}</button>
				</li>
			);
		}

	});

	let status;
	let winningSquares;
	if (winner) {
		let winnerSymbol = (winner.winner === 1) ? this.state.p1Symbol : this.state.p2Symbol;
		status = 'Winner: ' + winnerSymbol;
		winningSquares = winner.lines; // PASS BOARD THE SQUARE NUMBERS OF THE WINNING SQUARES
	} else if (winner == null) {
		status = 'Next player: ' + (this.state.p1IsNext ? this.state.p1Symbol : this.state.p2Symbol);
	} else {
		status = "RESULT IS A DRAW. Press 'Go to Game Start' to play again.";
	}
    return (
      <div className="game">
		<div>
			<div> 
				<Link to="/"><button>Back to Home</button></Link>
			</div>
			<div id="page-heading">TIC TAC TOE</div>
		</div>
		
		<div> 
			<div className="game-board">
				<Board squares={current.squares}
						onClick={(i)=>this.handleClick(i)}
								winningSquares={winningSquares} />
			</div>
			<div className="game-info">
				<div>
					{status}
				</div>
				<div>
					<ol>{moves}</ol>
				</div>
				<div style={{paddingTop:"15px"}}>
					<button onClick={() => this.toggleMoveOrder()}>Toggle Moves Order</button>
				</div>
			</div>
		</div>
      </div>
    );
  }

  handleClick(i) {
	  const history = this.state.history.slice(0, this.state.stepNumber+1);
	  const current = history[history.length - 1];
	  const squares = current.squares.slice(); // create a copy of the array and modify the copy

	  if (calculateWinner(current.scoreState, current.move, this.state.boardSize) || squares[i]) {
		  return;
	  }

		// NOTE: CURRENTLY 'p1IsNext' represents the player that JUST played, not next player.
		const point = this.state.p1IsNext ? 1 : -1; // 1 for p1, -1 for p2.
		// Update this.state.scoreState
		const colRow = this.getColRow(i);
		const col = colRow[0];
		const row = colRow[1];
		const gridSize = this.state.boardSize;
		let newScoreState = current.scoreState.slice();
		newScoreState[row] += point;
		newScoreState[gridSize + col] += point;
		if (row == col) { // left to right diagonal
			newScoreState[2*gridSize] += point;
		}
		if (gridSize - 1 - col == row) { // right to left diagonal
			newScoreState[2*gridSize + 1] += point;
		}

	  squares[i] = this.state.p1IsNext ? this.state.p1Symbol : this.state.p2Symbol;
		// NOTE: Concat method does not modify the original array, whereas push() does
	  this.setState({history: history.concat({squares: squares, move: this.state.stepNumber+1, scoreState: newScoreState}),
									 p1IsNext: !this.state.p1IsNext,
									 stepNumber: history.length,
								   displayAsc: this.state.displayAsc});

  }

  jumpTo(move) {
	  // update stepNumber, p1IsNext
	  if (move % 2 == 0) {
		// set the p1IsNext to true
        this.setState({p1IsNext: true, stepNumber: move});
	  }
	  else {
		this.setState({p1IsNext: false, stepNumber: move});
	  }

  }

	// changes the order of the past move buttons from ascending <-> descending order
	toggleMoveOrder() {
		this.setState({history: this.state.history,
									 p1IsNext: this.state.p1IsNext,
									 stepNumber: this.state.stepNumber,
								   displayAsc: !this.state.displayAsc});
	}

	getColRow(squareNo) {
		return [squareNo % (this.state.boardSize),Math.floor(squareNo/(this.state.boardSize))];
	}
}

// ========================================
export default TicTacToe;
