import { Button } from '@/components/ui/button';
import React from 'react'

function BaseModal({children, isOpen, setIsOpen} : any) {

  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <h1>BaseModal</h1>
      <Button onClick={() => {setIsOpen(false)}}>Close</Button>
      { children }
    </div>
  )
}

export default BaseModal