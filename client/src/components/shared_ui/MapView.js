import React, {Component} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'

import { dropPins, selectPinsFromHere } from '../../actions/map_actions'

class MapView extends Component {

	constructor(){
		super()
		this.state = {
			mapview: null
		}
		this.pins = []
		this.recolorRed.bind(this)
		this.highlightPin.bind(this)
		this.refreshPins.bind(this)
		this.displayPinOnSearchResults.bind(this)
	    this.loadResults.bind(this)
	}

	componentWillMount(){
		google.maps.event.addDomListener(window, "load", this.mountGoogleMap.bind(this))
	}

	componentDidUpdate(){
		if(!this.props.selectedPins){
			this.recolorRed()
		}
	    this.loadResults()
	}

	mountGoogleMap(){
		const mapview = new google.maps.Map(document.getElementById('mapview'), {
	        center: {lat: 43.473897, lng: -80.531995},
	        zoom: 14
	    })
	    this.setState({
	    	mapview: mapview
	    })  
	    this.loadResults()
	}

	loadResults(){
		if(this.props.filteredResults){
			this.refreshPins(this.props.filteredResults)
		}else{
			this.refreshPins(this.props.listOfResults)
		}
	}

	// map the pins on every update
	refreshPins(newPins){
		const self = this
		this.clearPins()
		newPins.forEach((n,i)=>{
			let marker
			if(n.type && n.type=='Apartment'){
              // if apartment, use this pin
              marker = new google.maps.Marker({
                  position: new google.maps.LatLng(n.coords[1], n.coords[0]),
                  //map: self.state.mapview,
                  icon: "../../../res/images/orange-dot.png",
                  prop_type: "Apartment"
              });
            }else{
              // otherwise create a regular marker for each pin
              marker = new google.maps.Marker({
                  position: new google.maps.LatLng(n.coords[1], n.coords[0]),
                  //map: self.state.mapview,
                  icon: "../../../res/images/red-dot.png"
              });
            }
            // action on click of pin
            google.maps.event.addListener(marker, 'click', function(e){
              // set the clicked post as a blue marker
              self.highlightPin(marker)
              self.displayPinOnSearchResults(n)
            });
            self.pins.push(marker)
		})
		self.pins.forEach((pin)=>{
			pin.setMap(self.state.mapview)
		})
	}

	clearPins(){
		if(this.pins){
			this.pins.forEach((pin)=>{
				pin.setMap(null)
			})
			this.pins.length = 0
		}
	}

	highlightPin(marker){
		this.recolorRed()
		// and color the desired marker blue
	    for(let m = 0; m<this.pins.length; m++){
	        if(this.pins[m] == marker){
	          console.log("Found it!")
	          this.pins[m].setIcon("../../../res/images/blue-dot.png")
	        }
	    }
	    // pan the map view to blue marker
	    this.state.mapview.panTo(marker.position);
	}

	recolorRed(){
		if(this.pins){
			for(let m = 0; m<this.pins.length; m++){
		        if(this.pins[m].prop_type=='Apartment'){
		          this.pins[m].setIcon("../../../res/images/orange-dot.png");
		        }else{
		          this.pins[m].setIcon("../../../res/images/red-dot.png");
		        }
		    }
		}
	}

	displayPinOnSearchResults(match){
		const dispayThesePins = this.props.listOfResults.filter((pin)=>{
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
	listOfResults: React.PropTypes.array.isRequired,
	filteredResults: React.PropTypes.array,
	filteredPins: React.PropTypes.array,
	selectedPins: React.PropTypes.array
}

const RadiumHOC = Radium(MapView)

function mapStateToProps(state){
	return {
		listOfResults: state.content.listOfResults,
		filteredResults: state.content.filteredResults,
		filteredPins: state.content.filteredPins,
		selectedPins: state.content.selectedPins
	}
}

export default connect(mapStateToProps, {dropPins, selectPinsFromHere})(RadiumHOC)


// =====================================
const comStyles = () => {
	return {
		mapview: {
			width: "100%",
			height: "100%"
		}
	}
}
