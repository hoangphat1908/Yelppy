// routing
import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import '../index.css';
import Restaurants from '../modules/restaurant/Restaurants.js';
import SearchResults from '../modules/restaurant/SearchResults.js';
//added by kim for some testing
import NewRestaurant from '../modules/restaurant/NewRestaurant.js';
import NewUser from '../modules/user/NewUser.js';
import Reviews from '../modules/review/Reviews.js';
import NewReview from '../modules/review/NewReview';
import Login from '../modules/user/Login.js';
//end by Kim

import Layout from '../modules/home/layout.js';
import RestaurantDetail from '../modules/restaurant/RestaurantDetail.js';
import * as requireAuth from './requireAuth.js';

let routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <Route path='/restaurants' component={Restaurants}/>
            <Route path='/restaurants/new' component={NewRestaurant}/>
            <Route path="/restaurants/:name" component={RestaurantDetail}/>
            <Route path='/newUser' component={NewUser}/>
            <Route path='/login' component={Login}/>
            <Route path='/reviews' component={Reviews}/>
            <Route path='/reviews/new' component={NewReview}/>
            <Route path='/results(/:searchString)(/:location)' component={SearchResults} />
        </Route>
    </Router>
);

module.exports = routes;