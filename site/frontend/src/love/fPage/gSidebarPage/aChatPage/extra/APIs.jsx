
import API from "@/love/aAPI/API";
import clearFormObject from "@/love/dFunction/aClearFormObject";
import loading from "@/love/dFunction/fLoading";
import FinalRouteName from "@/love/gRoute/FinalRouteName";


const APIs = {
  // User List API
  UserListAPI: (Redux, ReduxUltimate, toast) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserListAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          UserList: serverResponse.list
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // User Chat List API
  UserChatListAPI: (Redux, ReduxUltimate, toast) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserChatListAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          UserChatList: serverResponse.list
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // User Group Chat List API
  UserGroupChatListAPI: (Redux, ReduxUltimate, toast) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserGroupChatListAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          UserGroupChatList: serverResponse.list
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // User Group Chat Add Member API
  UserGroupChatAddMemberAPI: (Redux, ReduxUltimate, toast, chatID) => {
    // loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserGroupChatAddMemberAPI({
      data: {
        chatID: chatID,
        members: Redux.state.FormObject.FormValue?.members,
      }
    })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    // .finally(() => loading(ReduxUltimate, false) );
  },
  
  // User Group Chat Remove Member API
  UserGroupChatRemoveMemberAPI: (Redux, ReduxUltimate, toast) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserGroupChatRemoveMemberAPI({
      data: {
        chatID: Redux.state.FormObject.FormValue?.chatID,
        userID: Redux.state.FormObject.FormValue?.userID,
      }
    })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // User Group Chat Leave API
  UserGroupChatLeaveAPI: (Redux, ReduxUltimate, toast, id) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserGroupChatLeaveAPI({ id })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // User Chat Retrieve API
  UserChatRetrieveAPI: (Redux, ReduxUltimate, toast, id, populate) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserChatRetrieveAPI({ id, populate })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          ChatRetrieve: serverResponse.chat
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // User Group Chat Rename API
  UserGroupChatRenameAPI: (Redux, ReduxUltimate, toast, id) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserGroupChatRenameAPI({ 
      id,
      data: {
        aTitle: Redux.state.FormObject.FormValue.title,
			}
    })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // User Group Chat Delete API
  UserGroupChatDeleteAPI: (Redux, ReduxUltimate, toast, id) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserGroupChatDeleteAPI({ id })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
        // APIs.NewUserChatListAPI(Redux, ReduxUltimate, toast);
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },
  
  // Get Message API
  GetMessageAPI: (Redux, ReduxUltimate, toast, id) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.GetMessageAPI({ id })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          MessageRetrieve: serverResponse.chat_messages
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // Search Users API
  SearchUserAPI: (Redux, ReduxUltimate, toast) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.SearchUserAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          SerchUserList: serverResponse.users
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // Send Friend Request API
  SendFriendRequestAPI: (Redux, ReduxUltimate, toast) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.SendFriendRequestAPI({
      data: {
        userID: Redux.state.FormObject.FormValue?.userID,
      }
    })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // Get Friend Request API
  GetFriendRequestAPI: (Redux, ReduxUltimate, toast) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.GetFriendRequestAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          GetFriendRequestList: serverResponse.allRequests
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // Accept Friend Request API
  AcceptFriendRequestAPI: (Redux, ReduxUltimate, toast, accept) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.AcceptFriendRequestAPI({
      data: {
        requestID: Redux.state.FormObject.FormValue?.requestID,
        accept: accept,
      }
    })
    .then(response => {
      console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          SerchUserList: serverResponse.users
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
  
  // Get Friend List API
  GetFriendListAPI: (Redux, ReduxUltimate, toast, chatId) => {
    // loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.GetFriendListAPI({ chatId })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          GetFriendList: serverResponse.friends
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    // .finally(() => loading(ReduxUltimate, false) );
  },



  // New User Chat Retrieve API
  NewUserChatRetrieveAPI: (Redux, ReduxUltimate, toast, id, populate) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserChatRetrieveAPI({ id, populate })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        const ChatRetrieve = serverResponse.chat
        APIs.NewGetMessageAPI(Redux, ReduxUltimate, toast, id, ChatRetrieve)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },
    
  // New Get Message API
  NewGetMessageAPI: (Redux, ReduxUltimate, toast, id, ChatRetrieve) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.GetMessageAPI({ id })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          ChatRetrieve: ChatRetrieve,
          MessageRetrieve: serverResponse.chat_messages
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },

  // New Search Users API
  NewSearchUserAPI: (Redux, ReduxUltimate, toast) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.SearchUserAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        // Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
        //   ...Redux.state.ReceivedObject,
        //   SerchUserList: serverResponse.users
        // }})
        // toast({
        //   description: serverResponse.message,
        // });
        // clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
        const SerchUserList = serverResponse.users
        APIs.NewGetFriendRequestAPI(Redux, ReduxUltimate, toast, SerchUserList)

      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(Redux, false) );
  },
  
  // New Get Friend Request API
  NewGetFriendRequestAPI: (Redux, ReduxUltimate, toast, SerchUserList) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.GetFriendRequestAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          SerchUserList: SerchUserList,
          GetFriendRequestList: serverResponse.allRequests
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },

  // Send Friend Request API
  NewSendFriendRequestAPI: (Redux, ReduxUltimate, toast, id) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.SendFriendRequestAPI({
      data: {
        userID: id,
      }
    })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },
  
  // New Accept Friend Request API
  NewAcceptFriendRequestAPI: (Redux, ReduxUltimate, toast, data) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.AcceptFriendRequestAPI({
      data: {
        requestID: data.requestID,
        accept: data.accept,
      }
    })
    .then(response => {
      console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },
  
  // New User List API
  NewUserListAPI: (Redux, ReduxUltimate, toast) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserListAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          UserList: serverResponse.list
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },

  // New Group Chat Create API
  NewGroupChatCreateAPI: (Redux, ReduxUltimate, toast) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.GroupChatCreateAPI({
      data: {
        aImage: Redux.state.FormObject.FormValue?.image,
        aTitle: Redux.state.FormObject.FormValue?.title,
        aSubtitle: Redux.state.FormObject.FormValue?.subtitle,
        aDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae arcu vestibulum, fringilla diam quis, tincidunt nunc. Mauris faucibus commodo nibh et euismod. Aenean ultricies turpis sit amet venenatis elementum. Aliquam massa nisi, pretium vel nisi ac, vehicula pharetra justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae arcu vestibulum, fringilla diam quis, tincidunt nunc. Mauris faucibus commodo nibh et euismod. Aenean ultricies turpis sit amet venenatis elementum. Aliquam massa nisi, pretium vel nisi ac, vehicula pharetra justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae arcu vestibulum, fringilla diam quis, tincidunt nunc. Mauris faucibus commodo nibh et euismod. Aenean ultricies turpis sit amet venenatis elementum. Aliquam massa nisi, pretium vel nisi ac, vehicula pharetra justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae arcu vestibulum, fringilla diam quis, tincidunt nunc. Mauris faucibus commodo nibh et euismod. Aenean ultricies turpis sit amet venenatis elementum. Aliquam massa nisi, pretium vel nisi ac, vehicula pharetra justo.`,
        aStatus: true,

        cCreator: ReduxUltimate.state.ReceivedObject?.ProfileRetrieve?._id,
        cAdmin: ReduxUltimate.state.ReceivedObject?.ProfileRetrieve?._id,
        cMembers: Redux.state.FormObject.FormValue?.members,

        dIsGroupChat: true,
      }
    })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux);
        // APIs.NewUserChatListAPI(Redux, ReduxUltimate, toast);
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },
  
  // New User Chat List API
  NewUserChatListAPI: (Redux, ReduxUltimate, toast) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserChatListAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          UserChatList: serverResponse.list
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },
  
  // New User Group Chat Remove Member API
  NewUserGroupChatRemoveMemberAPI: (Redux, ReduxUltimate, toast, data) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.SidbarAPI.ChatAPI.UserGroupChatRemoveMemberAPI({
      data: {
        chatID: data.chatID,
        userID: data.userID,
      }
    })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        // navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
     .finally(() => loading(Redux, false) );
  },
  
}

export default APIs