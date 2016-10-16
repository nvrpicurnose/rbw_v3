import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import { Scrollbars } from 'react-custom-scrollbars';

import SubletCard from '../shared_ui/SubletCard'
import LeaseCard from '../shared_ui/LeaseCard'

class SearchResults extends Component {

	renderCards(card){
		if(card.userid){
			return (<SubletCard key={card._id} sublet={card} />)
		}else if(card.company){
			return (<LeaseCard key={card._id} lease={card} />)
		}
	}

	render() {
		return (
			<div id='SearchResults' style={comStyles().list}>
				<Scrollbars>
					{this.props.filteredResults.map(this.renderCards.bind(this))}
				</Scrollbars>
			</div>
		);
	}
}

SearchResults.propTypes = {
	filteredResults: React.PropTypes.array.isRequired
};

const RadiumHOC = Radium(SearchResults);

function mapStateToProps(state){
	return {
		filteredResults: state.mapview.filteredResults
	}
}

export default connect(mapStateToProps)(RadiumHOC);


// ===============================

const comStyles = () => {
	return {
		list: {
			width: "100%",
			height: "100%",
			padding: "0px 0px 60px 0px",
		}
	}
}