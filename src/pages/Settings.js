import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  setSettings() {
    var p1Symbol = document.getElementById('p1-symbol').value;
    var p2Symbol = document.getElementById('p2-symbol').value;
    var boardSize = parseInt(document.getElementById('board-size').value);
    this.props.goToGame(p1Symbol, p2Symbol, boardSize);
  }

  render() {
    return (
      <div>
        <label htmlFor="p1-symbol">Player 1</label>
        <input id="p1-symbol" maxlength="2" name="p1-symbol"></input><br/>

        <label htmlFor="p2-symbol">Player 2</label>
        <input id="p2-symbol" maxlength="2" name="p2-symbol"></input>

        <label htmlFor="board-size">Board Size</label>
        <input id="board-size" maxlength="2" name="board-size"></input>
        <button onClick={() => this.setSettings()}>GO!</button>
      </div>
    )

  }


}

export default Settings;
