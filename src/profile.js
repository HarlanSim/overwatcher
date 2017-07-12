import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import logo from './icons/OW-icon_logo.svg';
import banner from './banners/mcree.jpg'
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {uname : null, 
                      btag: null, 
                      compstats : 
                        {rank : null, games : null, wins: null, ties: null, losses: null, tier: null, level: null},
                      imgs : 
                        {avatar : null, rank_image: null}};
    }
    componentDidMount() {
        if(this.props.location.search[0] === '?' || this.state.uname != null) {
            this.state.uname = this.props.location.search.substring(1);
            this.state.btag =  this.props.location.search.substring(1) + '-' + this.props.location.hash.substring(1);
            this.props.history.push("/Profile");

            var request = new XMLHttpRequest();
            request.open('GET', 'https://owapi.net/api/v3/u/' + this.state.btag + '/stats?format=json_pretty', false);  // `false` makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                var stats = JSON.parse(request.responseText);
                // this.state.stats = request.responseText;
                var compstats = stats.us.stats.competitive.overall_stats;
                this.state.compstats =  
                        {rank : compstats.comprank, games : compstats.games, wins: compstats.wins, 
                         ties: compstats.ties, losses: compstats.losses, tier: compstats.tier, 
                         level: (compstats.prestige * 100) + compstats.level};
                this.state.imgs =  
                        {avatar : compstats.avatar, rank_image: compstats.rank_image};
                };
            }
        }
    render() {
        return (
        <div className="App">
        <div className="Profile-header">
          <img src={banner} className="App-banner" alt="banner" />
          <div className = "Uname">{this.state.uname}</div>
        </div>
        <div className="App-body">
          <div className="Stats">
            Current Season Statistics
            <div/> Rank {this.state.compstats.rank}
            <div/> Games Played {this.state.compstats.games} 
            <div/> Wins {this.state.compstats.wins} 
            <div/> Ties {this.state.compstats.ties} 
            <div/> Loses {this.state.compstats.losses}
            <div/> Tier {this.state.compstats.tier} 
            <div/> Level {this.state.compstats.level}
         </div>
        <img src={this.state.imgs.avatar}/>
        <img src={this.state.imgs.rank_image}/>
        </div>
      </div>
        );
    };
}

export default withRouter(Profile);