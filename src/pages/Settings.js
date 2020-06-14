import React from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './TicTacToe.js';
import {Link} from 'react-router-dom';

// Will either render Settings or TicTacToe Game window
class SettingsControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allSet: false // settings have been finalised
    };

  }

  playGame() {
    this.setState({allSet: !this.state.allSet});
  }


  render() {
    if (this.state.allSet) {
      return (
        <div>
          {<TicTacToe />}
          <button onClick={() => this.playGame()}>BACK TO SETTINGS</button>
          <Link to="/">
              <button>Back to Home</button>
          </Link>
        </div>

      )
    }
    else {
      return (
        <div>
          {<Settings />}
          <button onClick={() => this.playGame()}>Choose Symbols!</button>
          <Link to="/">
              <button>Back to Home</button>
          </Link>
        </div>

      )

    }

  }

}

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label htmlFor="p1-symbol">Player 1</label>
        <input id="p1-symbol" name="p1-symbol"></input>
        <label htmlFor="p1-symbol">Player 2</label>
        <input id="p2-symbol" name="p2-symbol"></input>
      </div>
    )

  }


}

export default SettingsControl;
