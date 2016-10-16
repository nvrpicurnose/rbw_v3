import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

class LogoSet extends Component {

	render() {
		return (
			<div style={comStyles().logoSet}>
				<div className='img-circle' style={logoStyle(this.props.companyLogo).logo}></div>
				<h2 style={comStyles().name}>{this.props.companyName}</h2>
			</div>
		);
	}
}

LogoSet.propTypes = {
	companyName: React.PropTypes.string.isRequired,
	companyLogo: React.PropTypes.string.isRequired
};

const RadiumHOC = Radium(LogoSet);

function mapStateToProps(state){
	return {
		companyName: state.landlord.landlord.company_name,
		companyLogo: state.landlord.landlord.company_logo
	}
}

export default connect(mapStateToProps)(RadiumHOC);


// ===========================

const comStyles = () => {
	return {
		logoSet: {
			width: "100%",
			display: "flex",
			justifyContent: "center",
			padding: "10px",
			marginBottom: "50px"
		},
		name: {
			display: "inline-block",
			alignSelf: "center",
			margin: "10px"
		}
	} 
}

const logoStyle = (src) => {
	return {
		logo: {
			width:'150px',
		    height:'150px',
		    borderRadius:'50%',
		    backgroundImage: "url("+src+")",
		    backgroundPosition: 'center',
		    backgroundSize:'100% auto',
		    backgroundRepeat: 'no-repeat',
			display: "inline-block",
		}
	}
}