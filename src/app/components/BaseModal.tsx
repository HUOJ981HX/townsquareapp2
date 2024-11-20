import React from 'react'

function BaseModal({children, isOpen, setIsOpen} : any) {

  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <h1>Modal</h1>
      { children }
    </div>
  )
}

export default BaseModal