import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xLightBlue} from '../../stylesJS/base_colors'
import {loadForViewMode} from '../../actions/map_actions'

import MapView from '../shared_ui/MapView'
import Search from './Search'
import SearchResults from './SearchResults'
import ViewModeBar from './ViewModeBar'

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

	render() {
		return (
			<div id='canvas' style={comStyles(this.props.canvasWidth).canvas}>
				<div id='blueCanvas' style={comStyles(this.props.canvasWidth).blueCanvas}>
					<Search style={comStyles().search} />
					<SearchResults style={comStyles().searchResults} />
				</div>
				<div id='mapView' style={comStyles(this.props.canvasWidth).mapView}>
					<ViewModeBar style={comStyles().ViewModeBar}/>
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
	viewMode: React.PropTypes.string.isRequired
};

CanvasTenant.defaultProps = {
  canvasWidth: 25
};

const RadiumHOC = Radium(CanvasTenant);

function mapStateToProps(state){
	return {
		viewMode: state.content.viewMode,
		sublets: state.content.sublets,
		leases: state.content.leases
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
		ViewModeBar: {
			marginLeft: "100px",
			border: "3px solid red"
			/*zIndex: "10",
			position: "absolute",
			right: "20px",
			top: "20px"*/
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