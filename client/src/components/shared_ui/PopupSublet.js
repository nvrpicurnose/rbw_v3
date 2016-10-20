import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

class PopupSublet extends Component {

	render() {						
		return (
			<div style={comStyles().popupSublet}>
				<div style={comStyles().textDiv}>
					<p style={comStyles().text}>{this.props.subletForPopup.message}</p>
				</div>
			</div>
		);
	}
}

PopupSublet.propTypes = {
	subletForPopup: React.PropTypes.object.isRequired
};

const RadiumHOC = Radium(PopupSublet);

function mapStateToProps(state){
	return {
		subletForPopup: state.popup.subletForPopup
	}
}

export default connect(mapStateToProps)(RadiumHOC);


// ======================

const comStyles = () => {
	return {
		popupSublet: {
			display: "flex",
			margin: "20px 0px 0px 0px",
		},
		textDiv: {
			padding: "20px",
			fontSize: "1.6rem",
			fontWeight: "bold",
			maxWidth: "800px",
			overflow: "hidden",
			color: "white"
		},
		text: {
			wordWrap: "normal",
			overflowWrap: "break-word",
			whiteSpace: "pre-line"
		}
	}
}