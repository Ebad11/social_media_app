"use client"

import React, { useEffect, useState } from 'react'
import { Add, Logout, Search } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { SignedIn, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'

const TopBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState('')
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Check screen size on initial load
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex gap-[2%] items-center mt-6'>

      <div className='relative w-[74%] max-md:w-[80%]'>
        <input type="text" className='search-bar' placeholder='Search Posts, People, ...' value={search} onChange={(e) => setSearch(e.target.value)} />
        <Search className='search-icon' onClick={() => { router.push(`/search/posts/${search}`) }} />
      </div>

      <button className='create-post-btn whitespace-nowrap w-[24%]' onClick={() => { router.push("/create-post") }}>
        <Add /><span>Create</span>
      </button>
      {
        isSmallScreen &&
        <div className="flex gap-3">
        <SignedIn>
          <SignOutButton>
            <div className='cursor-pointer flex md:hidden items-center'>
              <Logout sx={{ color: "white", fontSize: '32px' }} />
            </div>
          </SignOutButton>
        </SignedIn>


        <Link href="/">
          <Image src='/assets/phucmai.png' alt='profile-pic' width={50} height={50} className='rounded-full md:hidden'></Image>
        </Link>
      </div>
      }

    </div>
  )
}

export default TopBar