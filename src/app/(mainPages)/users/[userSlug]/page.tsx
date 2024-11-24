import Link from 'next/link';
import Image from 'next/image';
import Users from '@/app/components/users/Users';
import prisma from '@/lib/prisma';


export default async function UserPage({ params } : any) {

  const userSlug = (await params).userSlug;


  const user = await prisma.user.findMany({
    where: {
        publicId: userSlug,
    },
    include: {
        userAttributes: true, // Join and include UserAttributes
    },
  });

  console.log('sean_log ___: ' + JSON.stringify(user));

  return (   
    <>
        <Users users={user} />
    </>
  );
}
