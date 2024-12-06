'use client'


import React from 'react'
import { useGlobalContext } from '@/context/GlobalContext';
import Filter from '../components/filter';
import { postCriteriaIntentType } from '@/helper/post';

function HomeClient({ posts, filter }: any) {
  const { openFilter } = useGlobalContext();

  return (
    <div>
      {openFilter 
        ?
        <Filter purpose={postCriteriaIntentType.FILTER} filter={filter} />
        :
        posts.map((post: any, index: number) => (
          <li
            key={index}
            className="text-lg text-gray-700 cursor-pointer hover:text-gray-900"
          >
            <p><strong>username</strong> - {post.user.username}</p>

            <p><strong>title</strong> - {post.title}</p>
            <p><strong>description</strong> - {post.description}</p>
            <p><strong>filterablePostAttributes</strong> - {post.filterablePostAttributes.postFilterDisplay}</p>
            <p><strong>postFilterQueryRole</strong> - {post.filterablePostAttributes.postFilterQueryRole}</p>
            <p><strong>mood</strong> - {post.filterablePostAttributes.mood}</p>
            
            <img src={post.image} width="200" height="100" />
          </li>
        ))
      }
    </div>
  )
}

export default HomeClient