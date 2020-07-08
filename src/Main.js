import React from 'react';
import {Switch, Route} from 'react-router-dom';
/* NOTE: The Switch decides which component to show based on the current URL.*/

/* Import page components here */
import Home from './pages/Home.js';
import TicTacToe from './pages/TicTacToe.js';
import SettingControl from './pages/SettingControl.js';


class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/mytictactoe' component={SettingControl}></Route>
        <Route exact path='/tictactoe' render={(props) => <TicTacToe {...props} settings={{p1Symbol: 'X', p2Symbol: 'O', boardSize: 3}}/>}></Route>
      </Switch>
    );
    // NOTE: To pass props to the components, use: render={(props) => <TicTacToe {...props} />}
  }
}

export default Main;
