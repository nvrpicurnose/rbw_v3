import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xLightBlue, xMidBlue} from '../../stylesJS/base_colors'

class SearchAdvSublet extends Component {

	constructor(){
		super()
		this.state = {
			priceFloor: 350,
			priceCeiling: 750,
			rooms: 1,
			utils: false,
			ensuite: false,
			femaleOnly: false,
			semester: null
		}
	}

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
		this.setState({
			semester: semester
		})
	}

	render() {
		return (
			<div style={comStyles().searchForm}>
				<div style={comStyles().price}>
					${}
				</div>
			</div>
		);
	}
}

SearchAdvSublet.propTypes = {
};

const RadiumHOC = Radium(SearchAdvSublet);

export default connect()(RadiumHOC);

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