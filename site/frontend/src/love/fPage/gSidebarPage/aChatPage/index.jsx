import React, { useCallback, useEffect, useState } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Action } from './extra/State';

// Extra
import APIs from './extra/APIs';
import submitFormObject from '@/love/dFunction/cSubmitFormObject';

// Component
import ChatPageComponent from '@/love/cComponent/gSidebarComponent/children/aChatPageComponent';
import Loader from '@/love/cComponent/aGlobalComponent/component/cLoader';
import { toast } from '@/components/ui/use-toast';
import Function from './extra/Function';
import { getSocket } from '@/love/iSocket/socket';


const ChatPage = ({ ReduxUltimate }) => {
	// Variables
	const socket = getSocket();

  // Redux
	const Redux = {
		state: useSelector((fullState) => fullState.ChatPageState),
		dispatch: useDispatch(),
		action: Action,
	};

	// API Calls
	const APICalls = {
		GroupChatCreateAPICall: () => APIs.GroupChatCreateAPI(Redux, ReduxUltimate, toast),
		UserListAPICall: () => APIs.UserListAPI(Redux, ReduxUltimate, toast),
		UserChatListAPICall: () => APIs.UserChatListAPI(Redux, ReduxUltimate, toast),
		UserGroupChatListAPICall: () => APIs.UserGroupChatListAPI(Redux, ReduxUltimate, toast),
		UserGroupChatAddMemberAPICall: ({chatID}) => APIs.UserGroupChatAddMemberAPI(Redux, ReduxUltimate, toast, chatID),
		UserGroupChatRemoveMemberAPICall: () => APIs.UserGroupChatRemoveMemberAPI(Redux, ReduxUltimate, toast),
		UserGroupChatLeaveAPICall: ({id}) => APIs.UserGroupChatLeaveAPI(Redux, ReduxUltimate, toast, id),
		UserChatRetrieveAPICall: ({id, populate}) => APIs.UserChatRetrieveAPI(Redux, ReduxUltimate, toast, id, populate),
		UserGroupChatRenameAPICall: ({id}) => APIs.UserGroupChatRenameAPI(Redux, ReduxUltimate, toast, id),
		UserGroupChatDeleteAPICall: ({id}) => APIs.UserGroupChatDeleteAPI(Redux, ReduxUltimate, toast, id),
		GetMessageAPICall: ({id}) => APIs.GetMessageAPI(Redux, ReduxUltimate, toast, id),
		SearchUserAPICall: () => APIs.SearchUserAPI(Redux, ReduxUltimate, toast),
		SendFriendRequestAPICall: () => APIs.SendFriendRequestAPI(Redux, ReduxUltimate, toast),
		GetFriendRequestAPICall: () => APIs.GetFriendRequestAPI(Redux, ReduxUltimate, toast),
		AcceptFriendRequestAPICall: ({ accept }) => APIs.AcceptFriendRequestAPI(Redux, ReduxUltimate, toast, accept),
		GetFriendListAPICall: ({chatId}) => APIs.GetFriendListAPI(Redux, ReduxUltimate, toast, chatId),

		NewUserChatRetrieveAPICall: ({id, populate}) => APIs.NewUserChatRetrieveAPI(Redux, ReduxUltimate, toast, id, populate),

		NewSearchUserAPICall: () => APIs.NewSearchUserAPI(Redux, ReduxUltimate, toast),
		NewSendFriendRequestAPICall: ({id}) => APIs.NewSendFriendRequestAPI(Redux, ReduxUltimate, toast, id),
		NewAcceptFriendRequestAPICall: (data) => APIs.NewAcceptFriendRequestAPI(Redux, ReduxUltimate, toast, data),

		NewUserListAPICall: () => APIs.NewUserListAPI(Redux, ReduxUltimate, toast),
		NewGroupChatCreateAPICall: () => APIs.NewGroupChatCreateAPI(Redux, ReduxUltimate, toast),
		NewUserChatListAPICall: () => APIs.NewUserChatListAPI(Redux, ReduxUltimate, toast),

		NewUserGroupChatRemoveMemberAPICall: (data) => APIs.NewUserGroupChatRemoveMemberAPI(Redux, ReduxUltimate, toast, data),

	}	

  // All Render
  // First Render
	useEffect(() => {
		APICalls.UserChatListAPICall()
	}, [])
		
	// Extra Render
	useEffect(() => {
		console.log(Redux.state)
	}, [Redux.state])

  // JSX
  return (
    <React.Fragment>
      {ReduxUltimate.state.RequiredObject?.Loading ? <Loader /> :
				<ChatPageComponent Redux={Redux} ReduxUltimate={ReduxUltimate} APICalls={APICalls} Function={Function} socket={socket} />
			}
    </React.Fragment>
  )
}

export default ChatPage