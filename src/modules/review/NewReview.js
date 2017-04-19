import React,{ Component } from 'react';
import * as firebase from 'firebase';
import {hashHistory} from 'react-router'
import "../../App.css";
class NewReview extends Component{

	constructor(){
		super();
		this.state = {restaurantName: String, restaurantId: String};
	}

	componentWillMount(){
		console.log("New review Mounting");
		this.restaurantRef = firebase.database().ref('business');
		var that = this;
		this.restaurantRef.orderByKey().equalTo(this.props.params.id).once('child_added',  function(snapshot) {
			that.setState({restaurantName: snapshot.val().name});
			that.setState({restaurantId: snapshot.val().id});
		}.bind(this));
	}

	submit(e){
		var currentUser = firebase.auth().currentUser;
		if(currentUser!=null){
			e.preventDefault();
			var reviewListRef = firebase.database().ref('reviews');
			var newReviewRef = reviewListRef.push();
			newReviewRef.set({
			  author: currentUser.email,
			  rating: this.refs.rating.value,
			  text: this.refs.review.value,
			  id: this.refs.id.value,
			});

			var path = '/restaurants/'+this.state.restaurantId;
			console.log(this.state.restaurantId)
			console.log(path);
			hashHistory.push(path);

		}
	}

	render(){
		return(
			<div>
				<div>
			      <form className="col-md-2" onSubmit={this.submit.bind(this) }>
			      <h4> Write a review for {this.state.restaurant} </h4>
			      <table><tbody>
			      	<tr>
			      		<td> Rating </td>
			      		<td>  <input type="text" ref="rating" placeholder="Rating on scale of 5"/> </td>
			      	</tr>

			      	<tr>
			      		<td> Review </td>
			      		<td>  <textArea cols="50" type="text" ref="review" placeholder="Share your thoughts..."/></td>
			      	</tr>

			      	<input type="hidden" ref="id" value={this.props.params.id}/>
			      	<button type="submit">Submit</button>
			      </tbody></table>
				</form>
			    </div>
			</div>
		)
	}
}

export default NewReview;
