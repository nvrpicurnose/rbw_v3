import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xDeepBlue} from '../../stylesJS/base_colors'

class PropertyPreview extends Component {

	render() {
		return (
			<div style={comStyles().card}>
				{this.props.prop.building_name}
				<img src={this.props.prop.images[0]} style={comStyles().imgTile} />
			</div>
		);
	}
}

PropertyPreview.propTypes = {
	prop: React.PropTypes.object.isRequired
};

const RadiumHOC = Radium(PropertyPreview);

export default connect()(RadiumHOC);


// =================

const comStyles = () => {
	return {
		card: {
			width: "250px",
			height: "250px",
			margin: "10px",
			overflow: "hidden",
			fontSize: "1.1rem",
			color: "white",
			fontWeight: "bold",
			textAlign: "center",
			border: "3px solid white",
			borderRadius: "10px",
			backgroundColor: xDeepBlue,
			":hover": {
				backgroundColor: "rgba(0,0,0,0.5)"
			}
		},
		imgTile: {
			width: "auto",
			height: "100%",
			marginTop: "5px"
		}
	}
}