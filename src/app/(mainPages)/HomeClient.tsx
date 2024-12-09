'use client'


import React from 'react'
import { useGlobalContext } from '@/context/GlobalContext';
import Filter from '../components/filter/filter.compo';
import { postCriteriaIntentType } from '@/helper/post';
import { Gender } from '@/types/filter';

function HomeClient({ posts, filter, groups }: any) {
  const { openFilter } = useGlobalContext();

  return (
    <div>
      {openFilter 
        ?
        <Filter groups={groups} purpose={postCriteriaIntentType.FILTER} filterOff={filter?.filterOff} filterJson={filter?.filterJson || {
          "PostMood": "Happy",
          "UserAgeMin": 18,
          "UserAgeMax": 100,
          "UserGender": [Gender.Female, Gender.Male, Gender.NonBinary],
          "PostPurpose": []
        }} />
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