import React, {Component} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'

import { selectPinsFromHere } from '../../actions/map_actions'

class MapView extends Component {

	constructor(){
		super()
		this.state = {
			mapview: null,
			filteredPins: []
		}
		this.recolorRed.bind(this)
		this.highlightPin.bind(this)
		this.refreshPins.bind(this)
		this.displayPinOnSearchResults.bind(this)
	}

	componentWillMount(){
		google.maps.event.addDomListener(window, "load", this.mountGoogleMap.bind(this))
	}

	mountGoogleMap(){
		const mapview = new google.maps.Map(document.getElementById('mapview'), {
	        center: {lat: 43.473897, lng: -80.531995},
	        zoom: 14
	    })
	    this.setState({
	    	mapview: mapview
	    })  
		this.filterPins(null)
	}

	filterPins(config){
		const filtered = this.props.filteredResults.filter((pin)=>{
			return pin
		})
		this.refreshPins(filtered)
	}

	// map the pins on every update
	refreshPins(newPins){
		const self = this
		this.setState({
			filteredPins: []
		})
		newPins.forEach((n,i)=>{
			let marker
			if(n.type && n.type=='Apartment'){
              // if apartment, use this pin
              marker = new google.maps.Marker({
                  position: new google.maps.LatLng(n.coords[1], n.coords[0]),
                  map: self.state.mapview,
                  //icon: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
                  icon: "../../../res/images/orange-dot.png",
                  prop_type: "Apartment"
              });
            }else{
              // otherwise create a regular marker for each pin
              marker = new google.maps.Marker({
                  position: new google.maps.LatLng(n.coords[1], n.coords[0]),
                  map: self.state.mapview,
                  icon: "../../../res/images/red-dot.png"
                  //icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              });
            }
            // place it on the map
            marker.setMap(self.state.mapview)
            self.setState({
            	filteredPins: self.state.filteredPins.concat([marker])
            })
            // action on click of pin
            google.maps.event.addListener(marker, 'click', function(e){
              // set the clicked post as a blue marker
              self.highlightPin(marker)
              self.displayPinOnSearchResults(n)
            });
		})
	}

	highlightPin(marker){
		this.recolorRed()
		// and color the desired marker blue
	    for(let m = 0; m<this.state.filteredPins.length; m++){
	        if(this.state.filteredPins[m] == marker){
	          this.state.filteredPins[m].setIcon("../../../res/images/blue-dot.png");
	        }
	    }
	    // pan the map view to blue marker
	    this.state.mapview.panTo(marker.position);
	}

	recolorRed(){
		for(let m = 0; m<this.state.filteredPins.length; m++){
	        if(this.state.filteredPins[m].prop_type=='Apartment'){
	          this.state.filteredPins[m].setIcon("../../../res/images/orange-dot.png");
	        }else{
	          this.state.filteredPins[m].setIcon("../../../res/images/red-dot.png");
	        }
	    }
	}

	displayPinOnSearchResults(match){
		const dispayThesePins = this.props.filteredResults.filter((pin)=>{
			return pin.coords[0] == match.coords[0] && pin.coords[1] == match.coords[1]
		})
		this.props.selectPinsFromHere(dispayThesePins)
	}

	render() {
		return (
			<div id="mapview" style={comStyles().mapview}></div>
		);
	}
}

MapView.propTypes = {
	filteredResults: React.PropTypes.array.isRequired
}

const RadiumHOC = Radium(MapView)

function mapStateToProps(state){
	return {
		filteredResults: state.content.filteredResults
	}
}

export default connect(mapStateToProps, {selectPinsFromHere})(RadiumHOC)


// =====================================
const comStyles = () => {
	return {
		mapview: {
			width: "100%",
			height: "100%"
		}
	}
}
