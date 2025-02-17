import React, { useEffect } from 'react'

// react-router components
import { Outlet, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Action } from './extra/State';

// Extra
import APIs from './extra/APIs';

// Component
import UnprotectedComponent from '@/love/cComponent/bUnprotectedComponent';


const UnprotectedLayout = () => {
	// Redux
	const Redux = {
		state: useSelector((fullState) => fullState.UnprotectedLayoutState),
		dispatch: useDispatch(),
		action: Action,
	};
	
	// Extra Render
	// useEffect(() => {
	// 	console.log(Redux.state)
	// }, [Redux.state])

	// JSX
	return (
		<React.Fragment>
			<UnprotectedComponent>
				<Outlet />
			</UnprotectedComponent>
		</React.Fragment>
  )
}

export default UnprotectedLayout