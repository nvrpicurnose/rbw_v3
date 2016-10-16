import React, {Component} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'
import {Glyphicon} from 'react-bootstrap'

import {xMidBlue} from '../../stylesJS/base_colors'

import SearchAdvanced from './SearchAdvanced'

class Search extends Component {

	constructor(){
		super()
		this.state = {
			searchString: "",
			advancedToggle: false
		}
	}

	handleSearch(event){
		this.setState({
			searchString: event.target.value
		})
	}

	triggerAdvanced(){
		this.setState({
			advancedToggle: !this.state.advancedToggle
		})
	}

	renderAdvancedSearch(){
		if(this.state.advancedToggle){
			return (<SearchAdvanced />)
		}
	}

	render() {
		return (
			<div style={comStyles().searchWidget}>
				<div style={comStyles().searchBarDiv}>
					<input className="form-control" type='text' value={this.state.searchString} onChange={this.handleSearch.bind(this)} style={comStyles().searchBar} placeholder="Search" />
					<Glyphicon glyph="glyphicon glyphicon-th-list" onClick={this.triggerAdvanced.bind(this)} style={comStyles().advancedIcon} />
				</div>
				<div style={comStyles().advancedSearchForm}>
					{this.renderAdvancedSearch()}
				</div>
			</div>
		);
	}
}

Search.propTypes = {
};

const RadiumHOC = Radium(Search);

export default connect()(RadiumHOC);

// =======================


const comStyles = () => {
	return {
		searchBarDiv: {
			width: "100%",
			height: "auto",
			display: "flex",
			justifyContent: "flex-start",
			flexDirection: "row",
			marginBottom: "10px"
		},
		searchBar: {
			margin: "10px",
			width: "85%",
			textAlign: "center",
			borderRadius: "10px",
			display: "inline-block",
		},
		advancedIcon: {
			width: "10%",
			display: "inline-block",
			fontSize: "2em",
			textAlign: "center",
			alignSelf: "center",
			color: xMidBlue
		},
		searchWidget: {
			width: '100%',
		},
		advancedSearchForm: {
			width: "100%",
			height: "auto",
		}
	}
}