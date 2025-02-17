import React, { useEffect } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Action } from './extra/State';

// Extra
import APIs from './extra/APIs';

// Children
import ProfileRetrieveComponent from '@/love/cComponent/fTopbarComponent/children/aProfileRetrieveComponent';
import Loader from '@/love/cComponent/aGlobalComponent/component/cLoader';


const ProfileRetrievePage = ({ ReduxUltimate }) => {
  // Redux
	const Redux = {
		state: useSelector((fullState) => fullState.ProfileRetrievePageState),
		dispatch: useDispatch(),
		action: Action,
	};

	// API Calls
	const APICalls = {
		ProfileRetrieveAPICall: () => APIs.ProfileRetrieveAPI(Redux, ReduxUltimate)
	}	

  // All Render
	// First Render
	useEffect(() => {
		APICalls.ProfileRetrieveAPICall()
	}, [])

	// Extra Render
	useEffect(() => {
		console.log(Redux.state)
	}, [Redux.state])

  // JSX
  return (
    <React.Fragment>
			{ReduxUltimate.state.RequiredObject?.Loading ? <Loader /> :
				<ProfileRetrieveComponent Redux={Redux} />			
			}
    </React.Fragment>
  )
}

export default ProfileRetrievePage