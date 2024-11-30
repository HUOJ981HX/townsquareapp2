'use client'


import React from 'react'
import { useGlobalContext } from '@/context/GlobalContext';
import Filter from '../components/filter';
import { postCriteriaIntentType } from '@/helper/post';

function HomeClient({ posts }: any) {
  const { openFilter } = useGlobalContext();

  return (
    <div>
  
      {openFilter 
        ?
        <Filter purpose={postCriteriaIntentType.FILTER} />
        :
        posts.map((post: any, index: number) => (
          <li
            key={index}
            className="text-lg text-gray-700 cursor-pointer hover:text-gray-900"
          >
            {post.title}
            <img src={post.image} width="200" height="100" />
          </li>
        ))
      }
    </div>
  )
}

export default HomeClient