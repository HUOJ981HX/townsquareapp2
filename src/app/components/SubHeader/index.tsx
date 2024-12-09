'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button';
import ButtonsContainer from './ButtonsContainer';
import PostDialog from '../posts/PostDialog';
import Link from 'next/link';
import { useGlobalContext } from '@/context/GlobalContext';
import GroupChatDialog from '@/app/(mainPages)/chat/components/GroupChatDialog';
import prisma from '@/lib/prisma';
import { useSession } from "next-auth/react";

function SubHeader() {
  const { setOpenFilter } = useGlobalContext();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [groups, setGroups] = useState([]);

  const pathname = usePathname();

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch('/api/groups')
      const data = await response.json()
      setGroups(data)
    }

    if (pathname.startsWith('/chat')) {
      fetchGroups()
    };

  }, [pathname])

  // useEffect(() => {

  //   console.log('uuuuuuuuuuuuuuuuuuuuu');
  //   console.log('uuuuuuuuuuuuuuuuuuuuu');
  //   console.log('uuuuuuuuuuuuuuuuuuuuu');
  //   const fetchGroup = async () => {
  //     const groups = await prisma.group.findMany({
  //       where: {
  //         userId: session?.user?.id,
  //       },
  //       include: {
  //         userGroups: true, 
  //       },
  //     });

  //     console.log('ggggggggggggggggggggggg');
  //     console.log('ggggggggggggggggggggggg');
  //     console.log('ggggggggggggggggggggggg');
  //     console.log('sean_log groups: ' + JSON.stringify(groups));
  //   }

  //   fetchGroup();
  // }, [])
  

  const termsButton = <Button>Term</Button>;
  const filtersButton = <Button onClick={() => setOpenFilter(true)}>Filter</Button>;
  const createPostButton = <Button onClick={() => {
    // setIsOpen(!isOpen)
    setModalName("postDialog")
  }}>Create Post</Button>;
  const groupsButton = <Button>Groups</Button>;
  const hallsButton = <Button><Link href={"/chat/halls"}>Halls</Link></Button>;
  const messageGroups = <Button onClick={() => {
    setModalName("groupChatDialog")
  }}>Message Groups</Button>
  const myChatsButton = <Button><Link href={"/chat"}>My Chats</Link></Button>;
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
          {messageGroups}
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

  const getModal = () => {
    if (modalName === "postDialog") {
      return <PostDialog modalName={modalName} setModalName={setModalName} />
    }

    if (modalName === "groupChatDialog") {
      return <GroupChatDialog modalName={modalName} setModalName={setModalName} groups={groups} />
    }

    return null;
  }

  return (
    <div className='mb-10'>
      {/* <div>SubHeader: {pathname}</div> */}
      <div className='flex'>
          {getSubHeader()}
      </div>

      {getModal()}
      {/* <PostDialog isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </div>
  )
}

export default SubHeader