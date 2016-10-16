import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

class LeaseCard extends Component {

	render() {
		return (
			<div>
				Lease Card
			</div>
		);
	}
}

LeaseCard.propTypes = {
};

const RadiumHOC = Radium(LeaseCard);

export default connect()(RadiumHOC);