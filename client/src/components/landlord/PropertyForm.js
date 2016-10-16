import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

class PropertyForm extends Component {

	render() {
		return (
			<div>
				PROPERTY FORM
			</div>
		);
	}
}

PropertyForm.propTypes = {
};

const RadiumHOC = Radium(PropertyForm);

export default connect()(RadiumHOC);