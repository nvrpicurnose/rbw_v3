import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xWhiteSmoke, xGreyText} from '../../stylesJS/base_colors'

class PopupContact extends Component {

	constructor(){
		super()
		this.state = {

		}
	}

	render() {
		return (
			<div style={comStyles().form}>
				<div className='col-md-12' style={comStyles().header}>
					<div className='col-md-8'>
						<div style={comStyles().company}>{this.props.leaseForPopup.company || this.props.leaseForPopup.contacts[0].name}</div>
					</div>
					<div className='col-md-4'>
						<a href={this.props.leaseForPopup.url}>
							<img src={this.props.leaseForPopup.thumbnail} width="100%;" height="100%" style={profileStyle(this.props.leaseForPopup.thumbnail).profilePic} />
						</a>
					</div>
				</div>

			  	<div className="form-group" margin-top='25px'>
			    	<textarea className="form-control" style={comStyles().textarea} placeholder="RentBurrow does not spam users. You and the company communicate privately with your own email." required></textarea>
			  	</div>
			    <div className="form-group" margin-top='15px'>
			      	<input className="form-control" type='text' placeholder="&nbsp; Reply: Cell Phone" style={comStyles().phone} />
			      	<input className="form-control" type='email' placeholder="&nbsp; Reply: youraddress@email.com" style={comStyles().email} required />
			    </div>
			  
			    <button type="submit" className="btn btn-info btn-block" style={comStyles().submit}>
			  	  	SEND EMAIL
			    </button>
			  	<button className='btn btn-block' style={comStyles().contactinfo}>
			  		<i className='ion-ios-telephone' style='font-size:1rem;'></i> &nbsp; {this.props.leaseForPopup.contacts[0].phone} ( {this.props.leaseForPopup.contacts[0].name} )
			  	</button>
			</div>
		);
	}
}

PopupContact.propTypes = {
	leaseForPopup: React.PropTypes.object.isRequired
};

const RadiumHOC = Radium(PopupContact);

function mapStateToProps(state){
	return {
		leaseForPopup: state.popup.leaseForPopup
	}
}

export default connect(mapStateToProps)(RadiumHOC);

// ==========================

const comStyles = () => {
	return {
		form: {
			display: "inline-block"
		},
		header: {
			backgroundColor: xWhiteSmoke,
			padding: "5px",
			borderRadius: "5px",
			margin: "0px 0px 15px 0px"
		},
		company: {
			color: xGreyText,
			fontSize: "1.3rem",
			fontWeight: "bold"
		},
		textarea: {
			minHeight: "250px"
		},
		submit: {
			fontWeight:"bold",
			borderRadius:"0px"
		},
		contactinfo:{
			fontWeight:"bold",
			color:"black",
			borderRadius:"0px",
			background:"rgba(69,142,203)",
			margin: "0px"
		},
		phone: {
			borderRadius: "5px 5px 0px 0px"
		},
		email: {
			borderRadius: "0px 0px 5px 5px"
		}
	}
}


const profileStyle = (src) => {
	return {
		profilePic: {
			height: "50px",
			width: "50px",
		    borderRadius:'50%',
		    backgroundImage: "url("+src+")",
		    backgroundPosition: 'center',
		    backgroundSize:'100% auto',
		    backgroundRepeat: 'no-repeat',
			display: "inline-block",
		}
	}
}