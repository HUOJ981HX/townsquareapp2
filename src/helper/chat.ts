// "use server";

import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

export const getPrivateChatId = (userIdsArray: number[]) => {


  userIdsArray.sort();
  // const privateIds = userIdsArray.map((userId, index) => {
  //   console.log("iiiiiiiiiiiiiiiiiii");
  //   console.log("sean_log index: " + index);
  //   // if(index < userIdsArray.length - 1) {
  //   //   return userId.toString() + ",";
  //   // }
  //   // else {
  //   return userId.toString();
  //   // }
  // });
  // sort array,
  // string with ,


  return userIdsArray.join(',');
};

