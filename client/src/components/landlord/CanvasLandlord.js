import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import MapView from '../shared_ui/MapView'

class CanvasLandlord extends Component {

	render() {
		return (
			<div id='canvas' style={comStyles(this.props.canvasWidth).canvas}>
				<div id='blueCanvas' style={comStyles(this.props.canvasWidth).blueCanvas}>
					BLUE CANVAS
				</div>
				<div id='mapView' style={comStyles(this.props.canvasWidth).mapView}>
					<MapView pins={this.props.pins} />
				</div>
			</div>
		);
	}
}

CanvasLandlord.propTypes = {
	canvasWidth: React.PropTypes.number.isRequired
};

CanvasLandlord.defaultProps = {
  canvasWidth: 30
};

const RadiumHOC = Radium(CanvasLandlord);

function mapStateToProps(state){
	return {
		pins: state.mapview.pins
	}
}

export default connect(mapStateToProps)(RadiumHOC);

// =====================================

const comStyles = (canvasWidth) => {
	let flexGrow = 100-canvasWidth
	return {
		blueCanvas: {
			flexGrow: canvasWidth,
			height: "100vh",
			display: "inline-block"
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
		}
	}
}