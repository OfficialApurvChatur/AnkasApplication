import React, { useCallback, useEffect, useState } from 'react'
import { useSocketEvent } from '@/love/dFunction/hHook'
import { NOTIFICATION_CREATED } from '@/love/iSocket/event'
import { getSocket } from '@/love/iSocket/socket';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons"
import { BellRing } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import FinalRouteName from '@/love/gRoute/FinalRouteName';
import { Link } from 'react-router-dom';


const Notification = ({ Redux }) => {
  // Variables
  const socket = getSocket();
  const [notifications, setNotifications] = useState([])
  const [realTimeNotifications, setRealTimeNotifications] = useState([])
  
  // All Renders
  // Next Render
  useEffect(() => {
    setNotifications([...Redux.state.ReceivedObject?.NotificationList])
  }, [Redux.state.ReceivedObject?.NotificationList])
  
  // Listening Socket Events
	const notificationHandler = useCallback(data => {
		// console.log("NOTIFICATION_CREATED", data)
		setNotifications([...notifications, data])
		setRealTimeNotifications([...realTimeNotifications, data])
	}, [notifications, realTimeNotifications])

	const eventHandler = {
		[NOTIFICATION_CREATED]: notificationHandler,
	}
  
	useSocketEvent(socket, eventHandler)

  // JSX
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative" variant="custom" size="icon" >
          <BellRing className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all" />
          {realTimeNotifications.length > 0 && 
            <div className='bg-red-600 w-5 h-5 absolute -right-2 -top-2 rounded-full flex justify-center items-center'> 
              <small className='text-white' >{realTimeNotifications.length < 10 ? realTimeNotifications.length : "9+"}</small>
            </div>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1" align="end">
        <Card className="border-none">
          <ScrollArea>
            <CardContent className="grid gap-1 px-2 pb-0 max-h-80">
              {notifications.length > 0 ? (
                <React.Fragment>
                  {notifications.map((each, index) => {
                    return (
                      <div key={index} className="-mx-2 flex items-start space-x-2 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                        <div className='w-5'>
                          <BellIcon className="mt-px h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{each.aSubtitle}</p>
                          <p className="text-sm text-muted-foreground">{each.aDescription}</p>
                        </div>
                      </div>
                    )
                  }).reverse()}
                  {/* <Link to={FinalRouteName.ContentRoute.SidebarRoute.SettingRoute.NotificationRoute.ListRoute}>
                    <div className="-mx-2 flex items-start space-x-2 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">View All</p>
                      </div>
                    </div> 
                  </Link> */}
                </React.Fragment>
                ) : (
                  <div className="-mx-2 flex items-start space-x-2 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">No Items Here</p>
                    </div>
                  </div>
                )
              }
            </CardContent>
          </ScrollArea>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

export default Notification