import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import {xLightBlue} from '../../stylesJS/base_colors'

import {loadForViewMode} from '../../actions/map_actions'
import { saveSubletsToRedux, saveLeasesToRedux } from '../../actions/database_actions'
import {setFBProfile} from '../../actions/facebook_actions'

import { extractAndSaveFacebookPostsToDB, grabFBProfile } from '../../api/fbExtractor'
import { getSubletsFromDB, getLeasesFromDB } from '../../api/databaseManager'

import MapView from '../shared_ui/MapView'
import Search from './Search'
import SearchResults from './SearchResults'
import ViewModeBar from './ViewModeBar'
import Popup from '../shared_ui/Popup'
import PopupImage from '../shared_ui/PopupImage'

class CanvasTenant extends Component {

	constructor(){
		super()
		this.state = {
			canvasWidth: 15,
			FB: null
		}
	}

	componentWillMount(){
		const self = this
		window.fbAsyncInit = function() {
            FB.init({
              appId      : '588285624658122',
              xfbml      : true,
              version    : 'v2.8'
            });
            FB.AppEvents.logPageView();
            self.setState({
            	FB: FB
            })
            self.getDataFromDatabase().bind(self)
          };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
	}

	componentDidUpdate(){
		this.loadForView()
	}

	loginWithFacebook(){
		const self = this
		this.state.FB.login(function(response) {
			   	if (response.status === 'connected') {
				    // get access token
				    const accessToken = response.authResponse.accessToken
				    // get profile info
				    grabFBProfile().then((profile)=>{
				    	profile = {...profile, accessToken}
					    // Save the FB user to Redux State
						self.props.setFBProfile(profile)
					    // Extract and Save Facebook Posts To DB
					    // Also save the fb user to db and accessToken in backend
						extractAndSaveFacebookPostsToDB(self.props.city, profile)
				    })
				} else if (response.status === 'not_authorized') {
				    // The person is logged into Facebook, but not your app.
				    console.log('already logged in');
				} else {
				    // The person is not logged into Facebook, so we're not sure if
				    // they are logged into this app or not.
				    console.log('not logged in');
				}
			}, {scope: 'public_profile,email'}
		)
	}

	getDataFromDatabase(){
		getSubletsFromDB(this.props.city).then((sublets)=>{
			this.props.saveSubletsToRedux(sublets) 
		})
		getLeasesFromDB(this.props.city).then((leases)=>{
			this.props.saveLeasesToRedux(leases)
		})
	}

	renderLeftSide(){
		if(this.props.fbUser){
			return(
				<div>
					<Search style={comStyles().search} />
					<SearchResults style={comStyles().searchResults} />
				</div>
			)
		}else{
			return (
				<button className='btn btn-primary btn-block' onClick={this.loginWithFacebook.bind(this)} style={comStyles().login}>
					<img src='../../res/images/facebook.png' style={comStyles().facebookLoginImg} />
					<br/>
					<span id='facebookLoginText' class='col-md-12'>SIGN IN WITH FACEBOOK</span> 
				</button>
			)
		}
	}

	loadForView(){
		if(this.props.viewMode == "sublet"){
			this.props.loadForViewMode(this.props.sublets)
		}else if(this.props.viewMode == "lease"){
			this.props.loadForViewMode(this.props.leases)
		}else if(this.props.viewMode == "both"){
			this.props.loadForViewMode(this.props.leases.concat(this.props.sublets))
		}
	}

	renderPopup(){
		if(this.props.popupToggle){
			return (
				<Popup />
			)
		}
	}

	renderPopupImage(){
		if(this.props.imgToggle){
			return(
				<PopupImage />
			)
		}
	}

	render() {
		// if(this.state.FB){
			return (
				<div id='canvas' style={comStyles(this.state.canvasWidth).canvas}>
					<div id='blueCanvas' style={comStyles(this.state.canvasWidth).blueCanvas}>
						{this.renderLeftSide()}
					</div>
					<div id='mapView' style={comStyles(this.state.canvasWidth).mapView}>
						<ViewModeBar style={comStyles().ViewModeBar}/>
						<img src='../../../res/images/rentburrow_logo.png' style={comStyles().RentBurrowLogo} />
						{this.renderPopup()}
						{this.renderPopupImage()}
						<MapView />
					</div>
				</div>
			)
		// }else{
		// 	return (
		// 		<div>Loading</div>
		// 	)
		// }
	}
}

CanvasTenant.propTypes = {
	sublets: React.PropTypes.array,
	leases: React.PropTypes.array,
	viewMode: React.PropTypes.string.isRequired,
	popupToggle: React.PropTypes.string,
	imgToggle: React.PropTypes.bool,
	city: React.PropTypes.string.isRequired,
	fbUser: React.PropTypes.object
}


const RadiumHOC = Radium(CanvasTenant);

function mapStateToProps(state){
	return {
		viewMode: state.content.viewMode,
		sublets: state.content.sublets,
		leases: state.content.leases,
		popupToggle: state.popup.toggle,
		imgToggle: state.popup.imgForPopup,
		city: state.tenant.city,
		fbUser: state.tenant.fbUser
	}
}

export default connect(mapStateToProps, {loadForViewMode, setFBProfile, saveSubletsToRedux, saveLeasesToRedux })(RadiumHOC);

// =====================================

const comStyles = (canvasWidth) => {
	let mapWidth = 100-canvasWidth
	return {
		login: {
			minHeight: "100%",
			minWidth: "100%",
			margin: "0px",
			borderRadius: "0px"
		},
		facebookLoginImg: {
			width:"50%",
			height:"auto",
			margin:"0 auto"
		},
		blueCanvas: {
			flexGrow: 15,
			backgroundColor: xLightBlue,
			height: "100vh",
			display: "inline-block",
			alignItems: "stretch",
			flexDirection: "column",
			maxWidth: "30vw",
			minWidth: "500px"
		},
		mapView: {
			flexGrow: 85,
			height: "100vh",
			display: "inline-block",
			position: "relative"
		},
		RentBurrowLogo: {
			height:"150px",
			width: "auto",
			position: "absolute",
			right: "60px",
			bottom: "20px",
			zIndex: 9
		},
		canvas: {
			display: "flex",
			justifyContent: "center",
			alignItems: "stretch"
		},
		search: {
			height: "auto"
		},
		searchResults: {
			flexGrow: 1
		}
	}
}
