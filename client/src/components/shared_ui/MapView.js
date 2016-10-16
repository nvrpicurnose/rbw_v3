import React, {Component} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'

class MapView extends Component {

	componentDidMount(){
		const map = new google.maps.Map(document.getElementById('mapview'), {
	        center: {lat: 43.473897, lng: -80.531995},
	        zoom: 14
	    })
	}

	render() {
		return (
			<div id="mapview" style={comStyles().mapview}></div>
		);
	}
}

MapView.propTypes = {
	pins: React.PropTypes.array.isRequired
}

const RadiumHOC = Radium(MapView)

export default connect()(RadiumHOC)


// =====================================
const comStyles = () => {
	return {
		mapview: {
			width: "100%",
			height: "100%"
		}
	}
}