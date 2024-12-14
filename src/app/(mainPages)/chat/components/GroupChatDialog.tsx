"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useCallback, useEffect, useActionState } from "react";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Users from "@/app/components/users/Users";
import { Button } from "@/components/ui/button";
import { groupMessageAction } from "@/actions/groupMessage.action";
import { MassChatType } from "@/types";
import { useRouter } from "next/navigation";
import { getPrivateChatId } from "@/helper/chat";

function GroupChatDialog({ modalName, setModalName, groups }: any) {
  const { data: session } = useSession();

  const [currentStep, setCurrentStep] = useState(0);
  const [groupIds, setGroupIds] = useState<any>([]);
  const [messageType, setMessageType] = useState("");
  const [createdGroupId, setCreatedGroupId] = useState("");
  const [allGroupUsers, setAllGroupUsers] = useState<any>([]);

  const router = useRouter();

  // console.log("ggggggggggggggggggggggg");
  // console.log("ggggggggggggggggggggggg");
  // console.log("ggggggggggggggggggggggg");
  // console.log("sean_log session: " + JSON.stringify(session));

  // const userIdsArray = allGroupUsers.map((user: any) => user.id); // [1,2,3]

  // console.log("sean_log userIdsArray: " + JSON.stringify(userIdsArray));

  // const chatIdsArray = userIdsArray.flatMap((id: number) => {
  //   if (id !== 2) {
  //     return [getPrivateChatId([2, id])];
  //   }
  //   return [];
  // }); // ["1,2", "2,4"]

  // console.log("sean_log chatIdsArray: " + JSON.stringify(chatIdsArray));

  const groupMessageActionWithData = groupMessageAction.bind(null, {
    allGroupUsers,
    messageType,
  });

  const [state, formAction] = useActionState(groupMessageActionWithData, {
    status: "",
    message: "",
  });

  const ids = groups.map((group: any) => group.id);

  const handleGroupAdd = (groupId: string) => {
    const updatedValues = groupIds.includes(groupId)
      ? groupIds.filter((item: any) => item !== groupId)
      : [...groupIds, groupId];

    setGroupIds(updatedValues);
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch(
        "/api/groupsUsers?groupIds=" + groupIds.join(",")
      );
      const data = await response.json();

      console.log("ddddddddddddddddddddddd");
      console.log("ddddddddddddddddddddddd");
      console.log("ddddddddddddddddddddddd");
      console.log("sean_log data: " + JSON.stringify(data));
      setAllGroupUsers(data);
    };

    fetchGroups();
    // call async here
  }, [groupIds]);

  useEffect(() => {
    if (state.status === "success") {
      handleNext();
      if (messageType === MassChatType.Group) {
        setCreatedGroupId(state?.groupChat!);
      }
    } else if (state.status === "error") {
      console.log("eeeeeeeeeeeeeeeeeeeeee");
      console.log("sean_log error: " + JSON.stringify(state.message));
    }
  }, [state]);

  const getPanel = () => {
    if (currentStep === 0) {
      return (
        <>
          <div>
            {groups.map((group: any) => {
              return (
                <div key={group.id}>
                  <Checkbox
                    id={group.id}
                    onCheckedChange={() => {
                      handleGroupAdd(group.id);
                    }}
                  />
                  <Label htmlFor={group.id}>{group.name}</Label>
                </div>
              );
            })}
            {allGroupUsers.length ? (
              <Users users={allGroupUsers} />
            ) : (
              <p>Select one or more group to view users</p>
            )}
          </div>
          <Button onClick={() => handleNext()} disabled={!allGroupUsers.length}>
            Next
          </Button>
        </>
      );
    }
    if (currentStep === 1) {
      return (
        <>
          <p>Message Type</p>
          <div>
            <RadioGroup
              onValueChange={(messageType) => setMessageType(messageType)}
            >
              <div className="mt-2">
                <RadioGroupItem
                  value={MassChatType.Individual}
                  id={MassChatType.Individual}
                />
                <Label htmlFor={MassChatType.Individual}>
                  {MassChatType.Individual}
                </Label>
              </div>
              <div className="mt-2">
                <RadioGroupItem
                  value={MassChatType.Group}
                  id={MassChatType.Group}
                />
                <Label htmlFor={MassChatType.Group}>{MassChatType.Group}</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            {messageType &&
              (messageType === MassChatType.Individual ? (
                <p>Send the same individual message to each group member</p>
              ) : (
                <p>Send message in the group chat</p>
              ))}
          </div>
          <Button onClick={() => handleNext()} disabled={!messageType}>
            Next
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <form action={formAction}>
            <input type="text" id="msg" name="msg" />
            <Button>Submit</Button>
          </form>
        </>
      );
    }
    if (currentStep === 3) {
      return (
        <>
          <p>Submission successful!</p>

          {messageType === MassChatType.Group && (
            <Button
              onClick={() => {
                setModalName("");
                router.push("/chat/" + createdGroupId);
              }}
            >
              Go to chat
            </Button>
          )}

          <Button
            onClick={() => {
              setModalName("");
              router.refresh();
            }}
          >
            Close
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <Dialog open={modalName} onOpenChange={setModalName}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add group chat</DialogTitle>
          </DialogHeader>
          {getPanel()}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GroupChatDialog;
