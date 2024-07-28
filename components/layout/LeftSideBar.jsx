"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Menu from './Menu'
import { SignedIn, SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import { Logout } from '@mui/icons-material';
import { dark } from '@clerk/themes';
import Loader from '../Loader';


const LeftSideBar = () => {

  const {user, isLoaded} = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    console.log(user);
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    console.log("data:",data)
    setUserData(data);
    setLoading(false);
  }


  useEffect(() => {
    console.log(user)
    if(user) {
     getUser();
    }
  }, [user])

  
  console.log("-----",user);

  return loading || !isLoaded ? <Loader/> :  (
    <div className='h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden custom-scrollbar'>
      <Link href='/'>
        <Image src='/assets/logo.png' alt='logo' width={200} height={200} />
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center text-light-1">
          <Link href='/'>
            <Image src={userData?.profilePhoto} className='rounded-full' alt='profile photo' width={50} height={50} />
          </Link>
          <p className='text-small-bold'>{userData?.firstName} {userData?.lastName}</p>
        </div>
        <div className="flex justify-between text-light-1">
          <div className="flex flex-col items-center">
            <p className='text-base-bold'>{userData?.posts?.length}</p>
            <p className='text-tiny-medium' >Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className='text-base-bold'>{userData?.followers?.length}</p>
            <p className='text-tiny-medium' >Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className='text-base-bold'>{userData?.following?.length}</p>
            <p className='text-tiny-medium' >Following</p>
          </div>
        </div>
      </div>

      <hr />

      <Menu />

      <hr />

      <div className='flex gap-4 items-center'>
        <UserButton appearance={{baseTheme:dark}}/>
        <p className='text-light-1 text-body-bold'>Manage Account</p>
      </div>

      <SignedIn>
        <SignOutButton redirectUrl='/sign-in'>
          <div className='cursor-pointer flex gap-4 items-center'>
            <Logout sx={{ color: "white", fontSize: '32px' }} />
            <p className='text-body-bold text-light-1'>Log Out</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </div>
  )
}

export default LeftSideBar;