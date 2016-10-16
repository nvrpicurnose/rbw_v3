import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import {fetchMessage} from '../../actions/auth_actions';


class Feature extends Component {

	componentWillMount(){
		this.props.fetchMessage();
	}

	render() {
		return (
			<div>{this.props.message}</div>
		);
	}
}

Feature.propTypes = {
};

const RadiumHOC = Radium(Feature);

function mapStateToProps(state){
	return {
		message: state.auth.message
	}
}

export default connect(mapStateToProps, {fetchMessage})(RadiumHOC);