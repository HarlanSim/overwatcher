import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import logo from './icons/OW-icon_logo.svg';
import banner from './banners/ana.jpg'
import './profile.css';

class Compare extends Component {
    constructor(props) {
        super(props);
        this.state = {uname1 : null, 
                      btag1: null, 
                      uname2 : null, 
                      btag2: null, 
                      compstats1 : 
                        {rank : null, games : null, wins: null, ties: null, losses: null, tier: null, level: null},
                      compstats2 : 
                        {rank : null, games : null, wins: null, ties: null, losses: null, tier: null, level: null},
                      imgs1 : 
                        {avatar : null, rank_image: null},
                      imgs2 : 
                        {avatar : null, rank_image: null}};
    }
    componentDidMount() {
        if(this.props.location.search[0] === '?' || this.state.uname1 != null) {
            this.state.uname1 = this.props.location.search.substring(1);
            this.state.btag1 =  this.props.location.search.substring(1) + '-' + this.props.location.hash.substring(1);
            this.props.history.push("/Compare");

            var request = new XMLHttpRequest();
            request.open('GET', 'https://owapi.net/api/v3/u/' + this.state.btag1 + '/stats?format=json_pretty', false);  // `false` makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                var stats = JSON.parse(request.responseText);
                // this.state.stats = request.responseText;
                var compstats = stats.us.stats.competitive.overall_stats;
                this.state.compstats1 =  
                        {rank : compstats.comprank, games : compstats.games, wins: compstats.wins, 
                         ties: compstats.ties, losses: compstats.losses, tier: compstats.tier, 
                         level: (compstats.prestige * 100) + compstats.level};
                this.state.imgs1 =  
                        {avatar : compstats.avatar, rank_image: compstats.rank_image};
                };
            }
        }
    render() {
        return (
        <div className="App">
        <div className="Profile-header">
          <img src={banner} className="App-banner" alt="banner" />
          <div className = "Uname">{this.state.uname1}</div>
        </div>
        <div className="App-body">
          <div className="Stats">
            Current Season Statistics
            <div/> Rank {this.state.compstats1.rank}
            <div/> Games Played {this.state.compstats1.games} 
            <div/> Wins {this.state.compstats1.wins} 
            <div/> Ties {this.state.compstats1.ties} 
            <div/> Loses {this.state.compstats1.losses}
            <div/> Tier {this.state.compstats1.tier} 
            <div/> Level {this.state.compstats1.level}
         </div>
        <img src={this.state.imgs1.avatar}/>
        <img src={this.state.imgs1.rank_image}/>
        </div>
      </div>
        );
    };
}

export default withRouter(Compare);