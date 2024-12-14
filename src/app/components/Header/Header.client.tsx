"use client";

import { Button } from "@/components/ui/button";
import { postCriteriaIntentType } from "@/helper/post";
import { pusherClient } from "@/lib/pusher";
import { PusherChannel } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Header({ session }: any) {
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    console.log("uuuuuuuuuuuuuuuuuuuuu");
    console.log("sssssssssssssssssssssssss___binded");
    console.log(
      "sean_log session?.user?.id!: " + JSON.stringify(session?.user?.id!)
    );
    pusherClient.subscribe((session?.user?.id!).toString());

    pusherClient.bind(PusherChannel.Notification, (data: any) => {
      // update state to show notification here.d
      console.log("vvvvvvvvvvvvvvvvvvv");
      console.log("nnnnnnnnnnnnnnnnnnnnnnnnn");
      console.log("sean_log data: " + JSON.stringify(data));

      const parsedUrl = new URL(window.location.href);
      const paths = parsedUrl.pathname.split('/').filter(segment => segment); // ["chat","1,2,3,4,5"]

      console.log('sean_log paths: ' + JSON.stringify(paths));
      console.log('sean_log data.chatId: ' + JSON.stringify(data.chatId));
      console.log('sean_log typeof : ' + typeof data.chatId);

      console.log('sean_log paths[0]: ' + JSON.stringify(paths[0]));
      console.log('sean_log typeof : ' + typeof paths[0]);

      console.log('sean_log paths[1]: ' + JSON.stringify(paths[1]));
      console.log('sean_log typeof : ' + typeof paths[1]);
 

      console.log(paths[0] !== "chat");
      console.log(paths[1] !== data.chatId);

      if(paths[0] !== "chat" || paths[1] !== data.chatId) {
        console.log('nnnnnnnnnnnnnnnnnnnnnnnnn');
        console.log('nnnnnnnnnnnnnnnnnnnnnnnnn');
        setNotification((prev) => prev + 1);
      }

    });

    return () => pusherClient.unsubscribe(session?.user?.id!);
  }, []);

  // useEffect(() => {
  //   // pusherClient.subscribe(convo!.id);
  //   pusherClient.subscribe("8cd435e1-6190-4553-b965-512d37bdac0c");

  //   pusherClient.bind("convo-message", (data: any) => {
  //     console.log('yyyyyyyyyyyyyyyyyyyyy');
  //     console.log('yyyyyyyyyyyyyyyyyyyyy');
  //     console.log('yyyyyyyyyyyyyyyyyyyyy');
  //   });

  //   // return () => pusherClient.unsubscribe(convo!.id);
  //   return () => pusherClient.unsubscribe("8cd435e1-6190-4553-b965-512d37bdac0c");
  // }, []);

  return (
    <div className="flex w-full justify-evenly">
      <Link
        href={{
          pathname: "/",
        }}
      >
        Feed
      </Link>

      <Link
        href={{
          pathname: "/users",
        }}
      >
        Users
      </Link>

      <div>
        <Link
          href={{
            pathname: "/chat",
          }}
        >
          Chat
        </Link>
        <p>{notification}</p>
      </div>

      <Link
        href={{
          pathname: "/me",
        }}
      >
        Me
      </Link>

      {/* <Link href={{
        pathname: '/about',
      }}>About</Link> */}
      {/* <Button>Notice</Button> */}
    </div>
  );
}

export default Header;
