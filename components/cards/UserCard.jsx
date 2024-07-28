"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { PersonAddAlt, PersonRemove } from '@mui/icons-material'


const UserCard = ({userData}) => {

    const {user, isLoaded} = useUser()
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState({});

    const getUser = async () =>{

        const response = await fetch(`/api/user/${user.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setUserInfo(data);
        setLoading(false);
    }

    useEffect(() => {
        if(user) getUser();
    }, [user])


    const isFollowing =userInfo?.following?.find((item)=>item._id==userData._id)
    


  return !isLoaded? <Loader/>:(
    <div className='flex justify-between items-center'>
        <div className="flex gap-4 items-center">
            <Image src={userData.profilePhoto} alt='profile photo' width={50} height={50} className='rounded-full'/>
            <div className='flex flex-col gap-1'>
                <p className='text-small-semibold text-light-1'>{userData.firstName} {userData.lastName}</p>
                <p className='text-subtle-medium text-light-3'>@{userData.userName}</p>
            </div>
        </div>

        {user.id !== userData.clerkId && (
            isFollowing?(
                <PersonRemove sx={{color:"#7857FF", cursor:"pointer"}} />
            ):
            (
            <PersonAddAlt sx={{color:'#7857FF', cursor: 'pointer'}}/>
            )
            )}
    </div>
  )
}

export default UserCard