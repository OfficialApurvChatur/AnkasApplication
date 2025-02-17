import { Separator } from "@/components/ui/separator";
import React from "react";
import parse from 'html-react-parser';


function ServiceSectionComponent({ Redux }) {
  return (
    <React.Fragment>
      {/* Service Section */}
      <section>
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs tracking-widest font-medium title-font mb-1">WHAT WE PROVIDE</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font">Our Services</h1>
          </div>
          
          <div className="flex flex-wrap -m-4">
            {Redux.state.ReceivedObject?.Retrieve?.ServiceList?.map((each, index) => {
              return (
                <React.Fragment key={index} >
                  <div className="p-4 md:w-1/2">
                    <div className="flex rounded-lg h-full bg-[#755139] dark:bg-[#F2EDD7] text-[#F2EDD7] dark:text-[#755139] bg-opacity-60 p-8 flex-col">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#F2EDD7] dark:bg-[#755139] text-[#755139] dark:text-[#F2EDD7] flex-shrink-0">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                          </svg>
                        </div>
                        <h2 className="text-lg title-font font-medium">{each?.title}</h2>
                      </div>
                      <div className="flex-grow">
                        <div className="leading-relaxed text-base">{parse(each?.description || "")}</div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </section>

      <Separator className="bg-[#755139] dark:bg-[#F2EDD7]" />
    </React.Fragment>
  );
}

export default ServiceSectionComponent;
