import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xLightBlue} from '../../stylesJS/base_colors'

import MapView from '../shared_ui/MapView'
import Search from './Search'
import SearchResults from './SearchResults'

class CanvasTenant extends Component {

	render() {
		return (
			<div id='canvas' style={comStyles(this.props.canvasWidth).canvas}>
				<div id='blueCanvas' style={comStyles(this.props.canvasWidth).blueCanvas}>
					<Search style={comStyles(this.props.canvasWidth).search} />
					<SearchResults style={comStyles(this.props.canvasWidth).searchResults} />
				</div>
				<div id='mapView' style={comStyles(this.props.canvasWidth).mapView}>
					<MapView />
				</div>
			</div>
		);
	}
}

CanvasTenant.propTypes = {
	canvasWidth: React.PropTypes.number.isRequired
};

CanvasTenant.defaultProps = {
  canvasWidth: 30
};

const RadiumHOC = Radium(CanvasTenant);

function mapStateToProps(state){
	return {
	}
}

export default connect(mapStateToProps)(RadiumHOC);

// =====================================

const comStyles = (canvasWidth) => {
	let flexGrow = 100-canvasWidth
	return {
		blueCanvas: {
			flexGrow: canvasWidth,
			backgroundColor: xLightBlue,
			height: "100vh",
			display: "inline-block",
			alignItems: "stretch",
			flexDirection: "column"
		},
		mapView: {
			flexGrow: flexGrow,
			height: "100vh",
			display: "inline-block"
		},
		canvas: {
			display: "flex",
			justifyContent: "center",
			alignItems: "stretch"
		},
		search: {
			height: "auto"
		},
		searchResults: {
			flexGrow: 1
		}
	}
}