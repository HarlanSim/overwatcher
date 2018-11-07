import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import logo from './icons/OW-icon_logo.svg';
import './welcome.css';

class Welcome extends Component {
  constructor(props) {
    super(props);
    
    this.state = { uname: null };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ uname: e.target.value });
  }

  handleSubmit(target) {
    if (target.charCode == 13) {
      var uname = this.state.uname;
      var regex = /\w+#\d+/i;
      
      if (regex.test(uname)) {
        this.goto('/Profile?' + uname);
      } else {
        alert(uname + "is an invalid BattleTag");
      }
    }
  }
  
  goto(page) {
    this.props.history.push(page)
  }

  render() {
    const proPlayerProfile = 'xQc#11273'
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="overwatchLogo" alt="logo" />
          <h2>Welcome</h2>
        </div>
        <div className="App-body">
          <div className="usernameTextbox">
            Enter your BattleTag: <input type="text" name="uname" onKeyPress={this.handleSubmit} onChange={this.handleChange} />
          </div>
          <div>
            <button onClick={() => this.goto('Profile?' + proPlayerProfile)}>View Pro Player Statistics</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Welcome);