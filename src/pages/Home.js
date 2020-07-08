import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import '../index.css';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div id="main-heading">TIC TAC TOE</div>
        <div>
          <Link to="/mytictactoe">
            <button>CUSTOM GAME</button>
          </Link>
        </div>
        <div>
          <Link to="/tictactoe">
            <button>REGULAR GAME</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
