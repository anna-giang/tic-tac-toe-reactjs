import React from 'react';
import {Switch, Route} from 'react-router-dom';
/* NOTE: The Switch decides which component to show based on the current URL.*/

/* Import page components here */
import Home from './pages/Home.js';
import Game from './pages/TicTacToe.js';


class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/tictactoe' component={Game}></Route>
      </Switch>
    );

  }
}

export default Main;
