import React, { useEffect } from 'react'

// react-router components
import { Outlet, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Action } from './extra/State';

// Extra
import APIs from './extra/APIs';

// Component
import GlobalComponent from '@/love/cComponent/aGlobalComponent';


const GlobalLayout = () => {
	// Variables
	const navigate = useNavigate()

  // Redux
	const Redux = {
		state: useSelector((fullState) => fullState.GlobalLayoutState),
		dispatch: useDispatch(),
		action: Action,
	};

	// API Calls
	const APICalls = {
		ProfileRetrieveAPICall: () => APIs.ProfileRetrieveAPI(Redux),
		LogoutAPICall: () => APIs.LogoutAPI(navigate, Redux),
	}

	// All Renders
	// First Render
	useEffect(() => {
		APICalls.ProfileRetrieveAPICall()
	}, [])
		
	// Second Render
	useEffect(() => {
		Redux.state.ExtraObject?.Halchal && APICalls.ProfileRetrieveAPICall()
	}, [Redux.state.ExtraObject])
		
	// Extra Render
	// useEffect(() => {
	// 	console.log(Redux.state)
	// }, [Redux.state])

  // JSX
  return (
		<React.Fragment>
			<GlobalComponent Redux={Redux} LogoutAPICall={APICalls.LogoutAPICall} >
				<Outlet />
			</GlobalComponent>
		</React.Fragment>
  )
}

export default GlobalLayout