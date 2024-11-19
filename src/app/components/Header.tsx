import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex'>
        <p>Terms</p>

        {/* post and users page */}
        <Link href={"/filter"}>Filter</Link>
        {/* <p>Filter</p> */}
        {/* post page */}
        <p>Post</p> 

        {/* Users page */}
        <p>Groups</p>
    </div>
  )
}

export default Header