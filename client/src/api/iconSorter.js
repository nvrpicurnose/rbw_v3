import React from 'react';

export const sortIcons = (sublet) => {
	const iconArray = []
	if(sublet.rooms_left){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-person'></i> &nbsp;
				{sublet.rooms_left} Rooms
			</div>
		)
	}
	if(sublet.ensuite_incl){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-cube'></i> &nbsp;
				Ensuite Bath
			</div>
		)
	}
	if(sublet.utils_incl){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-outlet'></i> &nbsp;
				Utilities
			</div>
		)
	}
	if(sublet.phone){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-ios-telephone'></i> &nbsp;
				{sublet.phone}
			</div>
		)
	}
	if(sublet.female_only){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-female'></i> &nbsp;
				Female Only
			</div>
		)
	}
	if(sublet.pet){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-ios-paw'></i> &nbsp;
				Pet Friendly
			</div>
		)
	}
	return iconArray
}

const iconStyle = {
	margin: "2%"
}