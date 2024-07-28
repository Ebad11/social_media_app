"use client"
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import PostCard from '../../components/cards/PostCard';
import { useUser } from '@clerk/nextjs';

const Home = () => {

  const [loading, setLoading] = useState(true);
  const [feedPost, setFeedPost] = useState([]);
  const {user, isLoaded} = useUser();

  const getFeedPost = async () => {
    const response = await fetch('/api/post');
    const data = await response.json();
    setFeedPost(data);
    setLoading(false);
  }

  useEffect(() => {
    getFeedPost();
  }, [])
  return loading || !isLoaded ? <Loader/> : (
    
    <div className='flex flex-col gap-10'>
      {
        feedPost.map((post)=>(
         <PostCard
          key={post._id}
          post={post}
          creator={post.creator}
          loggedInUser={user}
         />
        ))
      }
    </div>
  )
}

export default Home;

