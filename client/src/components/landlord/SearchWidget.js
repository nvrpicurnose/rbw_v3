import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import PropertyPreview from './PropertyPreview'

class SearchWidget extends Component {

	constructor(){
		super()
		this.state = {
			searchString: "",
			searchResults: []
		}
		this.handleSearch.bind(this)
	}

	componentWillMount(){
		this.setState({
			searchResults: this.props.properties
		})
	}

	handleSearch(event){
		this.setState({
			searchString: event.target.value
		})
		let results = this.props.properties.filter((prop)=>{
			if(prop.address.indexOf(this.state.searchString) >= 0 || prop.building_name.indexOf(this.state.searchString) >= 0){
				return prop
			}
		})
		if(event.target.value.length <= 1){
			this.setState({
				searchResults: this.props.properties
			})
		}else{
			this.setState({
				searchResults: results
			})
		}
	}

	renderPreviews(prop){
		return (
			<PropertyPreview key={prop._id} prop={prop} />
		)
	}

	render() {
		return (
			<div style={comStyles().searchWidget}>

				<div style={comStyles().searchBarDiv}>
					<input className="form-control" type='text' value={this.state.searchString} onChange={this.handleSearch.bind(this)} style={comStyles().searchBar} placeholder="Search" />
				</div>

				<div id='searchResults' style={comStyles().searchResults}>
					{this.state.searchResults.map(this.renderPreviews)}
				</div>
			</div>
		);
	}
}

SearchWidget.propTypes = {
	properties: React.PropTypes.array.isRequired
};

const RadiumHOC = Radium(SearchWidget);

function mapStateToProps(state){
	console.log(state.landlord)
	return {
		properties: state.landlord.properties
	}
}

export default connect(mapStateToProps)(RadiumHOC);


// ====================

const comStyles = () => {
	return {
		searchResults: {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "center"
		},
		searchBarDiv: {
			width: "100%",
			height: "auto",
			display: "flex",
			justifyContent: "center",
			marginBottom: "20px"
		},
		searchBar: {
			margin: "10px",
			width: '20%',
			textAlign: "center",
			borderRadius: "10px"
		},
		searchWidget: {
			width: '100%',
		}
	}
}