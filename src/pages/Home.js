import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import '../index.css';

class Home extends React.Component {
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
