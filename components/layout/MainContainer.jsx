"use client"
import React from 'react'
import TopBar from './TopBar'
import { pageTitles } from '../../constants'
import { usePathname } from 'next/navigation'

const MainContainer = ({children}) => {
  //Get the current url path
  const currentPath = usePathname();
  const regex= /^\/([^\/]+)/;
  const firstPath= currentPath.match(regex)?currentPath.match(regex)[0]:currentPath;
  const title=pageTitles.find((page)=>page.url === firstPath)?.title || 'No title';
  console.log(title,"----")
  return (
      <section className='flex flex-col flex-1 max-w-3xl px-4 md:px-10 lg:px-4 xl:px-20'>
        <TopBar />
        <div className="mt-6 md-20">
          <h1 className='mb-5 text-heading2-bold max-sm:text-heading3-bold text-light-1'>
            {title}
          </h1>

          <div className='h-screen overflow-y-scroll custom-scrollbar'>
              {children}
          </div>
        </div>
      </section>
  )
}

export default MainContainer