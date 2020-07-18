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
    var boardSize = document.getElementById('board-size').value;
    this.props.goToGame(p1Symbol, p2Symbol, boardSize);
  }

  render() {
    return (
      <div class='container'>

        <div class='d-flex flex-row'>
          <div class="d-flex col-1 justify-content-center">
            <Link to="/"><button type="button" class="btn btn-danger">Home</button></Link>
          </div>
          <div class="d-flex col-10 justify-content-center" id='page-heading'>Settings</div>
          <div class="d-flex col-1"></div>
        </div>

        <div class='d-flex flex-row'>
          <div class='d-flex col-1'></div>
          <div class='container col-10'>
            
            <div class='d-flex flex-column'>
              <div id="setting-heading" class='d-flex flex-row' style={{borderRight: '1px solid #000000', borderLeft: '1px solid #000000', borderTop: '1px solid #000000'}}>
                <div class='d-flex'>Symbols</div>
              </div>

              <div class='d-flex flex-row' style={{border: '1px solid #000000'}}>

                <div class='d-flex flex-row col-6' style={{borderRight: '1px solid #000000'}}>
                  <div id='setting-field-label' class='d-flex col-6'>Player 1</div>
                  <div class='d-flex col-6'>
                    <input id="p1-symbol" maxlength="2" name="p1-symbol"></input><br/>
                  </div>
                </div>

                <div class='d-flex flex-row col-6'>
                  <div id='setting-field-label'  class='d-flex col-6'>Player 2</div>
                  <div class='d-flex col-6'>
                    <input id="p2-symbol" maxlength="2" name="p2-symbol"></input>
                  </div>
                </div>

              </div>
            </div>

            <div class='d-flex flex-row'>
                <div id="setting-heading" style={{border: '1px solid #000000'}} class='d-flex col-6'>
                  <div class='d-flex flex-column justify-content-center'>Board Size</div>
                </div>
                <div class='d-flex col-6 justify-content-center' style={{borderRight: '1px solid #000000', borderBottom: '1px solid #000000', borderTop: '1px solid #000000'}}> 
                  <input id="board-size" maxlength="2" name="board-size"></input>
                </div>
            </div>

          </div>
          <div class='d-flex col-1'></div>
        </div>

        <div class='d-flex justify-content-center'>
          <button onClick={() => this.setSettings()} type="button" class="btn btn-lg btn-danger">PLAY</button>
        </div>
        
        
      </div>
    )

  }


}

export default Settings;
