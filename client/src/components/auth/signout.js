import React, {Component} from 'react';
import { connect } from 'react-redux';
import {signoutUser} from '../../actions/auth_actions';
import Radium from 'radium'

class Signout extends Component {

	componentWillMount(){
		// signoutUser() is a function from `actions` coming from index.js
		this.props.signoutUser();
	}

	render() {
		return (
			<div>
				Sorry to see you go...
			</div>
		)
	}
}

Signout.propTypes = {
	signoutUser: React.PropTypes.func.isRequired
};

const RadiumHOC = Radium(Signout);

function mapDispatchToProps(dispatch){
	signoutUser: dispatch(signoutUser)
}

export default connect(null, {signoutUser})(RadiumHOC);