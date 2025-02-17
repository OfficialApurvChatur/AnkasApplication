import React, { useEffect } from 'react'

// react-router components
import { useNavigate, useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Action } from './extra/State';

// Extra
import Data from './extra/Data';
import APIs from './extra/APIs';

// Other
import submitFormObject from '@/love/dFunction/cSubmitFormObject';

// Conponent
import AuthFormComponent from '@/love/cComponent/dAuthenticatedComponent/children/aAuthFormComponent';
import { useToast } from '@/components/ui/use-toast';


const ResetPasswordPage = ({ ReduxUltimate }) => {
 	// Variables
	const { toast } = useToast()
	const navigate = useNavigate()
	const {token} = useParams()

	// Redux
	const Redux = {
		state: useSelector((fullState) => fullState.ResetPasswordPageState),
		dispatch: useDispatch(),
		action: Action,
	};

	// API Calls
	const APICalls = {
		ResetPasswordAPI: () => APIs.ResetPasswordAPI(Redux, navigate, ReduxUltimate, token, toast)
	}	

  // All Render
	// Submit Render
	useEffect(() => {
		submitFormObject(Redux, APICalls.ResetPasswordAPI)
	}, [Redux.state.FormObject.FormError])
	
	// Extra Render
	// useEffect(() => {
	// 	console.log(Redux.state)
	// }, [Redux.state])

  // JSX
  return (
    <React.Fragment>
			<AuthFormComponent Data={Data(Redux)} Redux={Redux} ReduxUltimate={ReduxUltimate} />
    </React.Fragment>
  )
}

export default ResetPasswordPage