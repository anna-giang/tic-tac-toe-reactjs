import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";

// TODO: Consider allowing users to change the board size, and the how many in a row to win

function Square(props) {
	// IF THE SQUARE IS A WINNING SQUARE, THEN RETURN A COLOURED SQUARE
	if (props.winningSquare) {
		return( <button className="square" style={{backgroundColor:"aquamarine"}} onClick={props.onClick}>{props.value}</button> );
	}
	else {
		return( <button className="square" onClick={props.onClick}>{props.value}</button> );
	}


}

class Board extends React.Component {
  // NOTE -- conventional to name with on[Event] for event handlers, and handle[Event] for event handlers (thing to when when the event occurs)
  renderSquare(i, isWinner) {
	// pass two props to square
    return (
	 <Square
	   value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)}
			 	winningSquare={isWinner}
	 />

	);
  }

	// Help from: https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
  createBoard() {
		let row = 3;
		let col = 3;
		let squareNo = 0; // number the squares sequentially starting from 0
		let board = [];
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
				columns.push(this.renderSquare(c, winningSquare));
			}
			squareNo += 3;
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
				{this.createBoard()}
      </div>
    );
  }


}

function calculateWinner(squares) {
  // All the possible combination for winning
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			// FOR HIGHLIGHTING THE THREE SQUARES THAT CAUSED WIN
			// Return an object with BOTH who won, and the winning line
      return {winner: squares[a], lines: lines[i]};
    }
  }
	// HANDLING WHEN GAME IS A DRAW
	// Check if all the squares are filled
	// If any one square is not yet filled, return null
	for (let i = 0; i < squares.length; i++) {
		if (squares[i] == null) {
			return null;
		}
	}
	// If all squares are filled, there is NO winner, so return false
	return false;

}

class TicTacToe extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {

		  history: [{squares: Array(9).fill(null), move: 0}], // will be changing the order of the moves for display,
																													// hence every move should know its move number
		  xIsNext: true, // change to 'true' when stepNumber is even
		  stepNumber: 0, // the move we are currently viewing
			displayAsc: true // the order moves are currently displayed in
	  }
  }
  render() { // render the currently selected move, according to stepNumber


	let history = this.state.history.slice()
	const current = history[this.state.stepNumber];
	const winner = calculateWinner(current.squares);

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
				coord[0] = (coord[0] + 1) % 3; // the column number changes with every index in array, within range 1-3
				if ((i+1) % 3 == 0 && i+1 != 0){ // meanwhile row number will change every 3 iterations
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
		status = 'Winner: ' + winner.winner;
		winningSquares = winner.lines; // PASS BOARD THE SQUARE NUMBERS OF THE WINNING SQUARES
	} else if (winner == null) {
		status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
	} else {
		status = "RESULT IS A DRAW. Press 'Go to Game Start' to play again.";
	}
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
		         onClick={(i)=>this.handleClick(i)}
						 winningSquares={winningSquares} />
        </div>
        <div className="game-info">
          <div>{status}</div>
					<div style={{paddingTop:"15px"}}>
					<button onClick={() => this.toggleMoveOrder()}>Toggle Moves Order</button>
					</div>
          <ol>{moves}</ol>
          <div>
            <Link to="/">
              <button>BACK TO SETTINGS</button>
            </Link>
          </div>
        </div>

      </div>
    );
  }

  handleClick(i) {
	  const history = this.state.history.slice(0, this.state.stepNumber+1)
	  const current = history[history.length - 1]
	  const squares = current.squares.slice(); // create a copy of the array and modify the copy
	  if (calculateWinner(squares) || squares[i]) {
		  return;
	  }
	  squares[i] = this.state.xIsNext ? 'X' : 'O';
	  this.setState({history: history.concat({squares: squares, move: this.state.stepNumber+1}),
									 xIsNext: !this.state.xIsNext,
									 stepNumber: history.length,
								   displayAsc: this.state.displayAsc});
	  // NOTE: Concat method does not modify the original array, whereas push() does
  }

  jumpTo(move) {
	  // update stepNumber, xIsNext
	  if (move % 2 == 0) {
		// set the xIsNext to true
        this.setState({xIsNext: true, stepNumber: move});
	  }
	  else {
		this.setState({xIsNext: false, stepNumber: move});
	  }

  }

	// changes the order of the past move buttons from ascending <-> descending order
	toggleMoveOrder() {
		this.setState({history: this.state.history,
									 xIsNext: this.state.xIsNext,
									 stepNumber: this.state.stepNumber,
								   displayAsc: !this.state.displayAsc});
	}
}

// ========================================
export default TicTacToe;
