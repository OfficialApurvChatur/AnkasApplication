import React, { useEffect } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Action } from './extra/State';

// Extra
import APIs from './extra/APIs';
import Function from './extra/Function';

// Component
import ProfileUpdateComponent from '@/love/cComponent/fTopbarComponent/children/bProfileUpdateComponent'

// Other
import submitFormObject from '@/love/dFunction/cSubmitFormObject';
import validateFormObject from '@/love/dFunction/bValidateFormObject';
import EventHandler from './extra/EventHandler';
import Loader from '@/love/cComponent/aGlobalComponent/component/cLoader';


const ProfileUpdatePage = ({ ReduxUltimate }) => {
  // Redux
	const Redux = {
		state: useSelector((fullState) => fullState.ProfileUpdatePageState),
		dispatch: useDispatch(),
		action: Action,
	};

	// API Calls
	const APICalls = {
		ProfileRetrieveAPICall: () => APIs.ProfileRetrieveAPI(Redux, ReduxUltimate),
		ProfileUpdateAPICall: () => APIs.ProfileUpdateAPI(Redux, ReduxUltimate)
	}	

  // All Render
	// First Render
	useEffect(() => {
		APICalls.ProfileRetrieveAPICall()
	}, [])

	// Submit Render
	useEffect(() => {
		submitFormObject(Redux, APICalls.ProfileUpdateAPICall)
	}, [Redux.state.FormObject.FormError])
	
	// Extra Render
	useEffect(() => {
		console.log(Redux.state)
	}, [Redux.state])

  // JSX
  return (
    <React.Fragment>
			{ReduxUltimate.state.RequiredObject?.Loading ? <Loader />:
				<ProfileUpdateComponent Redux={Redux} EventHandler={EventHandler} OnClick={event => validateFormObject(event, Redux, Function.validateFormValues)} />
			}
    </React.Fragment>
  )
}

export default ProfileUpdatePage