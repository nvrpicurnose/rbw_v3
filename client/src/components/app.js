import React, { Component } from 'react';
import Radium from 'radium'
import Header from './misc/header';

import { xMidBlue } from '../stylesJS/base_colors'

export default class App extends Component {
  render() {
    return (
      <div style={comStyles().app}>
      	{/*<Header />*/}
      	{this.props.children}
      </div>
    );
  }
}

const RadiumHOC = Radium(App);

const comStyles = () => {
	return {
		app: {
			width: "100%",
			height: "100%",
			margin: "0",
			left: "0",
			top: "0",
			position: "fixed"
		}
	} 
}