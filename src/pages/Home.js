import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import '../index.css';

class Home extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="row" id="main-heading">
          TIC TAC TOE
        </div>
        <div class="row">
          <div class="col">
            <Link to="/mytictactoe">
              <button type="button" class="btn btn-danger btn-lg">CUSTOM GAME</button>
            </Link>
          </div>
          <div class="col">
            <Link to="/tictactoe">
              <button type="button" class="btn btn-danger btn-lg">REGULAR GAME</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
