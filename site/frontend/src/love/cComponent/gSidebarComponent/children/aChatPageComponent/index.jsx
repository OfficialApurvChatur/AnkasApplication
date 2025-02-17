import React, { Suspense, useCallback, useEffect, useState } from 'react'
import Loader from '@/love/cComponent/aGlobalComponent/component/cLoader';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  Handshake, 
  ReceiptText, 
  Reply, 
  Trash2, 
  User2, 
  UserRoundPlus, 
  Users2, 
  UsersRound 
} from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea"
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

import ChatListComponent from './component/aChatListComponent';
import ChatMessageRetrieveComponent from './component/bChatMessageRetrieveComponent';
import ChatRetrieveComponent from './component/cChatRetrieveComponent';

import { useSocketEvent } from "@/love/dFunction/hHook"
import handleInput from '@/love/dFunction/dHandleInput';

function getInitials(firstName, lastName) {
  // Extract the first character of the first name and last name
  const firstInitial = firstName?.charAt(0).toUpperCase();
  const lastInitial = lastName?.charAt(0).toUpperCase();
  
  // Return the initials
  return `${firstInitial}${lastInitial}`;
}


const ChatPageComponent = ({ Redux, ReduxUltimate, APICalls, Function, socket }) => {  
  // Listening Socket Events
  const alertHandler = useCallback(data => {
    console.log("data1")
  }, [Redux.state.ReceivedObject?.UserChatList])

  const refetchChatsHandler = useCallback(data => {
    console.log("data2")
    APICalls.NewUserChatListAPICall()
  }, [Redux.state.ReceivedObject?.UserChatList])

  const newRequestHandler = useCallback(data => {
    console.log("data3")
    APICalls.NewSearchUserAPICall()
  }, [Redux.state.ReceivedObject?.UserChatList])

  const newMessageAlertHandler = useCallback(data => {
    console.log("data4", data)
  }, [Redux.state.ExtraObject?.NewMessages])

  const eventHandler = {
    ALERT: alertHandler,
    REFETCH_CHATS: refetchChatsHandler,
    NEW_REQUEST: newRequestHandler,
    NEW_MESSAGE_ALERT: newMessageAlertHandler,
  }

  useSocketEvent(socket, eventHandler)
  
  return (
    <div className="bg-[#F2EDD7] dark:bg-[#755139] text-[#755139] dark:text-[#F2EDD7] ">
      <Suspense fallback={<Loader text="Suspense Boom Loading..." />}>

        <div 
          className="
            border flex-col md:flex
            bg-[#F2EDD7] dark:bg-[#755139]
            border-[#755139] dark:border-[#F2EDD7]
            text-[#755139] dark:text-[#F2EDD7]
          "
        >
          <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
              direction="horizontal"
              className="items-stretch min-h-screen max-h-screen"
            >
              {/* First Column */}
              <ResizablePanel 
                defaultSize={25} minSize={15} maxSize={35} 
                className={`
                  ${Redux.state.ExtraObject?.ActiveSecondTab ? "hidden" : ""} 
                  ${Redux.state.ExtraObject?.ActiveThirdTab ? "hidden" : ""} 
                  md:block
                `} 
              >
                <div className="flex items-center p-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-bold">Chat List</h1>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Dialog>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button variant="custom" size="icon" onClick={() => APICalls.NewSearchUserAPICall()} >
                              <Handshake className="h-4 w-4" />
                              <span className="sr-only">Manage Request</span>
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Manage Request</TooltipContent>
                      </Tooltip>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Manage Request</DialogTitle>
                        </DialogHeader>

                        <Label htmlFor="image">Pending Request</Label>
                        {Redux.state.ReceivedObject?.GetFriendRequestList?.length ? 
                          <ScrollArea className="h-48 rounded-md">
                            <div className="grid gap-4">
                              {Redux.state.ReceivedObject?.GetFriendRequestList?.map((each, index) => {
                                return (
                                  <div key={index} className="flex flex-col rounded-md border p-2 shadow">
                                    <div className="flex items-center space-x-2 mr-2">
                                      <Avatar>
                                        <AvatarImage src={each?.cSender?.eImage?.url} />
                                        <AvatarFallback>{getInitials(
                                          each?.cSender?.eFirstName, 
                                          each?.cSender?.eLastName
                                        )}</AvatarFallback>
                                      </Avatar>
                                      <div className='block' >
                                        <p className="text-sm font-medium leading-none">{`${each?.cSender?.eFirstName} ${each?.cSender?.eLastName}`}</p>
                                        <p className="text-sm text-muted-foreground">{each?.cSender?.eEmail}</p>
                                      </div>
                                    </div>
                                    <div className='flex gap-2'>
                                      <Button size="sm" className="mt-2" onClick={() => APICalls.NewAcceptFriendRequestAPICall({requestID: each._id, accept: true})} >
                                          Accept
                                        </Button>  
                                        <Button size="sm" className="mt-2" onClick={() => APICalls.NewAcceptFriendRequestAPICall({requestID: each._id, accept: false})} >
                                          Reject
                                        </Button>  
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </ScrollArea>
                          : 
                          <div className='text-center'>
                            <p className='text-sm text-muted-foreground'>No Pending Request</p>
                          </div>
                        }

                        <Separator />

                        <Label htmlFor="image">Send Request</Label>
                        {Redux.state.ReceivedObject?.SerchUserList?.length ? 
                          <ScrollArea className="h-48 rounded-md">
                            <div className="grid gap-2">
                              {Redux.state.ReceivedObject?.SerchUserList?.map((each, index) => {
                                return (
                                  <div key={index} className="flex flex-col rounded-md border p-2 md:mr-4 shadow">
                                    <div className="flex items-center space-x-2 mr-2">
                                      <Avatar>
                                        <AvatarImage src={each?.eImage?.url} />
                                        <AvatarFallback>{getInitials(
                                          each?.eFirstName, 
                                          each?.eLastName
                                        )}</AvatarFallback>
                                      </Avatar>
                                      <div className='block' >
                                        <p className="text-sm font-medium leading-none">{`${each?.eFirstName} ${each?.eLastName}`}</p>
                                        <p className="text-sm text-muted-foreground">{each?.eEmail}</p>
                                      </div>
                                    </div>
                                    <div className='flex gap-2'>
                                      <Button size="sm" className="mt-2" onClick={() => APICalls.NewSendFriendRequestAPICall({id: each._id})} >
                                        Send Friend Request
                                      </Button>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </ScrollArea>
                          : 
                          <div className='text-center'>
                            <p className='text-sm text-muted-foreground'>No Pending Request</p>
                          </div>
                        }

                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button variant="custom" size="icon" onClick={() => APICalls.GetFriendListAPICall({chatId: ''})} >
                              <UsersRound className="h-4 w-4" />
                              <span className="sr-only">Create Group Chat</span>
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Create Group Chat</TooltipContent>
                      </Tooltip>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Create Group Chat</DialogTitle>
                          <DialogDescription>
                            Enter the following information to create group chat. Click save when you're done.
                          </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className="h-96 rounded-md">
                          <div className="grid gap-4 py-4">

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="image">Profile Image</Label>
                              <Input 
                                id="image" 
                                name="image" 
                                type="file" 
                                onChange={event => handleInput(event, Redux)} 
                              />
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="title">Title</Label>
                              <Input 
                                id="title" 
                                name="title" 
                                placeholder="Enter title" 
                                onChange={event => handleInput(event, Redux)} 
                              />
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="subtitle">Subtitle</Label>
                              <Input 
                                id="subtitle" 
                                name="subtitle" 
                                placeholder="Enter subtitle" 
                                onChange={event => handleInput(event, Redux)} 
                              />
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="description">Description</Label>
                              <Textarea 
                                id="description" 
                                name="description" 
                                placeholder="Enter group description" 
                                onChange={event => handleInput(event, Redux)} 
                              />
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="description">Members</Label>
                              <ScrollArea className="h-72 md:mr-4 rounded-md border">
                                <div className="flex flex-col gap-2 p-2">

                                  {Redux.state.ReceivedObject?.GetFriendList?.map((each, index) => {
                                    return (
                                      <div 
                                        key={index} 
                                        className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2 shadow"
                                      >
                                        <input 
                                          name='members'
                                          type='checkbox'
                                          value={each._id} 
                                          onChange={event => Function.handleCheckboxInput(event, Redux, index)} 
                                        />
                                        <div className="flex items-center space-x-2 mr-2">
                                          <Avatar>
                                            <AvatarImage src={each?.eImage?.url} />
                                            <AvatarFallback>{getInitials(
                                              each?.eFirstName, 
                                              each?.eLastName
                                            )}</AvatarFallback>
                                          </Avatar>
                                          <div className='block' >
                                            <p className="text-sm font-medium leading-none">{`${each?.eFirstName} ${each?.eLastName}`}</p>
                                            <p className="text-sm text-muted-foreground">{each?.eEmail}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })}

                                </div>
                              </ScrollArea>
                            </div>

                          </div>
                        </ScrollArea>

                        <DialogFooter className="flex gap-2">
                          <Button onClick={() => APICalls.NewGroupChatCreateAPICall()} >Save changes</Button>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {Redux.state.RequiredObject?.Loading ? "Loading..." : null}
                <Separator className="bg-[#755139] dark:bg-[#F2EDD7]" />

                <ScrollArea className="h-full rounded-md">
                  <ChatListComponent
                    isCollapsed={false}
                    APICalls={APICalls}
                    Redux={Redux}
                    links={Redux.state.ReceivedObject.UserChatList ?
                      Redux.state.ReceivedObject.UserChatList?.map(each => ({ 
                        id: each._id,
                        title: each.dName, 
                        label: each.dIsGroupChat ? "Group Chat" : "", 
                        icon: each.dIsGroupChat ? Users2 : User2, 
                        variant: "ghost" 
                      } )) : []
                    }
                  />
                </ScrollArea>
              </ResizablePanel>
              
              <ResizableHandle withHandle />

              {/* Second Column */}
              <ResizablePanel 
                defaultSize={40} minSize={25} 
                className={`
                  ${Redux.state.ExtraObject?.ActiveSecondTab ? "" : "hidden"} 
                  ${Redux.state.ExtraObject?.ActiveThirdTab ? "hidden" : ""} 
                  md:block
                `} 
              >
                {Redux.state.ReceivedObject?.ChatRetrieve ? 
                  <React.Fragment>
                    <div className="flex items-center px-4 py-2">
                      <div className='flex items-center gap-2' >
                        <Button variant="ghost" size="icon" className="md:hidden"
                          onClick={() => Redux.dispatch({ type: Redux.action.ExtraObject, payload: {
                            ...Redux.state.ExtraObject,
                            ActiveSecondTab: false,
                            ActiveThirdTab: false,
                          }}) }
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-lg font-bold">Inbox</h1>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="custom" size="icon"  className="md:hidden"
                              onClick={() => Redux.dispatch({ type: Redux.action.ExtraObject, payload: {
                                ...Redux.state.ExtraObject,
                                ActiveSecondTab: false,
                                ActiveThirdTab: true,
                              }}) }
                            >
                              <ReceiptText className="h-4 w-4" />
                              <span className="sr-only">Chat Details</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Chat Details</TooltipContent>
                        </Tooltip>

                        {Redux?.state?.ReceivedObject?.ChatRetrieve?.dIsGroupChat && 
                          ReduxUltimate?.state?.ReceivedObject?.ProfileRetrieve?._id === Redux?.state?.ReceivedObject?.ChatRetrieve?.cAdmin?._id && 
                            <Dialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <DialogTrigger asChild>
                                    <Button variant="custom" size="icon" 
                                      onClick={() => APICalls.GetFriendListAPICall({ chatId: Redux?.state?.ReceivedObject?.ChatRetrieve?._id })}
                                    >
                                      <UserRoundPlus className="h-4 w-4" />
                                      <span className="sr-only">Create Group Chat</span>
                                    </Button>
                                  </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>Create Group Chat</TooltipContent>
                              </Tooltip>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Create Group Chat</DialogTitle>
                                  <DialogDescription>
                                    Enter the following information to create group chat. Click save when you're done.
                                  </DialogDescription>
                                </DialogHeader>
              
                                <ScrollArea className="h-96 rounded-md">
                                  <div className="grid gap-4 py-4">
              
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                      <Label htmlFor="description">Members</Label>
                                      <ScrollArea className="h-72 md:mr-4 rounded-md border">
                                        <div className="flex flex-col gap-2 p-2">
              
                                          {Redux.state.ReceivedObject?.GetFriendList?.map((each, index) => {
                                            return (
                                              <div 
                                                key={index} 
                                                className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2 shadow"
                                              >
                                                <input 
                                                  name='members'
                                                  type='checkbox'
                                                  value={each._id} 
                                                  onChange={event => Function.handleCheckboxInput(event, Redux, index)} 
                                                />
                                                <div className="flex items-center space-x-2 mr-2">
                                                  <Avatar>
                                                    <AvatarImage src={each?.eImage?.url} />
                                                    <AvatarFallback>{getInitials(
                                                      each?.eFirstName, 
                                                      each?.eLastName
                                                    )}</AvatarFallback>
                                                  </Avatar>
                                                  <div className='block' >
                                                    <p className="text-sm font-medium leading-none">{`${each?.eFirstName} ${each?.eLastName}`}</p>
                                                    <p className="text-sm text-muted-foreground">{each?.eEmail}</p>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          })}
              
                                        </div>
                                      </ScrollArea>
                                    </div>
              
                                  </div>
                                </ScrollArea>
              
                                <DialogFooter className="flex gap-2">
                                  <Button onClick={() => APICalls.UserGroupChatAddMemberAPICall()} >Save changes</Button>
                                  <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                      Close
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                        }

                        {Redux?.state?.ReceivedObject?.ChatRetrieve?.dIsGroupChat && 
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="custom" size="icon" 
                                onClick={() => APICalls.UserGroupChatLeaveAPICall(
                                  { id: Redux?.state?.ReceivedObject?.ChatRetrieve?._id }
                                )}
                              >
                                <Reply className="h-4 w-4" />
                                <span className="sr-only">Leave Group</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Leave Group</TooltipContent>
                          </Tooltip>
                        }

                        {Redux?.state?.ReceivedObject?.ChatRetrieve?.dIsGroupChat && 
                          ReduxUltimate?.state?.ReceivedObject?.ProfileRetrieve?._id === Redux?.state?.ReceivedObject?.ChatRetrieve?.cAdmin?._id &&
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="custom" size="icon" 
                                  onClick={() => APICalls.UserGroupChatDeleteAPICall(
                                    { id: Redux?.state?.ReceivedObject?.ChatRetrieve?._id }
                                  )}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete Chat</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Chat</TooltipContent>
                            </Tooltip>
                        }

                        {!Redux?.state?.ReceivedObject?.ChatRetrieve?.dIsGroupChat && 
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="custom" size="icon" 
                                onClick={() => APICalls.UserGroupChatDeleteAPICall(
                                  { id: Redux?.state?.ReceivedObject?.ChatRetrieve?._id }
                                )}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete Chat</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Chat</TooltipContent>
                          </Tooltip>
                        }

                      </div>
                    </div>

                    <Separator className="bg-[#755139] dark:bg-[#F2EDD7]" />
                  
                    <ChatMessageRetrieveComponent Redux={Redux} ReduxUltimate={ReduxUltimate} socket={socket} APICalls={APICalls} />
                  </React.Fragment>
                  :
                  <div className='h-full flex text-center items-center justify-center'>
                    <small>Select chat to see messages</small>
                  </div>
                }
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Third Column */}
              <ResizablePanel 
                className={`
                  ${Redux.state.ExtraObject?.ActiveSecondTab ? "hidden" : ""} 
                  ${Redux.state.ExtraObject?.ActiveThirdTab ? "" : "hidden"} 
                  lg:block
                `}
              >
                {Redux.state.ReceivedObject?.ChatRetrieve ?
                  <ScrollArea className="h-full rounded-md">
                    <ChatRetrieveComponent
                      Redux={Redux} 
                      ReduxUltimate={ReduxUltimate} 
                      socket={socket} 
                      APICalls={APICalls}
                      Function={Function}
                    />
                  </ScrollArea>
                  :
                  <div className='h-full flex text-center items-center justify-center'>
                    <small>Select chat to see details</small>
                  </div>
                }
              </ResizablePanel>

            </ResizablePanelGroup>
          </TooltipProvider>
        </div>

      </Suspense>
    </div>
  )
}

export default ChatPageComponent