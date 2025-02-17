import { Check, Plus, Send } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSocketEvent } from "@/love/dFunction/hHook"
import { useCallback, useEffect, useState } from "react"

const users = [
  // {
  //   name: "Olivia Martin",
  //   email: "m@example.com",
  //   avatar: "/avatars/01.png",
  // },
  // {
  //   name: "Isabella Nguyen",
  //   email: "isabella.nguyen@email.com",
  //   avatar: "/avatars/03.png",
  // },
  // {
  //   name: "Emma Wilson",
  //   email: "emma@example.com",
  //   avatar: "/avatars/05.png",
  // },
] 


const ChatMessageRetrieveComponent = ({ Redux, ReduxUltimate, socket, APICalls }) => {
  // Variables
  const [open, setOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [input, setInput] = useState("")
  const inputLength = input.trim().length
  const [messages, setMessages] = useState([])
  const [chat, setChat] = useState(true)
  const [request, setRequest] = useState(false)
  const [groupChat, setGroupChat] = useState(false)

  // All Render
  // Next Render
  useEffect(() => {
    setMessages([
      // ...messages, 
      ...Redux.state.ReceivedObject?.MessageRetrieve?.map(each => ({
        aSubtitle: each.aSubtitle,
        cSender: each.cSender,
        cChat: each.cChat,
      }))
    ])
  }, [Redux.state.ReceivedObject?.MessageRetrieve])
    
  // Listening Socket Events
  const newMessageHandler = useCallback(data => {
    // console.log(data)
    if (data.cChat !== Redux.state.ReceivedObject?.ChatRetrieve?._id) return;

    Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
      ...Redux.state.ReceivedObject,
      MessageRetrieve: [
        ...Redux.state.ReceivedObject?.MessageRetrieve,{
          aSubtitle: data.aSubtitle,
          cSender: data.cSender,
          cChat: data.cChat,
        }
      ]
    }});
  }, [Redux.state.ReceivedObject?.MessageRetrieve])

  const alertHandler = useCallback(data => {
    console.log("data1")
  }, [Redux.state.RequiredObject?.Loading])

  const refetchChatsHandler = useCallback(data => {
    console.log("data2")
    APICalls.NewUserChatListAPICall()
  }, [Redux.state.RequiredObject?.Loading])

  const eventHandler = {
    NEW_MESSAGE: newMessageHandler,
    // ALERT: alertHandler,
    // REFETCH_CHATS: refetchChatsHandler,
  }

  useSocketEvent(socket, eventHandler)

  // JSX
  return (
    <>
      <Card 
        className={`
          rounded-none border-none
          bg-[#F2EDD7] dark:bg-[#755139]
          border-[#755139] dark:border-[#F2EDD7]
          text-[#755139] dark:text-[#F2EDD7]`}
      >
        <CardHeader className="flex flex-row items-center justify-between py-2 border-b border-[#755139] dark:border-[#F2EDD7]">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={
                Redux.state.ReceivedObject?.ChatRetrieve?.cOtherMember?.eImage?.url ||
                Redux.state.ReceivedObject?.ChatRetrieve?.aImage?.url
              } alt="Image" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{
                Redux.state.ReceivedObject?.ChatRetrieve?.cOtherMember?.aTitle ||
                Redux.state.ReceivedObject?.ChatRetrieve?.aTitle
              }</p>
              {/* <p className="text-sm text-muted-foreground">m@example.com</p> */}
            </div>
          </div>
        </CardHeader>

        <ScrollArea>
          <CardContent className="h-[calc(100vh-195px)]">
            <div className="space-y-1 h-full">
              {messages?.map((each, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex max-w-[75%] flex-col gap-2 rounded-lg p-2 text-xs",
                    each.cSender._id === ReduxUltimate?.state?.ReceivedObject?.ProfileRetrieve?._id ? 
                      "ml-auto bg-primary text-primary-foreground" : 
                      "bg-muted"
                  )}
                >
                  {each.aSubtitle}
                </div>
              ))}
            </div>
          </CardContent>
        </ScrollArea>

        <CardFooter className="py-2 border-y border-[#755139] dark:border-[#F2EDD7] bottom-0">
          <form className="flex w-full items-center space-x-2">
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1 border-[#755139] dark:border-[#F2EDD7]"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={inputLength === 0} 
              onClick={event => {
                event.preventDefault();
                if (inputLength === 0) return;
                socket.emit("NEW_MESSAGE", {
                  aSubtitle: input,
                  cChat: Redux.state.ReceivedObject?.ChatRetrieve?._id, 
                  cMembers: Redux.state.ReceivedObject?.ChatRetrieve?.cMembers, 
                });
                setInput("");
              }}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}

export default ChatMessageRetrieveComponent
