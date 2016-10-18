import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xMidBlue, xGreyText, xBootstrapRed} from '../../stylesJS/base_colors'
import { sortIconsLease } from '../../api/iconSorter'

class PopupLease extends Component {

	renderRoomRows(room){
		if(room.promo){
			return (
				<tr key={room.room_type} style={comStyles().roomRow}>
					<td>{room.room_type}</td>
					<td>{room.reg_price}</td>
					<td>{room.lease_terms}</td>
					<td>{room.rooms_per}</td>
					<td>{room.bathrooms}</td>
					<td>{room.note}</td>
				</tr>
			)
		}else{
			return (
				<tr key={room.room_type+"_promo"} style={comStyles().promoRow}>
					<td>{room.room_type}</td>
					<td>{room.promo_price}</td>
					<td>{room.promo_terms}</td>
					<td>{room.rooms_per}</td>
					<td>{room.bathrooms}</td>
					<td>{room.note}</td>
				</tr>
			)
		}
	}

	render() {
		return (
			<div style={comStyles().popupLease}>
				<div className='col-md-12' style={comStyles().propertyTitle}>
					<h1>{this.props.leaseForPopup.building_name}</h1>
					<h3>{this.props.leaseForPopup.address}</h3>
				</div>

				<div className='col-md-12' style={comStyles().table}>
					<table className="table">
					    <thead>
					      <tr>
					        <th style={comStyles().tableHead}>Suite</th>
					        <th style={comStyles().tableHead}>Price</th>
					        <th style={comStyles().tableHead}># Months</th>
					        <th style={comStyles().tableHead}># Rooms</th>
					        <th style={comStyles().tableHead}># Baths</th>
					        <th style={comStyles().tableHead}>Note</th>
					      </tr>
					    </thead>
					    <tbody>
					    	{this.props.leaseForPopup.rooms.map(this.renderRoomRows)}
					    </tbody>
					</table>
				</div>
				<div style={comStyles().includes}>{this.props.leaseForPopup.type}  Includes:</div>
				<div id='iconbar' style={comStyles().iconbar}>
					{sortIconsLease(this.props.leaseForPopup)}
				</div>

				<div style={comStyles().note}>{this.props.leaseForPopup.note}</div>

				<div style={comStyles().note} color='#ccccff'>* This info is not guaranteed to be correct. Always check with the property owner.</div>
			</div>
		);
	}
}

PopupLease.propTypes = {
	leaseForPopup: React.PropTypes.object
};

const RadiumHOC = Radium(PopupLease);

function mapStateToProps(state){
	return {
		leaseForPopup: state.popup.leaseForPopup
	}
}

export default connect(mapStateToProps)(RadiumHOC);

// ======================

const comStyles = () => {
	return {
		popupLease: {
			display: "inline-block"
		},
		propertyTitle: {
			color:"white",
			textAlign:"center",
			marginTop:"15px",
			color: "white"
		},
		table: {
			color:"white",
			textAlign:"center",
			margin: "20px 0px 20px 0px",
		},
		tableHead: {
			textAlign:"center",
			fontSize: "1.5rem",
			fontWeight:"bold",
		},
		roomRow: {
			textAlign:"center",
			fontSize: "1.2rem",
		},
		promoRow: {
			textAlign:"center",
			fontSize: "1.2rem",
			color: xBootstrapRed
		},
		includes: {
			width: "100%",
			textAlign: "center",
			color: "white",
			fontWeight: "bold",
			fontSize: "1.4rem"
		},
		iconbar: {
			width: "100%",
			display: "flex",
			justifyContent: "center",
			fontSize: "1.8rem",
			color: "white",
			textAlign: "center"
		},
		note: {
			width: "100%",
			padding: "10px",
			textAlign: "center",
			color: "white",
			fontSize: "1.3rem"
		}
	}
}