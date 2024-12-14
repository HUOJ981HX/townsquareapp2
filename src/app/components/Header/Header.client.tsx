"use client";

import { Button } from "@/components/ui/button";
import { postCriteriaIntentType } from "@/helper/post";
import { pusherClient } from "@/lib/pusher";
import { PusherChannel } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

function Header({ session }: any) {
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();


  const fetchNotices = async () => {
    const response = await fetch("/api/notification/chat");
    const data = await response.json();

    console.log("fffffffffffffffffffffff");
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnn");
    console.log("sean_log data: " + JSON.stringify(data));

    setNotifications(data);
  };


  useEffect(() => {

    fetchNotices();

    pusherClient.subscribe(session?.user?.id!.toString());

    pusherClient.bind(PusherChannel.Notification, (data: any) => {
      // update state to show notification here.d

      const parsedUrl = new URL(window.location.href);
      const paths = parsedUrl.pathname.split("/").filter((segment) => segment); // ["chat","1,2,3,4,5"]

      if (paths[0] !== "chat" || paths[1] !== data.chatId) {
        // setNotification((prev) => prev + 1);
        // setNotifications(data);
        fetchNotices()
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

  const handleChatNoticeClick = async ({ noticeId, chatId }: any) => {
    try {
      const response = await fetch(
        `/api/notification/chat?id=${noticeId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete notification");
      }

      console.log('vvvvvvvvvvvvvvvvvvv');
      console.log('vvvvvvvvvvvvvvvvvvv');
      fetchNotices();
      router.push("/chat/" + chatId);
    } catch (error) {
      throw error;
    }
  };

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

        <DropdownMenu>
          <DropdownMenuTrigger>{notifications.length}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            {notifications.map((notice: any, index) => {
              return (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      handleChatNoticeClick({
                        noticeId: notice.id,
                        chatId: notice.chatId,
                      })
                    }
                    key={notice.id}
                  >
                    {notice.message}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            {notifications.length}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {notifications.map((notice: any, index) => {
              return (
                <DropdownMenuItem asChild key={notice.chatId}>
                  <Button
                    onClick={() =>
                      handleChatNoticeClick({
                        noticeId: notice.id,
                        chatId: notice.chatId,
                      })
                    }
                  >
                    {notice.message}
                  </Button>
                  {index < notifications.length - 1 && (
                    <DropdownMenuSeparator />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu> */}
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
