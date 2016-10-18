import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xLightBlue} from '../../stylesJS/base_colors'
import {loadForViewMode} from '../../actions/map_actions'

import MapView from '../shared_ui/MapView'
import Search from './Search'
import SearchResults from './SearchResults'
import ViewModeBar from './ViewModeBar'
import Popup from '../shared_ui/Popup'
import PopupImage from '../shared_ui/PopupImage'

class CanvasTenant extends Component {

	componentWillMount(){
		this.loadForView()
	}

	componentDidUpdate(){
		this.loadForView()
	}

	loadForView(){
		if(this.props.viewMode == "sublet"){
			this.props.loadForViewMode(this.props.sublets)
		}else if(this.props.viewMode == "lease"){
			this.props.loadForViewMode(this.props.leases)
		}else if(this.props.viewMode == "both"){
			this.props.loadForViewMode(this.props.leases.concat(this.props.sublets))
		}
	}

	renderPopup(){
		if(this.props.popupToggle){
			return (
				<Popup />
			)
		}
	}

	renderPopupImage(){
		if(this.props.imgToggle){
			return(
				<PopupImage />
			)
		}
	}

	render() {
		return (
			<div id='canvas' style={comStyles(this.props.canvasWidth).canvas}>
				<div id='blueCanvas' style={comStyles(this.props.canvasWidth).blueCanvas}>
					<Search style={comStyles().search} />
					<SearchResults style={comStyles().searchResults} />
				</div>
				<div id='mapView' style={comStyles(this.props.canvasWidth).mapView}>
					<ViewModeBar style={comStyles().ViewModeBar}/>
					<img src='../../../res/images/rentburrow_logo.png' style={comStyles().RentBurrowLogo} />
					{this.renderPopup()}
					{this.renderPopupImage()}
					<MapView />
				</div>
			</div>
		);
	}
}

CanvasTenant.propTypes = {
	canvasWidth: React.PropTypes.number.isRequired,
	sublets: React.PropTypes.array,
	leases: React.PropTypes.array,
	viewMode: React.PropTypes.string.isRequired,
	popupToggle: React.PropTypes.string.isRequired,
	imgToggle: React.PropTypes.bool.isRequired
};

CanvasTenant.defaultProps = {
  canvasWidth: 15
};

const RadiumHOC = Radium(CanvasTenant);

function mapStateToProps(state){
	return {
		viewMode: state.content.viewMode,
		sublets: state.content.sublets,
		leases: state.content.leases,
		popupToggle: state.popup.toggle,
		imgToggle: state.popup.imgForPopup
	}
}

export default connect(mapStateToProps, {loadForViewMode})(RadiumHOC);

// =====================================

const comStyles = (canvasWidth) => {
	let flexGrow = 100-canvasWidth
	return {
		blueCanvas: {
			flexGrow: canvasWidth,
			backgroundColor: xLightBlue,
			height: "100vh",
			display: "inline-block",
			alignItems: "stretch",
			flexDirection: "column"
		},
		mapView: {
			flexGrow: flexGrow,
			height: "100vh",
			display: "inline-block",
			position: "relative"
		},
		RentBurrowLogo: {
			height:"150px",
			width: "auto",
			position: "absolute",
			right: "60px",
			bottom: "20px",
			zIndex: 9
		},
		canvas: {
			display: "flex",
			justifyContent: "center",
			alignItems: "stretch"
		},
		search: {
			height: "auto"
		},
		searchResults: {
			flexGrow: 1
		}
	}
}
