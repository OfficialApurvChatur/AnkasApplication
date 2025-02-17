import { Separator } from "@/components/ui/separator";
import React from "react";

function CounterSectionComponent({ Redux }) {
  return (
    <React.Fragment>
      {/* Counter Section */}
      <section>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs tracking-widest font-medium title-font mb-1">KNOW OUR SCORE</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font">Our Statistics</h1>
          </div>          
          <div className="flex flex-wrap -m-4 text-center">
            {Redux.state.ReceivedObject?.Retrieve?.CounterList?.map((each, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div className="bg-[#755139] dark:bg-[#F2EDD7] text-[#F2EDD7] dark:text-[#755139] bg-opacity-60 px-4 py-6 rounded-lg">
                      {
                        each.title === "Frontend Application Deployed" ? (
                          <div className="w-12 h-12 mb-3 inline-flex items-center justify-center rounded-full bg-[#F2EDD7] dark:bg-[#755139] text-[#755139] dark:text-[#F2EDD7] flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                            </svg>
                          </div>
                        ) : 
                        each.title === "Backend Applications Established" ? (
                          <div className="w-12 h-12 mb-3 inline-flex items-center justify-center rounded-full bg-[#F2EDD7] dark:bg-[#755139] text-[#755139] dark:text-[#F2EDD7] flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                          </div>
                        ) :
                        each.title === "Admin Applications Published" ? (
                          <div className="w-12 h-12 mb-3 inline-flex items-center justify-center rounded-full bg-[#F2EDD7] dark:bg-[#755139] text-[#755139] dark:text-[#F2EDD7] flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                          </div>
                        ) : (
                          <div className="w-12 h-12 mb-3 inline-flex items-center justify-center rounded-full bg-[#F2EDD7] dark:bg-[#755139] text-[#755139] dark:text-[#F2EDD7] flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                              <path d="M8 17l4 4 4-4m-4-5v9"></path>
                              <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                            </svg>
                          </div>
                        )
                      }
                      <h2 className="title-font font-medium text-3xl">{each.subtitle}</h2>
                      <p className="leading-relaxed font-medium mb-2">{each.title}</p>
                      <p className="leading-relaxed text-base">{each.description}</p>
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

export default CounterSectionComponent;
