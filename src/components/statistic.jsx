import React, { Component } from 'react';

class Statistic extends Component {
    render(){
        return (
        <div className={this.props.className}>
          {this.props.title}
          <div/> Rank {this.props.compstats.rank}
          <div/> Games Played {this.props.compstats.games} 
          <div/> Wins {this.props.compstats.wins} 
          <div/> Ties {this.props.compstats.ties} 
          <div/> Loses {this.props.compstats.losses}
          <div/> Tier {this.props.compstats.tier} 
          <div/> Level {this.props.compstats.level}
       </div>
       );
    }
}

export default Statistic;