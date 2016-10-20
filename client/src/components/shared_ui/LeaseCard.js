import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import {Glyphicon} from 'react-bootstrap'

import {sortIconsLease} from '../../api/iconSorter'
import {panToMap} from '../../actions/map_actions'
import {triggerLeasePopup, exitPopup, popupImage, popupImageExit} from '../../actions/popup_actions'

import { xMidBlue, xGreyText, xWhiteSmoke } from '../../stylesJS/base_colors'

class LeaseCard extends Component {

	constructor(){
		super()
		this.state = {
			matchedHeight: null
		}
		this.exitPopupIfNoContact.bind(this)
	}

	// By calculating the node height
	componentDidMount(){
		let { clientHeight } = this.refs.infoCol
    	this.setState({
    		matchedHeight: clientHeight
    	})
	}

	renderThumbnails(lease){
		return lease.images.map((img)=>{
			return (
				<img ref={img} src={img} onMouseOver={()=>{this.props.popupImage(img)}} onMouseOut={this.props.popupImageExit} width="100%;" height="100%" style={comStyles().thumbImg} />
			)
		})
	}

	renderRoomHovers(lease){
		return lease.rooms.map((room)=>{
			let displayPrice
			if(room.promo){
				displayPrice = room.promo_price
			}else{
				displayPrice = room.reg_price
			}
			return(
				<button ref={room.room_type} className='btn btn-primary' style={comStyles().roomHover}>
					<div className='col-md-7' style={comStyles().roomHoverName}>
						{room.room_type}
					</div>
					<div className='col-md-5' style={comStyles().roomHoverPrice}>
						$ {displayPrice}
					</div>
				</button>
			)
		})
	}

	exitPopupIfNoContact(){
		if(!this.props.contactToggle){
			this.props.exitPopup()
		}
	}

	render() {
		return (
			<div style={comStyles().card}>
				<div style={comStyles().cardHeader}>
					<div style={comStyles().infobar}>
						{/* Address */}
						<div style={comStyles().building_name}>
							{this.props.lease.building_name}
						</div>
						{/* User Name */}
						<div style={comStyles().userinfo}>
							From &nbsp;
							<a href={this.props.lease.url} target="_blank">{this.props.lease.company || this.props.contacts[0].name}</a>
						</div>
					</div>
					<div style={comStyles().thumbnail}>
						{/* Profile Picture */}
						<a href={this.props.lease.url} target='_blank'>
							<div className='img-circle' style={profileStyle(this.props.lease.thumbnail).profilePic}></div>
						</a>
					</div>
				</div>
				<div style={comStyles().actionbar}>
					<button className='btn btn-primary col-md-8' onClick={()=>{this.props.triggerLeasePopup(this.props.lease, true)}} style={comStyles().inquire}>
						<i className='ion-ios-telephone'></i> &nbsp;
						<i className='ion-email'></i> &nbsp;
						INQUIRE
					</button>
					<button className='btn btn-danger col-md-4' onClick={()=>{this.props.panToMap(this.props.lease)}} style={comStyles().inquire}>
						<i className='ion-ios-location' style='font-size:1em;'></i> &nbsp;
						MAP
					</button>
				</div>
				<div style={comStyles().columnBox}>
						<div ref='infoCol' className='col-md-8' style={comStyles().infoCol}>
							<button className='btn btn-primary' style={comStyles().detailsHover} onMouseOver={()=>{this.props.triggerLeasePopup(this.props.lease)}} onMouseOut={this.exitPopupIfNoContact.bind(this)}>
								<Glyphicon glyph="glyphicon glyphicon-home" /> &nbsp;
								DETAILS
							</button>
							{this.renderRoomHovers(this.props.lease)}
						</div>
						<div className='col-md-4' style={matchedHeights(this.state.matchedHeight).imageCol}>
							{this.renderThumbnails(this.props.lease)}
						</div>
				</div>
			</div>
		);
	}
}

LeaseCard.propTypes = {
	lease: React.PropTypes.object.isRequired,
	contactToggle: React.PropTypes.bool
};

const RadiumHOC = Radium(LeaseCard);

function mapStateToProps(state){
	return {
		contactToggle: state.popup.contact
	}
}

export default connect(mapStateToProps, {panToMap, triggerLeasePopup, exitPopup, popupImage, popupImageExit})(RadiumHOC);


// ==============================

const comStyles = () => {
	return {
		card: {
			margin: "20px",
			padding: "3%",
			borderRadius: "5px",
			backgroundColor: "white",
			minWidth: "250px"
		},
		cardHeader: {
			padding: "3%",
			backgroundColor: xWhiteSmoke,
			display: "flex",
			justifyContent: "center",
			width: "100%",
			alignItems: "flex-start",
			flexDirection: "row"
		},
		infobar: {
			flexGrow: 7
		},
		thumbnail: {
			flexGrow: 3
		},
		building_name: {
			fontSize:"2.1rem",
			fontWeight:"bold",
			width: "100%",
			height:"60%",
			color: xGreyText,
		},
		userinfo: {
			width: "100%",
			height: "35%",
			color: xGreyText,
			fontSize: "1.5rem",
			fontWeight: "bold"
		},
		actionbar: {
			display: "flex",
			justifyContent: "center",
			width: "100%",
			margin: "auto",
			margin: "10px 0px 10px 0px"
		},
		inquire: {
			borderRadius: "0px",
			fontSize: "1.5rem",
			fontWeight: "bold",
		},
		map: {
			borderRadius: "0px",
			fontSize: "1.5rem",
			fontWeight: "bold",
		},
		columnBox: {
			display: "flex",
			justifyContent: "center",
			width: "100%",
			alignItems: "flex-start",
			flexDirection: "row",
			backgroundColor: xMidBlue,
			padding: "0px",
		},
		infoCol: {
			height: "400px",
			padding: "0px",
			display: "flex",
			justifyContent: "center",
			flexDirection: "column",
		},
		detailsHover: {
			width: "100%",
			fontSize:"2.2rem",
			fontWeight:"bold",
			padding: "10px",
			color:"white",
			borderRadius: "0px"
		},
		thumbImg: {
			maxWidth: "100%",
			height: "auto"
		},
		roomHover: {
			margin: "5px",
			padding: "5px",
			flexGrow: 1,
			cursor: "default"
		},
		roomHoverName: {
			textAlign: "center",
			fontSize: "1.8rem",
			fontWeight: "bold"
		},
		roomHoverPrice: {
			textAlign: "center",
			fontSize: "2rem",
			fontWeight: "bold"
		}
	}
}


const profileStyle = (src) => {
	return {
		profilePic: {
			height: "60px",
			width: "60px",
		    borderRadius:'50%',
		    backgroundImage: "url("+src+")",
		    backgroundPosition: 'center',
		    backgroundSize:'100% auto',
		    backgroundRepeat: 'no-repeat',
			display: "inline-block",
		}
	}
}

const matchedHeights = (match) => {
	return {
		imageCol: {
			display: "flex",
			justifyContent: "center",
			flexDirection: "column",
			padding: "0px",
			overflow: "scroll",
			maxHeight: match+"px"
		}
	}
}