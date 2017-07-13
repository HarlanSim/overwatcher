import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
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
            this.state.btag1 =  this.props.location.search.substring(1) + '-' + this.props.location.hash.substring(1).split('&')[0];
            this.state.uname2 = this.props.location.hash.substring(1).split('&')[1].split('#')[0];
            this.state.btag2 = this.props.location.hash.substring(1).split('&')[1];
            this.props.history.push("/Compare");

            var request1 = new XMLHttpRequest();
            request1.open('GET', 'https://owapi.net/api/v3/u/' + this.state.btag1 + '/stats?format=json_pretty', false);  // `false` makes the request synchronous
            request1.send(null);

            var request2 = new XMLHttpRequest();
            request2.open('GET', 'https://owapi.net/api/v3/u/' + this.state.btag2 + '/stats?format=json_pretty', false);  // `false` makes the request synchronous
            request2.send(null);

            if (request1.status === 200 && request2.status === 200) {
                var stats1 = JSON.parse(request1.responseText);
                var stats2 = JSON.parse(request2.responseText);
                // this.state.stats = request.responseText;
                var compstats1 = stats1.us.stats.competitive.overall_stats;
                this.state.compstats1 =  
                        {rank : compstats1.comprank, games : compstats1.games, wins: compstats1.wins, 
                         ties: compstats1.ties, losses: compstats1.losses, tier: compstats1.tier, 
                         level: (compstats1.prestige * 100) + compstats1.level};
                var compstats2 = stats2.us.stats.competitive.overall_stats;
                this.state.compstats2 =  
                        {rank : compstats2.comprank, games : compstats2.games, wins: compstats2.wins, 
                         ties: compstats2.ties, losses: compstats2.losses, tier: compstats2.tier, 
                         level: (compstats2.prestige * 100) + compstats2.level};
                this.state.imgs1 =  
                        {avatar : compstats1.avatar, rank_image: compstats1.rank_image};
                this.state.imgs2 =
                        {avatar : compstats2.avatar, rank_image: compstats2.rank_image};
                };
        }
    } 
    render() {
        return (
        <div className="App">
        <div className="Compare-header">
          <img src={require('./banners/' + hero1 + '.jpg')} className="Compare-banner" alt="banner" />
          <div className = {"SmUname HalfWidth " + hero1}>{this.state.uname1}</div>
        </div>
        <div className="Compare-header">
          <img src={require('./banners/' + hero2 + '.jpg')} className="Compare-banner" alt="banner" />
          <div className = {"SmUname HalfWidth " + hero2}>{this.state.uname2}</div>
        </div>
        <div className="App-body">
          <div className="CompareStats1">
            Current Season Statistics
            <div/> Rank {this.state.compstats1.rank}
            <div/> Games Played {this.state.compstats1.games} 
            <div/> Wins {this.state.compstats1.wins} 
            <div/> Ties {this.state.compstats1.ties} 
            <div/> Loses {this.state.compstats1.losses}
            <div/> Tier {this.state.compstats1.tier} 
            <div/> Level {this.state.compstats1.level}
         </div>
         <div className="CompareStats2">
            Current Season Statistics
            <div/> Rank {this.state.compstats2.rank}
            <div/> Games Played {this.state.compstats2.games} 
            <div/> Wins {this.state.compstats2.wins} 
            <div/> Ties {this.state.compstats2.ties} 
            <div/> Loses {this.state.compstats2.losses}
            <div/> Tier {this.state.compstats2.tier} 
            <div/> Level {this.state.compstats2.level}
         </div>
        </div>
      </div>
        );
    };
}

var min = Math.ceil(0);
var max = Math.floor(22);
var index1 = Math.floor(Math.random() * (max - min + 1)) + min;
var index2 = Math.floor(Math.random() * (max - min + 1)) + min;
var heroes = [
    'ana','bastion','dva','genji','hanzo','junkrat','lucio','mcree','mei','mercy','orisa',
    'pharah','reaper','reinhardt','roadhog','soldier','sombra','symmetra','tracer','widowmaker','winston','zarya','zenyatta'
]
var hero1 = heroes[index1];
var hero2 = heroes[index2];

export default withRouter(Compare);