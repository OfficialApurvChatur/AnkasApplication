import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import brand from '@/love/dFunction/gBrand';
import FinalRouteName from '@/love/gRoute/FinalRouteName';


const docsConfig = () => ({
  mainNav: [
    {href: "sadsa", title: "Home"},
    {href: "sqweadsa", title: "Our Statistics"},
    {href: "sqweadsa", title: "About Us"},
    {href: "sqweadsa", title: "Our Services"},
    {href: "sqweadsa", title: "Our Branchs"},
    {href: "sqweadsa", title: "Our Projects"},
  ],
})

function MobileLink({ href, onOpenChange, className, children, ...props }) {
  return (
    <Link
      to={href}
      onClick={() => {
        // router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

const MobileNav = ({ ReduxUltimate }) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <img src={brand().logo} alt="Logo" className="h-8 w-8" />
          <span className="sr-only">{brand().name}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <img src={brand().logo} alt="Logo" className="mr-2 h-8 w-8" />
          <span className="font-bold">{brand().name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {docsConfig(ReduxUltimate)?.mainNav?.map(item => item.href && (
              <MobileLink
                key={item.href}
                href={item.href}
                onOpenChange={setOpen}
              >
                {item.title}
              </MobileLink>
            ) )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav