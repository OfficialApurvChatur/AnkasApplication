import { combineReducers } from 'redux'

// Layout
import GlobalLayoutState from '../eLayout/aGlobalLayout/extra/State';
import UnprotectedLayoutState from '../eLayout/bUnprotectedLayout/extra/State';
import ProtectedLayoutState from '../eLayout/cProtectedLayout/extra/State';
import AuthenticatedLayoutState from '../eLayout/dAuthenticatedLayout/extra/State';
import AuthorisedLayoutState from '../eLayout/eAuthorisedLayout/extra/State';
import TopbarLayoutState from '../eLayout/fTopbarLayout/extra/State';
import SidebarLayoutState from '../eLayout/gSidebarLayout/extra/State';

// Page
import HomePageState from '../fPage/bUnprotectedPage/aHomePage/extra/State';
import ProgramPageState from '../fPage/bUnprotectedPage/bProgramPage/extra/State';
import AboutPageState from '../fPage/bUnprotectedPage/bAboutPage/extra/State';
import ContactPageState from '../fPage/bUnprotectedPage/cContactpage/extra/State';

import LoginPageState from '../fPage/dAuthenticatedPage/aLoginPage/extra/State';
import RegisterPageState from '../fPage/dAuthenticatedPage/bRegisterPage/extra/State';
import ForgotPasswordPageState from '../fPage/dAuthenticatedPage/cForgotPasswordPage/extra/State';
import ResetPasswordPageState from '../fPage/dAuthenticatedPage/dResetPasswordPage/extra/State';

import ProfileRetrievePageState from '../fPage/fTopbarPage/aProfileReteivePage/extra/State';
import ProfileUpdatePageState from '../fPage/fTopbarPage/bProfileUpdatePage/extra/State';
import ProfilePasswordUpdatePageState from '../fPage/fTopbarPage/cProfilePasswordUpdatePage/extra/State';
import ProfileDeletePageState from '../fPage/fTopbarPage/dProfileDeletePage/extra/State';

import ChatPageState from '../fPage/gSidebarPage/aChatPage/extra/State';


const RootReducer = combineReducers({
	// Layout
	GlobalLayoutState,
	UnprotectedLayoutState,
	ProtectedLayoutState,
	AuthenticatedLayoutState,
	AuthorisedLayoutState,
	TopbarLayoutState,
	SidebarLayoutState,
	
	// Page
	HomePageState,
	ProgramPageState,
	AboutPageState,
	ContactPageState,

	LoginPageState,
	RegisterPageState,
	ForgotPasswordPageState,
	ResetPasswordPageState,

	ProfileRetrievePageState,
	ProfileUpdatePageState,
	ProfilePasswordUpdatePageState,
	ProfileDeletePageState,

	ChatPageState,

})  

export default RootReducer;
