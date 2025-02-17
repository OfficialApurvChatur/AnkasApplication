import React, { useEffect, useRef } from 'react'
import handleInput from '@/love/dFunction/dHandleInput';
import { Separator } from '@/components/ui/separator';
import { 
  PlusIcon,
  MinusCircledIcon,
} from "@radix-ui/react-icons"
import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


const ProfileUpdateComponent = ({ Redux, EventHandler, OnClick }) => {
  const inputElement1 = useRef()
  const inputElement2 = useRef()

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
              </div>
            </div>
          </div>
        </div>
        <Separator className="bg-[#755139] dark:bg-[#F2EDD7]" />
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4">

            <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border border-[#755139] dark:border-[#F2EDD7] flex flex-col relative overflow-hidden">
                <h1 className="text-2xl pb-4 mb-4 border-b border-[#755139] dark:border-[#F2EDD7] leading-none">Critical Information</h1>
                
                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">Profile Picture</label>
                    <div className='mb-2 mt-1 flex flex-1 space-x-4 items-center'>
                      <p>
                        <Avatar>
                          <AvatarImage src={Redux.state.FormObject?.FormValue?.image?.url} />
                          <AvatarFallback className="bg-[#755139] dark:bg-[#F2EDD7] text-[#F2EDD7] dark:text-[#755139]">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </AvatarFallback>
                        </Avatar>
                      </p>
                      <Button variant="custom" onClick={() => inputElement1.current.click()}>
                        Choose Profile Picture
                      </Button>
                    </div>
                    <input 
                      type="file" 
                      name="image" 
                      className="hidden" 
                      ref={inputElement1} 
                      onChange={event => handleInput(event, Redux)} 
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["image"]}</label>
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">First Name</label>
                    <input 
                      className="w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='firstName'
                      label='First Name'
                      placeholder='First Name' 
                      onChange={event => handleInput(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.firstName}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["firstName"]}</label>
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">Last Name</label>
                    <input 
                      className="w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='lastName'
                      label='Last Name'
                      placeholder='Last Name' 
                      onChange={event => handleInput(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.lastName}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["lastName"]}</label>
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">Email</label>
                    <input 
                      className="w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='email' 
                      name='email'
                      label='Email'
                      placeholder='Email' 
                      disabled
                      onChange={event => handleInput(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.email}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["email"]}</label>
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">Mobile</label>
                    <input 
                      className="w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='mobile'
                      label='Mobile'
                      placeholder='Mobile' 
                      onChange={event => handleInput(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.mobile}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["mobile"]}</label>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border border-[#755139] dark:border-[#F2EDD7] flex flex-col relative overflow-hidden">
                <h1 className="text-2xl pb-4 mb-4 border-b border-[#755139] dark:border-[#F2EDD7] leading-none">Basic Information</h1>

                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">Cover Image</label>
                    <div className='mb-2 mt-1 flex flex-1 space-x-4 items-center'>
                      <p>
                        <Avatar>
                          <AvatarImage src={Redux.state.FormObject?.FormValue?.coverImage?.url}/>
                          <AvatarFallback className="bg-[#755139] dark:bg-[#F2EDD7] text-[#F2EDD7] dark:text-[#755139]">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </AvatarFallback>
                        </Avatar>
                      </p>
                      <Button variant="custom" onClick={() => inputElement2.current.click()}>
                        Choose Cover Image
                      </Button>
                    </div>
                    <input 
                      type="file" 
                      name="coverImage" 
                      className="hidden" 
                      ref={inputElement2} 
                      onChange={event => handleInput(event, Redux)} 
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["firstName"]}</label>
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">Title</label>
                    <input 
                      className="w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='title'
                      label='Title'
                      placeholder='Title' 
                      onChange={event => handleInput(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.title}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["title"]}</label>
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">Subtitle</label>
                    <input 
                      className="w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='subtitle'
                      label='Subtitle'
                      placeholder='Subtitle' 
                      onChange={event => handleInput(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.subtitle}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["subtitle"]}</label>
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">Description</label>
                    <textarea
                      rows="5" 
                      className="w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='description'
                      label='Description'
                      placeholder='Description' 
                      onChange={event => handleInput(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.description}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["description"]}</label>
                  </div>
                </div>

              </div>
            </div>

            <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border border-[#755139] dark:border-[#F2EDD7] flex flex-col relative overflow-hidden">
                <h1 className="text-2xl pb-4 mb-4 border-b border-[#755139] dark:border-[#F2EDD7] leading-none">More Information</h1>

                <div className="w-full mb-2">
                  <div className="relative">
                    <label className="leading-7 text-sm">Address</label>
                    <input 
                      className="mb-2 w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='lane'
                      label='Lane'
                      placeholder='Lane' 
                      onChange={event => EventHandler.Address.Change(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.address?.lane}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["title"]}</label>
                    <input 
                      className="mb-2 w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='street'
                      label='Street'
                      placeholder='Street' 
                      onChange={event => EventHandler.Address.Change(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.address?.street}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["title"]}</label>
                    <input 
                      className="mb-2 w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='city'
                      label='City'
                      placeholder='City' 
                      onChange={event => EventHandler.Address.Change(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.address?.city}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["title"]}</label>
                    <input 
                      className="mb-2 w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='state'
                      label='State'
                      placeholder='State' 
                      onChange={event => EventHandler.Address.Change(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.address?.state}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["title"]}</label>
                    <input 
                      className="mb-2 w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='country'
                      label='Country'
                      placeholder='Country' 
                      onChange={event => EventHandler.Address.Change(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.address?.country}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["title"]}</label>
                    <input 
                      className="mb-2 w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                        border-[#755139] dark:border-[#F2EDD7]
                        focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                        focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                        focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                        focus:ring-2 
                        focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                        text-[#755139] dark:text-[#F2EDD7] 
                        text-base outline-none 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                      " 
                      type='text' 
                      name='pinCode'
                      label='Pin Code'
                      placeholder='Pin Code' 
                      onChange={event => EventHandler.Address.Change(event, Redux)}
                      value={Redux.state.FormObject?.FormValue?.address?.pinCode}
                    />
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["title"]}</label>
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="relative">
                    <div className='flex items-center justify-between mb-1'>
                      <label className="leading-7 text-sm">Links</label>
                      <Button variant="custom" size="icon" onClick={() => EventHandler.Link.Add(Redux)} >
                        <PlusIcon className="h-4 w-4" /> 
                      </Button>
                    </div>
                    {Redux.state.FormObject.FormValue?.links?.map((each, index) => {
                      return (
                        <React.Fragment key={index}>
                          <input 
                            className="mb-2 w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                              border-[#755139] dark:border-[#F2EDD7]
                              focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                              focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                              focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                              focus:ring-2 
                              focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                              text-[#755139] dark:text-[#F2EDD7] 
                              text-base outline-none 
                              py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                            " 
                            type='text' 
                            name='title'
                            label='Title'
                            placeholder='Title' 
                            onChange={event => EventHandler.Link.Change(event, Redux, index)}
                            value={each?.title}
                          />
                          <input 
                            className="mb-2 w-full bg-[#F2EDD7] dark:bg-[#755139] bg-opacity-40 rounded border 
                            border-[#755139] dark:border-[#F2EDD7]
                            focus:border-[#F2EDD7] dark:focus:border-[#755139] 
                            focus:bg-[#755139] dark:focus:bg-[#F2EDD7] 
                            focus:text-[#F2EDD7] dark:focus:text-[#755139] 
                            focus:ring-2 
                            focus:ring-[#755139] dark:focus:ring-[#F2EDD7] 
                            text-[#755139] dark:text-[#F2EDD7] 
                            text-base outline-none 
                            py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                          " 
                            type='text' 
                            name='url'
                            label='URL'
                            placeholder='URL' 
                            onChange={event => EventHandler.Link.Change(event, Redux, index)}
                            value={each?.url}
                          />
                          <Button variant="destructive" className="mb-2 w-full" onClick={() => EventHandler.Link.Remove(Redux, index)} >
                            <MinusCircledIcon className="mr-2 h-4 w-4" /> Remove Link
                          </Button>                         
                        </React.Fragment>
                      )
                    })}
                    <label className="leading-7 text-sm text-red-500">{Redux.state.FormObject.FormError?.["subtitle"]}</label>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <Button variant="custom" className="mt-8" onClick={OnClick}>
            Update Profile
          </Button>
        </div>
      </section>
    </React.Fragment>
  )
}

export default ProfileUpdateComponent