// No state is held in <Header> so a functional component would be well suited for this component
// However, we plan on making a complex component for managing auth so using a class would help organize our code better

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium'

class Header extends Component {

	renderLinks(){
		if(this.props.authenticated){
			// show a link to sign out
			return (
				<li className='nav-item'>
					<Link className='nav-link' to='/signout'>Sign Out</Link>
				</li>
			);
		}else{
			// show a link to sign in or sign up
			// React allows for returning an array of JSX elements
			return [
				<li className='nav-item' key={1}>
					<Link className='nav-link' to='/signin'>Sign In</Link>
				</li>,
				<li className='nav-item' key={2}>
					<Link className='nav-link' to='/signup'>Sign Up</Link>
				</li>
			];
		}
	}

	render(){
		return (
			<nav className='navbar navbar-light'>
				<Link to='/' className='navbar-brand'>Redux Auth</Link>
				{this.renderLinks()}
			</nav>
		);
	}
}

Header.propTypes = {
};

const RadiumHOC = Radium(Header);

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps)(RadiumHOC);