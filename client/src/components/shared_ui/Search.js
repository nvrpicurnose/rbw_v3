import React, {Component} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'
import {Glyphicon} from 'react-bootstrap'

import {xMidBlue} from '../../stylesJS/base_colors'
import {filterStringSearch, toggleAdvancedSearch} from '../../actions/map_actions'

import SearchAdvSublet from '../tenant/SearchAdvSublet'
import SearchAdvLease from '../landlord/SearchAdvLease'

class Search extends Component {

	constructor(){
		super()
		this.state = {
			searchString: ""
		}
	}

	handleSearch(event){
		this.setState({
			searchString: event.target.value
		})
		this.props.filterStringSearch(event.target.value, this.props.listOfResults)
	}

	triggerAdvanced(){
		this.props.toggleAdvancedSearch()
	}

	renderAdvancedSearch(){
		if(this.props.advancedSearchToggle && this.props.viewMode == "sublet"){
			return (<SearchAdvSublet />)
		}else if(this.props.advancedSearchToggle && this.props.viewMode == 'lease'){
			return (<SearchAdvLease />)
		}
	}

	render() {
		return (
			<div style={comStyles().searchWidget}>
				<div style={comStyles().searchBarDiv}>
					<input className="form-control" type='text' value={this.state.searchString} onChange={this.handleSearch.bind(this)} style={comStyles().searchBar} placeholder="Search" />
					<Glyphicon glyph="glyphicon glyphicon-tasks" onClick={this.triggerAdvanced.bind(this)} style={comStyles().advancedIcon} />
				</div>
				<div style={comStyles().advancedSearchForm}>
					{this.renderAdvancedSearch()}
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	listOfResults: React.PropTypes.array.isRequired,
	viewMode: React.PropTypes.string.isRequired,
	advancedSearchToggle: React.PropTypes.bool
};

const RadiumHOC = Radium(Search);

function mapStateToProps(state){
	return {
		listOfResults: state.content.listOfResults,
		viewMode: state.content.viewMode,
		advancedSearchToggle: state.content.advancedSearchToggle
	}
}

export default connect(mapStateToProps, {filterStringSearch, toggleAdvancedSearch})(RadiumHOC);

// =======================


const comStyles = () => {
	return {
		searchBarDiv: {
			width: "100%",
			height: "auto",
			display: "flex",
			justifyContent: "flex-start",
			flexDirection: "row",
			marginBottom: "5px"
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