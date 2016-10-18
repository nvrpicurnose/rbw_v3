import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import moment from 'moment'

import {sortIconsSublet} from '../../api/iconSorter'
import {panToMap} from '../../actions/map_actions'

import { xGreyText } from '../../stylesJS/base_colors'

class SubletCard extends Component {

	shortenedAddress(){
		const comma = this.props.sublet.address.indexOf(',')
		return this.props.sublet.address.slice(0, comma)
	}

	render() {
		return (
			<div style={comStyles().card}>

				<div id='infobar' style={comStyles().infobar}>
					{/* Profile Picture */}
					<a href={this.props.sublet.userurl} target='_blank'>
						<div className='img-circle' style={profileStyle(this.props.sublet.userpic).profilePic}></div>
					</a>

					<div id='infobadge' style={comStyles().infobadge}>
						{/* Address */}
						<div style={comStyles().address}>
							{this.shortenedAddress()}
						</div>
						{/* User Name */}
						<div style={comStyles().userinfo}>
							<a href={this.props.sublet.userurl} target="_blank">{this.props.sublet.username}</a> &nbsp;
							on &nbsp;
							<b>{moment(this.props.sublet.updated_at).format("MMM Do")}</b>
						</div>
					</div>
				</div>

				{/* Price */}
				<div style={comStyles().pricediv}>
					<span style={comStyles().price}>$ {this.props.sublet.price}</span>
				</div>
				
				{/* Icons */}
				<div id='iconbar' style={comStyles().iconbar}>
					{sortIconsSublet(this.props.sublet)}
				</div>

				{/* Buttons Bar */}
				<div id='buttonsBar' style={comStyles().buttonsBar}>
					<a href={this.props.sublet.posturl} target='_blank' style={comStyles().seeOriginalAhref}>
						<button className="btn btn-info" style={comStyles().seeOriginal}>See Original</button>
					</a>
					<button className="btn btn-danger" onClick={()=>{this.props.panToMap(this.props.sublet)}} style={comStyles().map}>
						<i className='ion-ios-location' style='font-size:1em;'></i> &nbsp;
						Map
					</button>
				</div>
			</div>
		);
	}
}

SubletCard.propTypes = {
	sublet: React.PropTypes.object.isRequired
};

const RadiumHOC = Radium(SubletCard);

export default connect(null, {panToMap})(RadiumHOC);


// ==============================

const comStyles = () => {
	return {
		card: {
			margin: "20px",
			padding: "3%",
			borderRadius: "5px",
			backgroundColor: "white",
		},
		infobar: {
			width: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "flex-start",
			flexDirection: "row"
		},
		infobadge: {
			display: "flex",
			flexDirection: "column",
			margin: "1% 1% 1% 3%",
		},
		address: {
			fontSize:"2.2rem",
			fontWeight:"bold",
			width: "100%",
			height:"60%",
			color: xGreyText,
		},
		userinfo: {
			width: "100%",
			height: "35%",
			color: xGreyText,
			fontSize: "1.5rem"
		},
		pricediv: {
			textAlign:"center",
			padding: "30px",
		},
		price: {
			fontSize:"3rem",
			fontWeight:"bold",
			color: xGreyText,
		},
		iconbar: {
			width: "100%",
			display: "flex",
			justifyContent: "center",
			fontSize: "1.5rem",
			color: xGreyText,
		},
		buttonsBar: {
			display: "flex",
			justifyContent: "center",
			width: "100%",
			margin: "auto",
			fontSize: "1rem",
			fontWeight: "bold"
		},
		seeOriginalAhref: {
			flexGrow: 3
		},
		seeOriginal: {
			borderRadius: "0px",
			width: "100%"
		},
		map: {
			borderRadius: "0px",
			flexGrow: 1
		},
	}
}


const profileStyle = (src) => {
	return {
		profilePic: {
			height: "70px",
			width: "70px",
		    borderRadius:'50%',
		    backgroundImage: "url("+src+")",
		    backgroundPosition: 'center',
		    backgroundSize:'100% auto',
		    backgroundRepeat: 'no-repeat',
			display: "inline-block",
		}
	}
}