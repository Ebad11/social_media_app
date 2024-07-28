"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from '../../../../../components/Loader'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import PostCard from '../../../../../components/cards/PostCard'
import UserCard from '../../../../../components/cards/UserCard'


const SearchPeople = () => {
    const {query} = useParams()

    const {user, isLoaded} = useUser();

    const [loading, setLoading] = useState(true);
    const [searchedPeople, setSearchedPeople] =useState([]);

    const getSearchedPeople= async() =>{
        const response= await fetch(`/api/user/search/${query}`)
        const data = await response.json();
        setSearchedPeople(data);
        setLoading(false);
    }

    useEffect(() => {
        getSearchedPeople();
    }, [query])
    
  return loading || !isLoaded ? <Loader /> : (

    <div className="flex flex-col gap-10">
        <div className="flex gap-6">
            <Link className='tab bg-dark-2' href={`/search/posts/${query}`}>
                Posts
            </Link>
            <Link className='tab bg-purple-1' href={`/search/people/${query}`}>
                People
            </Link>
        </div>

        {searchedPeople.map((person)=>(
            <UserCard
                key={person._id}
                userData={person}
            />
        ))}
    </div>
    
  )
}


export default SearchPeople;