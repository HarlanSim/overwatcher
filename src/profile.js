import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import logo from './icons/OW-icon_logo.svg';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {uname : null, stats : null};
    }
    componentDidMount() {
        if(this.props.location.search[0] == '?' || this.state.uname != null) {
            this.state.uname = this.props.location.search.substring(1);
            this.props.history.push("/Profile");

            var request = new XMLHttpRequest();
            request.open('GET', 'https://owapi.net/api/v3/u/MilkSteak-1757/stats?format=json_pretty', false);  // `false` makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                this.state.stats = request.responseText;
            }
        }
    }
    render() {
        return (
        <div className="App">
        <div className="Profile-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h2>Greetings {this.state.uname}</h2>
        </div>
        <div className="App-body">
          <div className="Stats">
            Stats: { this.state.stats }
          </div>
        </div>
      </div>
        );
    };
}

export default withRouter(Profile);