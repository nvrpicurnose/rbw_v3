import React, {Component} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'

import { xMidBlue } from '../../stylesJS/base_colors'

import LogoSet from './ui/logoSet'
import SearchWidget from './SearchWidget'

class LandlordDashboard extends Component {

	render() {
		return (
			<div style={comStyles().dashboard}>
				<LogoSet />
				<SearchWidget />
			</div>
		);
	}
}

LandlordDashboard.propTypes = {
};

const RadiumHOC = Radium(LandlordDashboard);

export default connect()(RadiumHOC);

// ===========================

const comStyles = () => {
	return {
		dashboard: {
			backgroundColor: xMidBlue,
			width: "100%",
			height: "100%",
			margin: "0",
			left: "0",
			top: "0",
		}
	} 
}