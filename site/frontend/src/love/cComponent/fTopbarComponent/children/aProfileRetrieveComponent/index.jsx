import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import FinalRouteName from '@/love/gRoute/FinalRouteName';
import { Separator } from '@/components/ui/separator';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';


function getInitials(firstName, lastName) {
  // Extract the first character of the first name and last name
  const firstInitial = firstName?.charAt(0).toUpperCase();
  const lastInitial = lastName?.charAt(0).toUpperCase();
  
  // Return the initials
  return `${firstInitial}${lastInitial}`;
}


const ProfileRetrieveComponent = ({ Redux }) => {
  // JSX
  return (
    <React.Fragment>
      <section className="bg-[#F2EDD7] dark:bg-[#755139] text-[#755139] dark:text-[#F2EDD7] lg:px-20">
        <div className="container px-5 py-12 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img alt="content" className="object-cover object-center h-full w-full" src={Redux.state.ReceivedObject?.Retrieve?.coverImage?.url || "https://picsum.photos/seed/picsum/1200/500"} />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-[#755139] dark:bg-[#F2EDD7] text-[#F2EDD7] dark:text-[#755139]">
                  {Redux.state.ReceivedObject?.Retrieve?.image ? 
                    <img alt="content" className="object-cover object-center rounded-full" src={Redux.state.ReceivedObject?.Retrieve?.image?.url} />
                    :
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  }
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-lg">
                    {Redux.state.ReceivedObject?.Retrieve?.firstName} {" "}
                    {Redux.state.ReceivedObject?.Retrieve?.lastName}
                  </h2>
                  <div className="w-12 h-1 bg-[#755139] dark:bg-[#F2EDD7] rounded mt-2 mb-4"></div>
                  <p className="text-base">{Redux.state.ReceivedObject?.Retrieve?.subtitle}</p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-[#755139] dark:border-[#F2EDD7] sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4">{Redux.state.ReceivedObject?.Retrieve?.description}</p>
                <Button asChild variant="custom" >
                  <Link to={FinalRouteName.ContentRoute.TopbarRoute.ProfileUpdateRoute}>
                    Edit Profile
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>                  
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Separator className="bg-[#755139] dark:bg-[#F2EDD7]" />
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4">

            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border border-[#755139] dark:border-[#F2EDD7] flex flex-col relative overflow-hidden">
                <h1 className="text-2xl pb-4 mb-4 border-b border-[#755139] dark:border-[#F2EDD7] leading-none">Critical Information</h1>

                <p className="font-bold">Profile Image:</p>
                <p className="mb-2">
                  <Avatar>
                    <AvatarImage src={Redux.state.ReceivedObject?.Retrieve?.image?.url} />
                    <AvatarFallback className="bg-[#755139] dark:bg-[#F2EDD7] text-[#F2EDD7] dark:text-[#755139]">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                </p>

                <p className="font-bold">First Name:</p>
                <p className="mb-2">{Redux.state.ReceivedObject?.Retrieve?.firstName}</p>
                
                <p className="font-bold">Last Name:</p>
                <p className="mb-2">{Redux.state.ReceivedObject?.Retrieve?.lastName}</p>
                
                <p className="font-bold">Email:</p>
                <p className="mb-2">{Redux.state.ReceivedObject?.Retrieve?.email}</p>
                
                <p className="font-bold">Mobile:</p>
                <p className="mb-2">{Redux.state.ReceivedObject?.Retrieve?.mobile}</p>
              </div>
            </div>

            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border border-[#755139] dark:border-[#F2EDD7] flex flex-col relative overflow-hidden">
                <h1 className="text-2xl pb-4 mb-4 border-b border-[#755139] dark:border-[#F2EDD7] leading-none">Basic Information</h1>

                <p className="font-bold">Cover Image:</p>
                <p className="mb-2">
                  <Avatar>
                    <AvatarImage src={Redux.state.ReceivedObject?.Retrieve?.coverImage?.url} />
                    <AvatarFallback className="bg-[#755139] dark:bg-[#F2EDD7] text-[#F2EDD7] dark:text-[#755139]">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                </p>

                <p className="font-bold">Title:</p>
                <p className="mb-2">{Redux.state.ReceivedObject?.Retrieve?.title}</p>
                
                <p className="font-bold">Subtitle:</p>
                <p className="mb-2">{Redux.state.ReceivedObject?.Retrieve?.subtitle}</p>
                
                <p className="font-bold">Description:</p>
                <p className="mb-2">{Redux.state.ReceivedObject?.Retrieve?.description}</p>
              </div>
            </div>

            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border border-[#755139] dark:border-[#F2EDD7] flex flex-col relative overflow-hidden">
                <h1 className="text-2xl pb-4 mb-4 border-b border-[#755139] dark:border-[#F2EDD7] leading-none">Relation Information</h1>
                
                <p className="font-bold">Role:</p>
                <p className="mb-2">{Redux.state.ReceivedObject?.Retrieve?.role?.aTitle}</p>

              </div>
            </div>

            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border border-[#755139] dark:border-[#F2EDD7] flex flex-col relative overflow-hidden">
                <h1 className="text-2xl pb-4 mb-4 border-b border-[#755139] dark:border-[#F2EDD7] leading-none">More Information</h1>

                <p className="font-bold">Address:</p>
                <p className="mb-2">
                  {Redux.state.ReceivedObject?.Retrieve?.address ? `
                    ${Redux.state.ReceivedObject?.Retrieve?.address?.lane}, 
                    ${Redux.state.ReceivedObject?.Retrieve?.address?.street}, 
                    ${Redux.state.ReceivedObject?.Retrieve?.address?.city}, 
                    ${Redux.state.ReceivedObject?.Retrieve?.address?.state}, 
                    ${Redux.state.ReceivedObject?.Retrieve?.address?.country}, 
                    ${Redux.state.ReceivedObject?.Retrieve?.address?.pinCode}, 
                  ` : '-'
                  }
                </p>
                
                <p className="font-bold">Links:</p>
                <p className="mb-2">
                  {Redux.state.ReceivedObject?.Retrieve?.links?.map((each, index) => {
                    return (
                      <React.Fragment key={index} >
                        <a className='underline' href={each?.url} target="_blank" rel="noreferrer" ml={2}>{each?.title}</a> <br/>
                      </React.Fragment>
                    )
                  })}
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default ProfileRetrieveComponent