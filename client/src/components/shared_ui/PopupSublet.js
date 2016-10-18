import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

class PopupSublet extends Component {

	render() {
		return (
			<div style={comStyles().popupSublet}>
				Pop-up Sublet
			</div>
		);
	}
}

PopupSublet.propTypes = {
};

const RadiumHOC = Radium(PopupSublet);

export default connect()(RadiumHOC);


// ======================

const comStyles = () => {
	return {
		popupSublet: {
			display: "inline-block"
		}
	}
}