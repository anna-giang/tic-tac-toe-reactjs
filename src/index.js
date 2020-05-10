import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); */

// Square is a 'controlled component' of Board

/*
class Square extends React.Component {
  constructor(props){
	  super(props);
	  // use state to 'remember' things 
	  this.state = {
		  value: null,
	  };
  }
  render() {
    return (
      // <button className="square" onClick= {function() { alert('click'); }}>
	  // same thing but with arrow notation - call anonymous function onClick
	  // the stuff between the <button> tags is the stuff to display in the button
	  // when setState is called, the child components are automatically updated too
	  <button className="square" onClick={() => this.props.onClick()}>
		{this.props.value}
      </button>
    );
  }
}
*/

function Square(props) {
	return( <button className="square" onClick={props.onClick}>{props.value}</button> );
}

class Board extends React.Component {
  /*constructor(props) {
	  super(props);
	  this.state = {
		  squares: Array(9).fill(null), // fill the state up with the X and O
	      xIsNext: true,
	  };
  }*/
  
  // NOTE -- conventional to name with on[Event] for event handlers, and handle[Event] for event handlers (thing to when when the event occurs)
  renderSquare(i) {
	// pass two props to square
    return ( 
	 <Square 
	   value={this.props.squares[i]} 
       onClick={() => this.props.onClick(i)}
	 />
	);
  }

  render() {
	
	// renders child square components, and passes them 'props'
	// Board class is parent
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
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
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		  history: [{squares: Array(9).fill(null)}],
		  xIsNext: true, // change to 'true' when stepNumber is even
		  stepNumber: 0, // the move we are currently viewing 
	  }
  }
  render() {
	// render the currently selected move, according to stepNumber
	const history = this.state.history;
	const current = history[this.state.stepNumber];
	const winner = calculateWinner(current.squares);
	
	const moves = history.map((step, move) => { // step == board at every move (is mapped to every) move = move number 0,1,2,3...
		const desc = move ? // description
			'Go to move #' + move : // if 'move' exists, then 'go to move', otherwise go to game start
			'Go to game start';
			// NOTE: assign proper KEYS (unique between component and its siblings) whenever building dynamic lists
		return (
			<li key={move}>
				<button onClick={()=> this.jumpTo(move)}>{desc}</button>
			</li>
		);
	});
	
	let status;
	if (winner) {
		status = 'Winner: ' + winner
	} else {
		status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
	} 
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
		         onClick={(i)=>this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
	  this.setState({history: this.state.history.concat({squares: squares}), xIsNext: !this.state.xIsNext, stepNumber: history.length});
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
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
