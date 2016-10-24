import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {nextLeaseSearchState} from '../../actions/search_actions'
import {xMidBlue} from '../../stylesJS/base_colors'

class SearchAdvLease extends Component {

	/*
		this.props.nextLeaseSearchState = {
				priceFloor: 450,
				priceCeiling: 800,
				leaseTerms: 12,
				rooms: 1,
				water: true,
				heat: true,
				electric: true,
				ac: true,
				ensuite: false,
				parking: false,
				furnished: false,
			}
	*/

	handleFormChange(paramName, event){
		const nextFormState = this.props.subletSearchParams
		nextFormState[paramName] = event.target.value
		this.props.nextLeaseSearchState(nextFormState)
	}

	render() {
		return (
			<div style={comStyles().searchForm}>
				LEASE SEARCH
			</div>
		);
	}
}

SearchAdvLease.propTypes = {
	leaseSearchParams: React.PropTypes.object.isRequired
};

const RadiumHOC = Radium(SearchAdvLease);

function mapStateToProps(state){
	return {
		leaseSearchParams: state.searchForm.leaseSearchParams
	}
}

export default connect(mapStateToProps, {nextLeaseSearchState})(RadiumHOC);

// ==============================

const comStyles = () => {
	return {
		searchForm: {
			display: "flex",
			justifyContent: "center",
			flexDirection: "row",
			alignItems: "center",
			padding: "10px",
			margin: "15px",
			height: "200px",
			color: "white",
			borderRadius: "8px",
			backgroundColor: xMidBlue,
		}
	}
}