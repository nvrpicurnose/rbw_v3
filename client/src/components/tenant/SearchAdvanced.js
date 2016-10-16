import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xMidBlue} from '../../stylesJS/base_colors'

class SearchAdvanced extends Component {

	render() {
		return (
			<div style={comStyles().searchForm}>
				Advanced Search
			</div>
		);
	}
}

SearchAdvanced.propTypes = {
};

const RadiumHOC = Radium(SearchAdvanced);

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