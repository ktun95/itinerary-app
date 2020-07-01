import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  ConnectedActivityMap  from './map'
import { Home } from './home'
import { Navigation } from '../components'

export default function Routes() {
    return (
        <Router>
            <Route path="/" component={Navigation} />
            <Route path="/map" component={ConnectedActivityMap} />
            <Route path="/home" component={Home} />
        </Router>
    )
}