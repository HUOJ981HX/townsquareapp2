"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  sendMessageToGroupChat,
  sendPrivateMessageToUsers,
} from "@/helper/realtime/chat";

function TestButton({groups}: any) {

  // [
  //   {
  //     "id": "be0ab1d1-4691-444b-af6f-3c7b7a48ab83",
  //     "name": "group alice, cindy",
  //     "createdAt": "2024-12-03T03:05:04.315Z",
  //     "updatedAt": "2024-12-03T03:05:04.315Z",
  //     "userId": "2",
  //     "userGroups": [
  //       {
  //         "id": 2,
  //         "userId": "3",
  //         "groupId": "be0ab1d1-4691-444b-af6f-3c7b7a48ab83"
  //       }
  //     ]
  //   },
  //   {
  //     "id": "d838f99b-3a5e-4c6e-8f82-12102a2ba104",
  //     "name": "group empty",
  //     "createdAt": "2024-12-03T03:05:04.320Z",
  //     "updatedAt": "2024-12-03T03:05:04.320Z",
  //     "userId": "2",
  //     "userGroups": []
  //   }
  // ]
  

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
