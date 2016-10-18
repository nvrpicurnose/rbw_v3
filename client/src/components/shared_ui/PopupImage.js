import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xMidBlue} from '../../stylesJS/base_colors'

class PopupImage extends Component {

	render() {
		return (
			<div style={comStyles().popup}>
				<img src={this.props.imgForPopup} style={comStyles().img} />
			</div>
		);
	}
}

PopupImage.propTypes = {
	imgForPopup: React.PropTypes.string.isRequired
};

const RadiumHOC = Radium(PopupImage);

function mapStateToProps(state){
	return {
		imgForPopup: state.popup.imgForPopup
	}
}

export default connect(mapStateToProps)(RadiumHOC)

// =====================

const comStyles = () => {
	return {
		popup: {
			zIndex: "20",
			position: "absolute",
			width: "auto",
			border: "3px solid "+xMidBlue,
			top: "10%",
			left: "15px"
		},
		img: {
			width: "100%",
			maxWidth: "60vw",
			height: "auto"
		}
	}
}