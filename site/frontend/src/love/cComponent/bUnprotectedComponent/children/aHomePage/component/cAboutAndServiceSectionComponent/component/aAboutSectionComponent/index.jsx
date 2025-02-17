import { Separator } from "@/components/ui/separator";
import React from "react";
import parse from 'html-react-parser';

function AboutSectionComponent({ Redux }) {
  return (
    <React.Fragment>
      {/* About Section */}
      <section>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs tracking-widest font-medium title-font mb-1">GET TO KNOW</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font">About Us</h1>
          </div>

          <div className="flex flex-wrap -mx-4 -mb-10 text-center">
            <div className="p-4 md:w-1/2">
              <div className="flex rounded-lg h-full bg-[#755139] dark:bg-[#F2EDD7] text-[#F2EDD7] dark:text-[#755139] bg-opacity-60 p-8 flex-col">
                <div className="rounded-lg h-64 overflow-hidden">
                  <img alt="content" className="object-cover object-center h-full w-full" src={Redux.state.ReceivedObject?.Retrieve?.AboutRetrieve?.actually?.image?.url} />
                </div>
                <h2 className="title-font text-2xl font-medium mt-6 mb-3">
                  {Redux.state.ReceivedObject?.Retrieve?.AboutRetrieve?.actually?.title} 
                </h2>
                <div className="leading-relaxed text-base text-left">
                  {parse(Redux.state.ReceivedObject?.Retrieve?.AboutRetrieve?.actually?.description || "")}
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2">
              <div className="flex rounded-lg h-full bg-[#755139] dark:bg-[#F2EDD7] text-[#F2EDD7] dark:text-[#755139] bg-opacity-60 p-8 flex-col">
                <div className="rounded-lg h-64 overflow-hidden">
                  <img alt="content" className="object-cover object-center h-full w-full" src={Redux.state.ReceivedObject?.Retrieve?.AboutRetrieve?.comparatively?.image?.url} />
                </div>
                <h2 className="title-font text-2xl font-medium mt-6 mb-3">
                  {Redux.state.ReceivedObject?.Retrieve?.AboutRetrieve?.comparatively?.title} 
                </h2>
                <div className="leading-relaxed text-base text-left">
                  {parse(Redux.state.ReceivedObject?.Retrieve?.AboutRetrieve?.comparatively?.description || "")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-[#755139] dark:bg-[#F2EDD7]" />
    </React.Fragment>
  );
}

export default AboutSectionComponent;
