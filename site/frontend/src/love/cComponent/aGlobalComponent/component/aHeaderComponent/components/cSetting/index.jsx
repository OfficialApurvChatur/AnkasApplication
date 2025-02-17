import { Settings as SettingsIcon } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Link } from 'react-router-dom';
import React from 'react';

function getInitials(firstName, lastName) {
  // Extract the first character of the first name and last name
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  
  // Return the initials
  return `${firstInitial}${lastInitial}`;
}

const Setting = ({ Redux, LogoutAPICall }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="custom" size="icon">
          <SettingsIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 w-auto" align="end">
        {Redux.state.ReceivedObject?.ProfileRetrieve ? (
          <React.Fragment>
            <DropdownMenuLabel>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={Redux.state.ReceivedObject?.ProfileRetrieve?.eImage?.url} />
                  <AvatarFallback>{getInitials(
                    Redux.state.ReceivedObject?.ProfileRetrieve?.eFirstName, 
                    Redux.state.ReceivedObject?.ProfileRetrieve?.eLastName
                  )}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{`${Redux.state.ReceivedObject?.ProfileRetrieve?.eFirstName} ${Redux.state.ReceivedObject?.ProfileRetrieve?.eLastName}`}</p>
                  <p className="text-sm text-muted-foreground">{Redux.state.ReceivedObject?.ProfileRetrieve?.cRole?.aTitle}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/profile-retrieve">
                <DropdownMenuItem>
                  View Profile
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link to="/profile-update">
                <DropdownMenuItem>
                  Update Profile
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link to="/profile-password-update">
                <DropdownMenuItem>
                  Change Password
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link to="/profile-delete">
                <DropdownMenuItem>
                  Close Account
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => LogoutAPICall()}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </React.Fragment>
        ) : (
          <DropdownMenuGroup>
            <Link to="/login">
              <DropdownMenuItem>
                Sign In
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link to="/register">
              <DropdownMenuItem>
                Sign Up
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Setting