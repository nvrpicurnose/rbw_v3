import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

class MapViewPicture extends Component {

	render() {
		return (
			<div>
				Map View Picture
			</div>
		);
	}
}

MapViewPicture.propTypes = {
};

const RadiumHOC = Radium(MapViewPicture);

export default connect()(RadiumHOC);