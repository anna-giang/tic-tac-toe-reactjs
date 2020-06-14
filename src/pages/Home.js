import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import '../index.css';

class Home extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
      p1Symbol: 'X',
      p2Symbol: 'O'
	  }
  }

  /*playGame() {
    this.setState({
      p1Symbol: (document.getElementById('p1-symbol').value !== "") ? document.getElementById('p1-symbol').value : this.state.p1Symbol,
      p2Symbol: (document.getElementById('p2-symbol').value  !== "") ? document.getElementById('p2-symbol').value : this.state.p2Symbol
    });
  }*/


  render() {
    return (
      <div>
        <Link to="/tictactoe">
          <button>PLAY</button>
        </Link>
      </div>
    );
  }
}

export default Home;
