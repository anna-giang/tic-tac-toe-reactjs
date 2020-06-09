import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import '../index.css';

class Home extends React.Component {
  render() {
    return (
      <Link to="/tictactoe">
        <button>PLAY</button>
      </Link>
    );
  }
}

export default Home;
