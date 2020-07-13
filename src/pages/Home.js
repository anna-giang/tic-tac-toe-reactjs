import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import '../index.css';

class Home extends React.Component {
  render() {
    return (
      <div class="d-flex flex-column" style={{paddingTop: "120px"}}>
        <div class="d-flex justify-content-center" id="main-heading">
          TIC TAC TOE
        </div>
        <div class="d-flex justify-content-center" id="main-desc">
          <p>The first to fill up a row, column or diagonal wins!</p>
        </div>

        <div class="d-flex justify-content-center">
          <div class="d-flex col-4 justify-content-center">
            <Link to="/mytictactoe">
              <button type="button" class="btn btn-danger btn-lg">CUSTOM GAME</button>
            </Link>
          </div>
          
          <div class="d-flex col-4 justify-content-center">
            <Link to="/tictactoe">
              <button type="button" class="btn btn-danger btn-lg">REGULAR GAME</button>
            </Link>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="d-flex col-4 justify-content-center" id='inline-desc'>
            <p>Customise your own settings!</p>
          </div>
          <div class="d-flex col-4 justify-content-center" id='inline-desc'>
            <p>Play with 'X' and 'O' on regular 3x3 grid!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
