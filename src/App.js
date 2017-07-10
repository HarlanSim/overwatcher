import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './icons/OW-icon_logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {uname : null};
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleChange(e) {
    this.setState({ uname: e.target.value });
  }
  handleKeyPress(target) {
    if(target.charCode==13) {
      var uname = this.state.uname;
      var regex = /\w+#\d+/i;
      if (regex.test(uname)) {
        alert("Verified: " + uname);
        ReactDOM.render(<App />, document.getElementById('root'));
      } else {
        alert(uname + "is an invalid BattleTag");
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h2>Welcome</h2>
        </div>
        <div className="App-body">
          <div className="unameTBox">
            Enter your BattleTag: <input type="text" name="uname" onKeyPress={ this.handleKeyPress } onChange={ this.handleChange }/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
