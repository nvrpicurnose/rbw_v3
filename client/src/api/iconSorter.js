import React from 'react';

export const sortIconsSublet = (sublet) => {
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
	if(sublet.semester){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-calendar'></i> &nbsp;
				{sublet.semester.charAt(0).toUpperCase() + sublet.semester.slice(1)}
			</div>
		)
	}
	return iconArray
}

const iconStyle = {
	margin: "2%",
	display: "inline-block"
}

const leaseText = {
	fontSize: "1.3rem",
	display: "inline-block"
}

export const sortIconsLease = (lease) => {
	const iconArray = []
	if(lease.utils_list.water){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-waterdrop'></i> &nbsp;
				<span style={leaseText}>Hydro</span>
			</div>
		)
	}
	if(lease.utils_list.heat){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-flame'></i> &nbsp;
				<span style={leaseText}>Heat</span>
			</div>
		)
	}
	if(lease.utils_list.electric){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-flash'></i> &nbsp;
				<span style={leaseText}>Electricity</span>
			</div>
		)
	}
	if(lease.utils_list.furnished){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-home'></i> &nbsp;
				<span style={leaseText}>Furniture</span>
			</div>
		)
	}
	if(lease.utils_list.parking || lease.utils_list.free_parking){
		if(lease.utils_list.parking && !lease.utils_list.free_parking){
			iconArray.push(
				<div style={iconStyle}>
					<i className='ion-model-s'></i> &nbsp;
					<span style={leaseText}>Parking</span>
				</div>
			)
		}else if(lease.utils_list.parking && lease.utils_list.free_parking){
			iconArray.push(
				<div style={iconStyle}>
					<i className='ion-model-s'></i> &nbsp;
					<span style={leaseText}>Free Parking</span>
				</div>
			)
		}
	}
	if(lease.utils_list.internet){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-wifi'></i> &nbsp;
				<span style={leaseText}>Internet</span>
			</div>
		)
	}
	if(lease.utils_list.ac){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-ios-snowy'></i> &nbsp;
				<span style={leaseText}>A/C</span>
			</div>
		)
	}
	if(lease.utils_list.laundry){
		iconArray.push(
			<div style={iconStyle}>
				<i className='ion-tshirt'></i> &nbsp;
				<span style={leaseText}>Laundry</span>
			</div>
		)
	}
	return iconArray
}