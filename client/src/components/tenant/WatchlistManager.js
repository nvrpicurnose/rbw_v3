import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

class WatchlistManager extends Component {

	render() {
		return (
			<div>
				Watchlist Manager
			</div>
		);
	}
}

WatchlistManager.propTypes = {
};

const RadiumHOC = Radium(WatchlistManager);

export default connect()(RadiumHOC);