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
      gameSettings: {p1Symbol: 'X', p2Symbol: 'O'} // props to pass to TicTacToe game
    };

  }

  goToGame(p1Symbol, p2Symbol) {
    var p1SymbolFinal = this.state.gameSettings.p1Symbol;
    var p2SymbolFinal = this.state.gameSettings.p2Symbol;

    if (p1Symbol !== "") {
      p1SymbolFinal = p1Symbol;
    }
    if (p2Symbol !== "") {
      p2SymbolFinal = p2Symbol;
    }

    // Players cannot have the same symbol!
    if (p1SymbolFinal == p2SymbolFinal) {
      alert("Please enter two different symbols.");
    }
    // Otherwise, get ready to switch state
    else {
      this.setState({allSet: true,
                     gameSettings: {p1Symbol: p1SymbolFinal, p2Symbol: p2SymbolFinal}});
    }


  }


  goToSettings() {
      this.setState({allSet: false});
  }


  render() {
    if (this.state.allSet) {
      return (
        <div>
          {<TicTacToe settings={this.state.gameSettings}/>}
          <button onClick={() => this.goToSettings()}>BACK TO SETTINGS</button>
          <Link to="/">
              <button>Back to Home</button>
          </Link>
        </div>

      )
    }
    else {
      return (
        <div>
          {<Settings goToGame={(p1Symbol, p2Symbol)=>this.goToGame(p1Symbol, p2Symbol)}/>}
          <Link to="/">
              <button>Back to Home</button>
          </Link>
        </div>

      )

    }

  }

}

export default SettingControl;
