import React from 'react'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { Link, useLocation  } from 'react-router-dom'
import brand from '@/love/dFunction/gBrand'
import { Separator } from '@/components/ui/separator'
import FinalRouteName from '@/love/gRoute/FinalRouteName'


const DesktopNav = () => {
  let { pathname } = useLocation();

  return (
    <div className="mr-4 hidden lg:flex">
      <Link to={FinalRouteName.GlobalRoute.HomeRoute} className="mr-6 flex items-center space-x-2">
        <img src={brand().logo} alt="Logo" className="h-8 w-8" />
        <span className="hidden font-bold sm:inline-block">
          {brand().name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/docs"
        >
          Home
        </Link>
        <Link
          href="/docs/components"
        >
          Our Statistics
        </Link>
        <Link
          href="/themes"
        >
          About Us
        </Link>
        <Link
          href="/examples"
        >
          Our Services
        </Link>
        <Link
          href={"siteConfig.links.github"}
        >
          Our Branchs
        </Link>
        <Link
          href={"siteConfig.links.github"}
        >
          Our Projects
        </Link>
      </nav>
    </div>
  )
}

export default DesktopNav