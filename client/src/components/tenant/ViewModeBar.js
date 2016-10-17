import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {setViewMode} from '../../actions/map_actions'
import {xMidBlue, xDeepBlue} from '../../stylesJS/base_colors'

class ViewModeBar extends Component {

	render() {
		return (
			<div>
				<button className='btn' style={comStyles(this.props.viewMode).sublet} onClick={()=>this.props.setViewMode("sublet")}>SUBLETS</button>
				<button className='btn' style={comStyles(this.props.viewMode).lease} onClick={()=>this.props.setViewMode("lease")}>LEASES</button>
			</div>
		);
	}
}

ViewModeBar.propTypes = {
	viewMode: React.PropTypes.string.isRequired
};

const RadiumHOC = Radium(ViewModeBar);

function mapStateToDispatch(state){
	return {
		viewMode: state.content.viewMode
	}
}

export default connect(mapStateToDispatch, {setViewMode})(RadiumHOC);


// ============================

const comStyles = (viewMode) => {
	let subletColor
	let leaseColor
	if(viewMode == "sublet"){
		subletColor = xDeepBlue
		leaseColor = xMidBlue
	}else if(viewMode == "lease"){
		subletColor = xMidBlue
		leaseColor = xDeepBlue
	}else if(viewMode == "both"){
		subletColor = xDeepBlue
		leaseColor = xDeepBlue
	}
	return {
		sublet: {
			backgroundColor: subletColor,
			borderRadius: "0px",
			width: "10%",
			fontSize: "1.2rem",
			fontWeight: "bold",
			color: "white"
		},
		lease: {
			backgroundColor: leaseColor,
			borderRadius: "0px",
			width: "10%",
			fontSize: "1.2rem",
			fontWeight: "bold",
			color: "white"
		}
	}
}