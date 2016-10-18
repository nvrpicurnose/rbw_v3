import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {setViewMode} from '../../actions/map_actions'
import {xMidBlue, xDeepBlue} from '../../stylesJS/base_colors'

class ViewModeBar extends Component {

	renderIcon(mode){
		if(this.props.viewMode == mode){
			return <img src='../../../res/images/red-dot.png' style={comStyles().icon} />
		}
	}

	render() {
		return (
			<div style={comStyles().ViewModeBar}>
				<button className='btn' style={comStyles(this.props.viewMode).sublet} onClick={()=>this.props.setViewMode("sublet")}>
					{this.renderIcon('sublet')} &nbsp;
					SUBLETS
				</button>
				<button className='btn' style={comStyles(this.props.viewMode).lease} onClick={()=>this.props.setViewMode("lease")}>
					{this.renderIcon('lease')} &nbsp;
					LEASES
				</button>
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
		ViewModeBar: {
			zIndex: "10",
			position: "absolute",
			width: "auto",
			right: "20px",
			top: "20px"
		},
		sublet: {
			backgroundColor: subletColor,
			borderRadius: "0px",
			width: "12%",
			minWidth: "120px",
			fontSize: "1.2rem",
			fontWeight: "bold",
			color: "white",
		},
		lease: {
			backgroundColor: leaseColor,
			borderRadius: "0px",
			width: "12%",
			minWidth: "120px",
			fontSize: "1.2rem",
			fontWeight: "bold",
			color: "white",
		},
		icon: {
			display:"inline-block",
			height:"15px",
			width:"auto",
		}
	}
}