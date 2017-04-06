import React, { Component } from 'react';
import { Link } from 'react-router';
import * as firebase from 'firebase';

class Restaurants extends Component{

	constructor(){
		super();
		this.state = {restaurants:[]};
	}

	componentWillMount(){
		console.log("mounting");
		var restaurantListRef = firebase.database().ref('restaurants');
		var that = this;
		this.setState({restaurants: []});

		restaurantListRef.once('value', function(snapshot) {
		  snapshot.forEach(function(childSnapshot) {
		    that.state.restaurants.push(childSnapshot.val());
		  });
		});
	}

	render(){
		return(
			<div>
				<h1>List of restaurant</h1>
				<Link to='/new'>New</Link>
				<div>
			      {this.state.restaurants.map((restaurant, index) =>(
				    <ul key={index}>
				    	<li>Name: <Link to={'/restaurants/'+restaurant.name}>{restaurant.name}</Link></li>
					    <li>Rating:{ restaurant.rating }/5</li>
					    <li>Address:{ restaurant.loc }</li>
				    </ul>))}
			    </div>
		    </div>
	)}

}

export default Restaurants;