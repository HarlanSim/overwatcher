import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './index.css';
import Welcome from './welcome';
import Profile from './profile';
import Compare from './compare';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( 
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {Welcome}/>
            <Route exact path = '/profile' component = {Profile}/>  
            <Route exact path = '/compare' component = {Compare}/>                             
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
