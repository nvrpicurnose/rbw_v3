import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xMidBlue} from '../../stylesJS/base_colors'

class SearchAdvLease extends Component {

	render() {
		return (
			<div style={comStyles().searchForm}>
				LEASE SEARCH
			</div>
		);
	}
}

SearchAdvLease.propTypes = {
};

const RadiumHOC = Radium(SearchAdvLease);

export default connect()(RadiumHOC);

// ==============================

const comStyles = () => {
	return {
		searchForm: {
			display: "flex",
			justifyContent: "center",
			flexDirection: "row",
			alignItems: "center",
			padding: "10px",
			margin: "15px",
			height: "200px",
			color: "white",
			borderRadius: "8px",
			backgroundColor: xMidBlue,
		}
	}
}