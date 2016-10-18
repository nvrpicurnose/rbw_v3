import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {TOGGLE_SUBLET_POPUP_TRUE, TOGGLE_LEASE_POPUP_TRUE} from '../../actions/action_types'
import {xDeepBlue} from '../../stylesJS/base_colors'
import {exitPopup} from '../../actions/popup_actions'
import PopupLease from './PopupLease'
import PopupSublet from './PopupSublet'
import PopupContact from './PopupContact'

class Popup extends Component {

	renderLeaseOrSublet(){
		if(this.props.toggle === TOGGLE_LEASE_POPUP_TRUE){
			return (
				<PopupLease />
			)
		}else if(this.props.toggle === TOGGLE_SUBLET_POPUP_TRUE){
			return (
				<PopupSublet />
			)
		}
	}

	renderContactForm(){
		if(this.props.contact){
			return (
				<PopupContact />
			)
		}
	}

	render() {
		return (
			<div style={comStyles().popup}>
				<div onClick={this.props.exitPopup} style={comStyles().exit}>
					<i className='ion-close-circled'></i>
				</div>
				<div style={comStyles().display}>
					{this.renderContactForm()}
					{this.renderLeaseOrSublet()}
				</div>
			</div>
		);
	}
}

Popup.propTypes = {
	leaseForPopup: React.PropTypes.object,
	subletForPopup: React.PropTypes.object,
	toggle: React.PropTypes.string.isRequired,
	contact: React.PropTypes.bool.isRequired
};

const RadiumHOC = Radium(Popup);

function mapStateToProps(state){
	return {
		leaseForPopup:state.popup.leaseForPopup,
		subletForPopup:state.popup.subletForPopup, 
		toggle: state.popup.toggle,
		contact: state.popup.contact
	}
}

export default connect(mapStateToProps, {exitPopup})(RadiumHOC);


// ======================

export const comStyles = () => {
	return {
		popup: {
			backgroundColor: xDeepBlue,
			zIndex: "11",
			position: "absolute",
			width: "auto",
			justifyContent: "flex-end",
			padding: "10px",
			top: "10%",
			left: "15px"
		},
		exit: {
			fontSize: "3rem",
			zIndex: "12",
			color: "white",
			position: "absolute",
			fontWeight: "bold",
			right: "20px"
		},
		display: {
			display: "flex",
			flexDirection: "row"
		}
	}
}