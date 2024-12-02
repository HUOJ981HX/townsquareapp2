'use client'

import React from 'react'
import { Button } from "@/components/ui/button";
import { sendPrivateMessageToUsers } from "@/helper/chat/server";

function TestButton() {
  return (
    <Button onClick={() => sendPrivateMessageToUsers("2", ["1","3", "4"], "group msg")}>Message group indivi</Button>
  )
}

export default TestButton