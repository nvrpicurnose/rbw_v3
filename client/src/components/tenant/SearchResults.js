import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import { Scrollbars } from 'react-custom-scrollbars';

import { backToPins } from '../../actions/map_actions'

import SubletCard from '../shared_ui/SubletCard'
import LeaseCard from '../shared_ui/LeaseCard'

class SearchResults extends Component {

	renderBackButton(){
		if(this.props.selectedPins){
			return (
				<button className='btn btn-info btn-block' onClick={this.props.backToPins}>Back</button>
			)
		}
	}

	renderList(){
		if(this.props.selectedPins){
			console.log("SelectedPins")
			return this.props.selectedPins.map(this.renderCards)
		}else if(this.props.filteredResults){
			console.log("filteredResults")
			return this.props.filteredResults.map(this.renderCards)
		}else{
			console.log("listOfResults")
			return this.props.listOfResults.map(this.renderCards)
		}
	}

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
				{this.renderBackButton()}
				<div style={comStyles().scroll}>
					{this.renderList()}
				</div>
			</div>
		);
	}
}

SearchResults.propTypes = {
	listOfResults: React.PropTypes.array.isRequired,
	filteredResults: React.PropTypes.array,
	selectedPins: React.PropTypes.array
};

const RadiumHOC = Radium(SearchResults);

function mapStateToProps(state){
	return {
		listOfResults: state.content.listOfResults,
		filteredResults: state.content.filteredResults,
		selectedPins: state.content.selectedPins
	}
}

export default connect(mapStateToProps, {backToPins})(RadiumHOC);


// ===============================

const comStyles = () => {
	return {
		list: {
			width: "100%",
			height: "100%",
		},
		scroll: {
			overflowY: "scroll",
			height: "90vh",
			margin: "5px 0px 15px 0px"
		}
	}
}