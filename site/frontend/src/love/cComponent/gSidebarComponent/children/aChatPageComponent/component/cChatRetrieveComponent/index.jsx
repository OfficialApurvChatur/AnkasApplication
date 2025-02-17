import addDays from "date-fns/addDays"
import addHours from "date-fns/addHours"
import format from "date-fns/format"
import nextSaturday from "date-fns/nextSaturday"
import {
  Archive,
  ArchiveX,
  ArrowLeft,
  Clock,
  Forward,
  MoreVertical,
  Plus,
  Reply,
  ReplyAll,
  Trash2,
  UserPlus,
  UserRoundPlus,
  UsersRound,
} from "lucide-react"

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"
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
import { ScrollArea } from "@/components/ui/scroll-area"


function getInitials(firstName, lastName) {
  // Extract the first character of the first name and last name
  const firstInitial = firstName?.charAt(0).toUpperCase();
  const lastInitial = lastName?.charAt(0).toUpperCase();
  
  // Return the initials
  return `${firstInitial}${lastInitial}`;
}


const ChatRetrieveComponent = ({ Redux, ReduxUltimate, socket, APICalls, Function }) => {
  const today = new Date()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden"
          onClick={() => Redux.dispatch({ type: Redux.action.ExtraObject, payload: {
            ...Redux.state.ExtraObject,
            ActiveSecondTab: true,
            ActiveThirdTab: false,
          }}) }
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
          <h1 className="text-lg font-bold">Chat Details</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
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
                    <Button 
                      onClick={() => APICalls.UserGroupChatAddMemberAPICall({
                        chatID: Redux?.state?.ReceivedObject?.ChatRetrieve?._id
                      })} 
                    >Save changes</Button>
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
      
      <div className="flex flex-1 flex-col">
        <div className="flex items-start p-4">
          <div className="flex items-center gap-4 text-sm">
            <Avatar>
              <AvatarImage src={
                Redux.state.ReceivedObject?.ChatRetrieve?.cOtherMember?.eImage?.url ||
                Redux.state.ReceivedObject?.ChatRetrieve?.aImage?.url
              } />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{
                Redux?.state?.ReceivedObject?.ChatRetrieve?.cOtherMember?.aTitle ||
                Redux?.state?.ReceivedObject?.ChatRetrieve?.aTitle
              }</div>

              {Redux?.state?.ReceivedObject?.ChatRetrieve?.dIsGroupChat ?
                <div className="line-clamp-1 text-xs">{Redux?.state?.ReceivedObject?.ChatRetrieve?.aSubtitle}</div> :
                <div className="line-clamp-1 text-xs">{Redux?.state?.ReceivedObject?.ChatRetrieve?.cOtherMember?.aSubtitle}</div>
              }

              {Redux?.state?.ReceivedObject?.ChatRetrieve?.dIsGroupChat ?
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Admin:</span> {Redux?.state?.ReceivedObject?.ChatRetrieve?.cAdmin?.eEmail}
                </div> :
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Email:</span> {Redux?.state?.ReceivedObject?.ChatRetrieve?.cOtherMember?.eEmail}
                </div>
              }
            </div>
          </div>
          {/* {mail.date && (
            <div className="ml-auto text-xs text-muted-foreground">
              {format(new Date(mail.date), "PPpp")}
            </div>
          )} */}
        </div>

        <Separator className="bg-[#755139] dark:bg-[#F2EDD7]" />

        <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
          {
            Redux?.state?.ReceivedObject?.ChatRetrieve?.cOtherMember?.aDescription ||
            Redux?.state?.ReceivedObject?.ChatRetrieve?.aDescription
          }
        </div>

        <Separator className="bg-[#755139] dark:bg-[#F2EDD7]" />

        {Redux?.state?.ReceivedObject?.ChatRetrieve?.dIsGroupChat && 
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {Redux?.state?.ReceivedObject?.ChatRetrieve?.cMembers?.map((each, index) => {
              return (
                <div key={index} className='flex justify-between my-2 p-2 border border-[#755139] dark:border-[#F2EDD7]'>
                  <div className="flex items-center space-x-2 mr-2">
                    <Avatar>
                      <AvatarImage src={each?.eImage?.url} />
                      <AvatarFallback>{getInitials(
                        each?.eFirstName, 
                        each?.eLastName
                      )}</AvatarFallback>
                    </Avatar>
                    <div className='hidden sm:block' >
                      <p className="text-sm font-medium leading-none">{`${each?.eFirstName} ${each?.eLastName}`}</p>
                      <p className="text-sm text-muted-foreground">{each?.eEmail}</p>
                    </div>
                  </div>
                  <div>
                    {ReduxUltimate?.state?.ReceivedObject?.ProfileRetrieve?._id === each._id ?
                      <Button 
                        size="sm" className="mt-2" variant="custom"
                        onClick={() => APICalls.UserGroupChatLeaveAPICall(
                          { id: Redux?.state?.ReceivedObject?.ChatRetrieve?._id }
                        )}                    >
                        Leave
                      </Button>
                      :  
                      <React.Fragment>
                        {ReduxUltimate?.state?.ReceivedObject?.ProfileRetrieve?._id === Redux?.state?.ReceivedObject?.ChatRetrieve?.cAdmin?._id && 
                          <Button 
                            size="sm" className="mt-2" variant="custom"
                            onClick={() => APICalls.NewUserGroupChatRemoveMemberAPICall({
                              chatID: Redux?.state?.ReceivedObject?.ChatRetrieve?._id,
                              userID: each?._id,
                            })} 
                          >
                            Remove
                          </Button>  
                        }
                      </React.Fragment>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        }

      </div>
    </div>
  )
}

export default ChatRetrieveComponent
