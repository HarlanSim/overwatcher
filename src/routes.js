import Welcome from './welcome';

var React = require('react');  
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;  
var Route = Router.Route; 

var routes = (  
    <Route name="overwatcher" path="/" handler={require('./index.js')}>
           <Welcome/>} />
    </Route>
)