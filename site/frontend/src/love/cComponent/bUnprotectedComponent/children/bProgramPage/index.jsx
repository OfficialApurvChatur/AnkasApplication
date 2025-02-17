import { Button } from '@/components/ui/button';
import Loader from '@/love/cComponent/aGlobalComponent/component/cLoader';
import React, { Suspense, useState } from 'react'
import { Link } from 'react-router-dom';
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import parse from 'html-react-parser';


const ProgramPgeComponent = ({ Redux, ReduxUltimate }) => {
  return (
    <div className="bg-[#F2EDD7] dark:bg-[#755139] text-[#755139] dark:text-[#F2EDD7] lg:px-20">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium">{Redux.state.ReceivedObject?.Retrieve?.aTitle}</h1>
          <p className="mb-4 leading-relaxed">{Redux.state.ReceivedObject?.Retrieve?.aSubtitle}</p>
          <p className="mb-8 leading-relaxed">{Redux.state.ReceivedObject?.Retrieve?.aDescription}</p>
          <div className="flex flex-col items-center justify-center space-y-4 xl:flex-row sm:space-x-4 xl:space-y-0">
            {Redux.state.ReceivedObject?.Retrieve?.dWebLinks?.map((each, index) => (
              <Button asChild variant="custom" key={index} >
                <Link to={each?.url} target="_blank" rel="noreferrer" >
                  {each?.title === "Visit Application" ? (
                     <svg className="w-5 h-5 mr-2 cursor-pointer" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                     <circle cx="12" cy="12" r="3"></circle>
                   </svg>
                  ) : 
                  each?.title === "Visit Admin" ? (
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-2 cursor-pointer" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  ) :
                  each?.title === "Visit Code" ? (
                    <GitHubLogoIcon className="h-5 w-5 mr-2 cursor-pointer" />
                  ) : null}
                 
                  {each?.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src={Redux.state.ReceivedObject?.Retrieve?.aImage?.url || "https://dummyimage.com/720x600"} />
        </div>
      </div>

      {Redux.state.ReceivedObject?.Retrieve?.dGalleryImages?.length > 0 &&
        <div className="container mx-auto flex px-5 pt-5 pb-5 flex-col items-center">
          <ImageSliderComponent Redux={Redux} />
        </div>
      }

      {Redux.state.ReceivedObject?.Retrieve?.aDetail && 
        <div className="container mx-auto flex px-5 pt-5 pb-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-full flex flex-col md:items-start text-left mb-16 md:mb-0 items-center">
            <h1 className="title-font sm:text-3xl text-2xl mb-4 font-medium">Details</h1>
            <div className="mb-8 leading-relaxed">
              {parse(Redux.state.ReceivedObject?.Retrieve?.aDetail || "")}
            </div>
            
          </div>
        </div>
      }
    </div>
  )
}

export default ProgramPgeComponent