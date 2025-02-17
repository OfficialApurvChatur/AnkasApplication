import APIBase from "./APIBase"

const API = {
	GlobalAPI: {
		UnprotectedAPI: {
			HomePageAPI: {
				RetrieveAPI: (props) => {
					return (
						APIBase({
							method: "GET",
							url: `/api/v1/home-page/retrieve`,
						})
					)
				}, 
			},
			ProgramPageAPI: {
				RetrieveAPI: (props) => {
					return (
						APIBase({
							method: "GET",
							url: `/api/v1/program-page/retrieve/${props.id}`,
						})
					)
				}, 
			},
			AboutAPI: {
				ListAPI: (props) => {
					return (
						APIBase({
							method: "GET",
							url: `/api/v1/about/list`,
						})
					)
				}, 
				RetrieveAPI: (props) => {
					return (
						APIBase({
							method: "GET",
							url: `/api/v1/about/retrieve/${props.id}`,
						})
					)
				}, 
			},
			ContactAPI: {
				ListAPI: (props) => {
					return (
						APIBase({
							method: "GET",
							url: `/api/v1/contact/list`,
						})
					)
				}, 
				RetrieveAPI: (props) => {
					return (
						APIBase({
							method: "GET",
							url: `/api/v1/contact/retrieve/${props.id}`,
						})
					)
				}, 
			},
		},
		ProtectedAPI: {
			AuthenticatedAPI: {
				LoginAPI: (props) => {
					return (
						APIBase({
							method: "POST",
							url: `/api/v1/user/login`,
							data: props.data,
						})
					)
				},    
				RegisterAPI: (props) => {
					return (
						APIBase({
							method: "POST",
							url: `/api/v1/user/register`,
							data: props.data,
						})
					)
				}, 
				ForgotPasswordAPI: (props) => {
					return (
						APIBase({
							method: "POST",
							url: `/api/v1/user/forgot-password`,
							data: props.data,
						})
					)
				},    
				ResetPasswordAPI: (props) => {
					return (
						APIBase({
							method: "PUT",
							url: `/api/v1/user/reset-password/${props.token}`,
							data: props.data,
						})
					)
				},
			},
			AuthorisedAPI: {
				TopbarAPI: {
					ProfileAPI: {
						RetrieveAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/user/profile-retrieve`,
								})
							)
						}, 
						UpdateAPI: (props) => {
							return (
								APIBase({
									method: "POST",
									url: `/api/v1/user/profile-update`,
									data: props.data,
								})
							)
						}, 
						UpdatePasswordAPI: (props) => {
							return (
								APIBase({
									method: "POST",
									url: `/api/v1/user/profile-update-password`,
									data: props.data,
								})
							)
						}, 
						DeleteAPI: (props) => {
							return (
								APIBase({
									method: "POST",
									url: `/api/v1/user/profile-delete`,
								})
							)
						}, 
					},
					NotificationListAPI: (props) => {
						return (
							APIBase({
								method: "GET",
								url: `/api/v1/notification/list`,
							})
						)
					}, 
					Logout: {
						LogoutAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/user/logout`,
								})
							)
						},  
					},	
					OtherAPI: {
						RoleAPI: {
							RetrieveAPI: (props) => {
								return (
									APIBase({
										method: "GET",
										url: `/api/v1/role/retrieve/${props.id}`,
									})
								)
							}, 
						},		
						MenuAPI: {
							ListAPI: (props) => {
								return (
									APIBase({
										method: "GET",
										url: `/api/v1/menu/list`,
									})
								)
							}, 
						},				
					}
				},
				SidbarAPI: {
					ChatAPI: {
						GroupChatCreateAPI: (props) => {
							return (
								APIBase({
									method: "POST",
									url: `/api/v1/chat-page/create-group-chat`,
									data: props.data,
								})
							)
						}, 

						UserListAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/user/list`,
								})
							)
						}, 

						UserChatListAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/chat-page/user-chat-list`,
								})
							)
						}, 

						UserGroupChatListAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/chat-page/user-group-chat-list`,
								})
							)
						}, 

						UserGroupChatAddMemberAPI: (props) => {
							return (
								APIBase({
									method: "PUT",
									url: `/api/v1/chat-page/user-group-chat-add-members`,
									data: props.data,
								})
							)
						}, 

						UserGroupChatRemoveMemberAPI: (props) => {
							return (
								APIBase({
									method: "PUT",
									url: `/api/v1/chat-page/user-group-chat-remove-member`,
									data: props.data,
								})
							)
						}, 

						UserGroupChatLeaveAPI: (props) => {
							return (
								APIBase({
									method: "DELETE",
									url: `/api/v1/chat-page/user-group-chat-leave/${props.id}`,
								})
							)
						}, 

						UserChatRetrieveAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/chat-page/retrieve/${props.id}${props.populate ? "?populate=true" : ''}`,
								})
							)
						}, 

						UserGroupChatRenameAPI: (props) => {
							return (
								APIBase({
									method: "PUT",
									url: `/api/v1/chat-page/rename/${props.id}`,
									data: props.data,
								})
							)
						}, 

						UserGroupChatDeleteAPI: (props) => {
							return (
								APIBase({
									method: "DELETE",
									url: `/api/v1/chat-page/delete/${props.id}`,
								})
							)
						}, 

						GetMessageAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/chat-page/retrieve-messages/${props.id}`,
								})
							)
						}, 

						SearchUserAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/chat-page/search-users`,
								})
							)
						}, 

						SendFriendRequestAPI: (props) => {
							return (
								APIBase({
									method: "PUT",
									url: `/api/v1/chat-page/send-request`,
									data: props.data,
								})
							)
						}, 

						GetFriendRequestAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/chat-page/get-friend-request`,
								})
							)
						}, 

						AcceptFriendRequestAPI: (props) => {
							return (
								APIBase({
									method: "PUT",
									url: `/api/v1/chat-page/accept-request`,
									data: props.data,
								})
							)
						}, 

						GetFriendListAPI: (props) => {
							return (
								APIBase({
									method: "GET",
									url: `/api/v1/chat-page/get-friends${props?.chatId ? `?chatId=${props.chatId}` : ''}`,
								})
							)
						}, 

					},
				},						
			},		
		},	
	},
}

export default API