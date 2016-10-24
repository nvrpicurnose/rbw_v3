import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {nextSubletSearchState} from '../../actions/search_actions'
import {xLightBlue, xMidBlue} from '../../stylesJS/base_colors'

class SearchAdvSublet extends Component {

	/*
		this.props.subletSearchParams = {
				priceFloor: 350,
				priceCeiling: 750,
				rooms: 1,
				utils: false,
				ensuite: false,
				femaleOnly: false,
				semester: null
			}
	*/

	componentDidMount(){
		const now = new Date()
		const month = now.getMonth()
		let semester
		if(month > 1 && month < 5){
			semester = "spring"
		}else if(month > 6 && month < 10){
			semester = "fall"
		}else{
			semester = "winter"
		}
		const nextFormState = this.props.subletSearchParams
		nextFormState.semester = semester
		this.props.nextSubletSearchState(nextFormState)
	}

	handleFormChange(paramName, event){
		const nextFormState = this.props.subletSearchParams
		nextFormState[paramName] = event.target.value
		this.props.nextSubletSearchState(nextFormState)
	}

	render() {
		return (
			<div style={comStyles().searchForm}>
				<div style={comStyles().price}>
					${}
				</div>
				<label className="toggle">
				   <input type="checkbox" />
				   <div className="track">
				     <div className="handle"></div>
				   </div>
				</label>
			</div>
		);
	}
}

SearchAdvSublet.propTypes = {
	subletSearchParams: React.PropTypes.object.isRequired
};

const RadiumHOC = Radium(SearchAdvSublet);

function mapStateToProps(state){
	return {
		subletSearchParams: state.searchForm.subletSearchParams
	}
}

export default connect(mapStateToProps, {nextSubletSearchState})(RadiumHOC);

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