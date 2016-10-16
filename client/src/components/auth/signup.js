import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {signupUser} from '../../actions/auth_actions';
import Radium from 'radium'

class Signup extends Component {

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
		const {handleSubmit} = this.props;
		return (
			<form onSubmit={handleSubmit(this.props.signupUser)}> 
				<fieldset className='form-group'>
					<label>Email:</label>
					<Field name="email" component="input" type="text" className='form-control' />
					{/* 
						// delayed error message based on multiple conditions
						{email.touched && email.error && <div className='error'>{email.error}</div>} 
					*/}
				</fieldset>
				<fieldset className='form-group'>
					<label>Password:</label>
					<Field name="password" component="input" type="password" className='form-control' />
					{/* 
						// delayed error message based on multiple conditions
						{password.touched && password.error && <div className='error'>{password.error}</div>} 
					*/}
				</fieldset>
				<fieldset className='form-group'>
					<label>Confirm Password:</label>
					<Field name="passwordConfirm" component="input" type="password" className='form-control' />
					{/* 
						// delayed error message based on multiple conditions
						{passwordConfirm.touched && passwordConfirm.error && <div className='error'>{passwordConfirm.error}</div>} 
					*/}
				</fieldset>
				{this.renderAlert()}
				<button action='submit' className='btn btn-primary'>Sign Up</button>
			</form>
		);
	}
}; 

Signup.propTypes = {
	errorMessage: React.PropTypes.string,
	signinUser: React.PropTypes.func.isRequired,
	handleSubmit: React.PropTypes.func
};

const RadiumHOC = Radium(Signup);

function mapStateToProps(state){
	return {
		errorMessage: state.auth.error
	}
}

const reduxFormHOC = reduxForm({
	form: 'signup',
	// we can also specify functions to allow as props into <Signup>
	// validate: validate
})(RadiumHOC);

export default connect(mapStateToProps, {signupUser})(reduxFormHOC);
