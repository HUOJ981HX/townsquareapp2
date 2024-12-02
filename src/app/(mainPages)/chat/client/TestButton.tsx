"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  sendMessageToGroupChat,
  sendPrivateMessageToUsers,
} from "@/helper/chat/server";

function TestButton() {
  return (
    <>
      <Button
        onClick={() =>
          sendPrivateMessageToUsers("2", ["1", "3", "4"], "indi msg")
        }
      >
        Message group indivi
      </Button>
      <Button
        onClick={() => sendMessageToGroupChat("2", ["4", "3"], "group all msg")}
      >
        Group all msg
      </Button>
    </>
  );
}

export default TestButton;
