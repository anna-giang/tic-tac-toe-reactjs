import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import '../index.css';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
        TIC TAC TOE
        </div>
        <Link to="/tictactoe">
          <button>PLAY</button>
        </Link>
      </div>
    );
  }
}

export default Home;
