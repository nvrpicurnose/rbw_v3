import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {signinUser} from '../../actions/auth_actions';
import axios from 'axios';
import {connect} from 'react-redux';
import Radium from 'radium'

class Signin extends Component {

	renderAlert(){
		if(this.props.errorMessage){
			return (
				<div className='alert alert-danger'>
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render(){
		// handleSubmit and fields comes from reduxForm, which implictly passes in them as props
		// notice that we are using the { } deconstructor to get specifically email & password
		const {handleSubmit} = this.props;
		return (
			<form onSubmit={handleSubmit(this.props.signinUser)}>
				{/* handleSubmit() is a reduxForm function that will run our middleware and implicitly pass in an object containing all our specified fields */}
				<fieldset className='form-group'>
					<label>Email</label>
					{/* Field name determines the name of the variables being passed to handleSubmit(this.props.signinUser) */}
					<Field name="email" component="input" type="text" className='form-control' />
				</fieldset>
				<fieldset className='form-group'>
					<label>Password</label>
					<Field name="password" component="input" type="password" className='form-control' />
				</fieldset>
				{this.renderAlert()}
				<button action='submit' className='btn btn-primary'>Sign in</button>
			</form>
		);
	}
}

Signin.propTypes = {
	errorMessage: React.PropTypes.string,
	signinUser: React.PropTypes.func.isRequired,
	handleSubmit: React.PropTypes.func
};


// if there is an error, it will appear on the state tree
function mapStateToProps(state){
	return {
		errorMessage: state.auth.error
	}
}

const RadiumHOC = Radium(reduxFormHOC);

// create HOC reduxForm <Signin>
// reduxForm uses its own reducer
const reduxFormHOC = reduxForm({
	// specify a name for the form
	form: 'signin'
// and we also pass in an equivalent 'mapStateToProps' and 'mapDispatchToProps'
})(RadiumHOC);

// and now create another HOC with connect() to give our reduxForm HOC additional functions
export default connect(mapStateToProps, {signinUser})(reduxFormHOC); 