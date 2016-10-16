import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

class PropertyDetail extends Component {

	render() {
		return (
			<div>
				PROPERTY DETAILS + Analytics
			</div>
		);
	}
}

PropertyDetail.propTypes = {
};

const RadiumHOC = Radium(PropertyDetail);

export default connect()(RadiumHOC);