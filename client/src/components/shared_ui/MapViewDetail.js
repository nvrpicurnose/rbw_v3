import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

class MapViewDetail extends Component {

	render() {
		return (
			<div>
				Map View Detail
			</div>
		);
	}
}

MapViewDetail.propTypes = {
};

const RadiumHOC = Radium(MapViewDetail);

export default connect()(RadiumHOC);