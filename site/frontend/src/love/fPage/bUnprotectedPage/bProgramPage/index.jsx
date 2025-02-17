import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Action } from './extra/State';

// Extra
import APIs from './extra/APIs';

// Component
import ProgramPageComponent from '@/love/cComponent/bUnprotectedComponent/children/bProgramPage'
import Loader from '@/love/cComponent/aGlobalComponent/component/cLoader';


const ProgramPage = ({ ReduxUltimate }) => {
 	// Variables
	const {id} = useParams()
 
  // Redux
	const Redux = {
		state: useSelector((fullState) => fullState.ProgramPageState),
		dispatch: useDispatch(),
		action: Action,
	};

	// API Calls
	const APICalls = {
		ProgramPageAPICall: () => APIs.ProgramPageAPI(Redux, ReduxUltimate, id)
	}	

  // All Render
	// First Render
	useEffect(() => {
		APICalls.ProgramPageAPICall()
	}, [])

	// Extra Render
	// useEffect(() => {
	// 	console.log(Redux.state)
	// }, [Redux.state])

  // JSX
  return (
    <React.Fragment>
			{
				ReduxUltimate.state.RequiredObject?.Loading ? <Loader />
				:
      	<ProgramPageComponent Redux={Redux} ReduxUltimate={ReduxUltimate} />
			}
    </React.Fragment>
  )
}

export default ProgramPage