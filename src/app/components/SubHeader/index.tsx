'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button';
import ButtonsContainer from './ButtonsContainer';
import PostDialog from '../posts/PostDialog';
import Link from 'next/link';
import { useGlobalContext } from '@/context/GlobalContext';

function SubHeader() {
  const { setOpenFilter } = useGlobalContext();

  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const termsButton = <Button>Term</Button>;
  const filtersButton = <Button onClick={() => setOpenFilter(true)}>Filter</Button>;
  const createPostButton = <Button onClick={() => {
    setIsOpen(!isOpen)
  }}>Create Post</Button>;
  const groupsButton = <Button>Groups</Button>;
  const hallsButton = <Button>Halls</Button>;
  const myChatsButton = <Button>My Chats</Button>;
  const profileButton = <Button>Profile</Button>;
  const profilePostButton = <Button>My Posts</Button>;
  const accountButton = <Button>Account</Button>;
  const projectButton = <Button>Project</Button>;

  const getSubHeader = () => {
    if (pathname.startsWith('/users')) {
      return (
        <ButtonsContainer>
          {filtersButton}
          {groupsButton}
        </ButtonsContainer>
      )
    }

    if (pathname.startsWith('/chat')) {
      return (
        <ButtonsContainer>
          {myChatsButton}
          {hallsButton}
        </ButtonsContainer>
      )
    }

    if (pathname.startsWith('/me')) {
      return (
        <ButtonsContainer>
          {profileButton}
          {profilePostButton}
          {accountButton}
        </ButtonsContainer>
      )
    }

    if (pathname.startsWith('/about')) {
      return (
        <ButtonsContainer>
        {termsButton}
        {projectButton}
        </ButtonsContainer>
      )
    }

    return (
      <ButtonsContainer>
          {filtersButton}
          {createPostButton}
      </ButtonsContainer>
    )
  }

  return (
    <div className='mb-10'>
      {/* <div>SubHeader: {pathname}</div> */}
      <div className='flex'>
          {getSubHeader()}
      </div>

      <PostDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default SubHeader