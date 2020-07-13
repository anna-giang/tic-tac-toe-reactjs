import React from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './TicTacToe.js';
import Settings from './Settings.js';
import {Link} from 'react-router-dom';

// Will either render Settings or TicTacToe Game window
class SettingControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allSet: false, // settings have been finalised
      gameSettings: {p1Symbol: 'X', p2Symbol: 'O', boardSize: 3} // props to pass to TicTacToe game
    };

  }

  goToGame(p1Symbol, p2Symbol, boardSize) {
    var p1SymbolFinal = this.state.gameSettings.p1Symbol;
    var p2SymbolFinal = this.state.gameSettings.p2Symbol;
    var boardSizeFinal = this.state.gameSettings.boardSize;

    if (p1Symbol !== "") {
      p1SymbolFinal = p1Symbol;
    }
    if (p2Symbol !== "") {
      p2SymbolFinal = p2Symbol;
    }
    if (boardSize !== "") {
      boardSize = parseInt(boardSize);
      if (boardSize <= 30 && boardSize > 1){
        boardSizeFinal = boardSize;
      }
      else {
        alert("Please enter a valid whole number board size.\nMinimum Board Size: 2\nMaximum Board Size: 30");
        return;
      }
    }



    // Players cannot have the same symbol!
    if (p1SymbolFinal == p2SymbolFinal) {
      alert("Please enter two different symbols.");
    }
    // Otherwise, get ready to switch state
    else {
      this.setState({allSet: true,
                     gameSettings: {p1Symbol: p1SymbolFinal, p2Symbol: p2SymbolFinal, boardSize: boardSizeFinal}});
    }


  }


  goToSettings() {
      this.setState({allSet: false});
  }


  render() {
    if (this.state.allSet) {
      return (
        <div>
          <button onClick={() => this.goToSettings()}>BACK TO SETTINGS</button>
          {<TicTacToe settings={this.state.gameSettings}/>}
        </div>

      )
    }
    else {
      return (
        <div>
          {<Settings goToGame={(p1Symbol, p2Symbol, boardSize)=>this.goToGame(p1Symbol, p2Symbol, boardSize)}/>}
        </div>

      )

    }

  }

}

export default SettingControl;
