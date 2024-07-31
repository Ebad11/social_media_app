"use client"
import React, { useEffect, useState } from 'react'
import ProfileCard from '../../../../../components/cards/ProfileCard'
import { useParams } from 'next/navigation';
import Loader from '../../../../../components/Loader';
import PostCard from '../../../../../components/cards/PostCard';
import { useUser } from '@clerk/nextjs';

const Profile = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const getUser = async  () =>
  {
    const response = await fetch(`/api/user/profile/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  }

    useEffect(() => {
      
        getUser();

    }, [id]);

  
  const {user, isLoaded}= useUser();
    
  return loading || !isLoaded?<Loader /> : (
    <div className="flex flex-col gap-9">
    <ProfileCard userData={userData} activeTab="Posts" />

    <div className="flex flex-col gap-9">
      {userData?.posts?.map((post)=>(
        <PostCard key={post._id} post={post} creator={post.creator} loggedInUser={user}/>
      ))}
    </div>
    </div>
  )
}

export default Profile;