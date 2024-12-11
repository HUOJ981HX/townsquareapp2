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

function GroupChatDialog({ modalName, setModalName, groups }: any) {
  const [currentStep, setCurrentStep] = useState(0);
  const [groupIds, setGroupIds] = useState<any>([]);
  const [messageType, setMessageType] = useState("");
  const [allGroupUsers, setAllGroupUsers] = useState<any>([]);

  const groupMessageActionWithData = groupMessageAction.bind(null, {
    allGroupUsers,
    messageType
  });

  const [state, formAction] = useActionState(groupMessageActionWithData, {
    status: "",
    message: "",
  });

  const { data: session } = useSession();
  //   {
  //     "user": { "name": "Bob", "email": "bob@bob.bob", "id": "2" },
  //     "expires": "2025-01-08T20:50:40.547Z"
  //   }


  //   const username = session?.user?.name;

  const ids = groups.map((group: any) => group.id);

  // const uniqueUserIds = [
  //   ...new Set(
  //     groups.flatMap((group: any) =>
  //       group.userGroups.map((userGroup: any) => userGroup.userId)
  //     )
  //   ),
  // ];

  const handleGroupAdd = (groupId: string) => {
    const updatedValues = groupIds.includes(groupId)
      ? groupIds.filter((item: any) => item !== groupId)
      : [...groupIds, groupId];

    setGroupIds(updatedValues);
  };

  const handleNext = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [setCurrentStep]);

  useEffect(() => {
    const fetchGroups = async () => {

      const response = await fetch(
        "/api/groupsUsers?groupIds=" + groupIds.join(",")
      );
      const data = await response.json();

      setAllGroupUsers(data);
    };

    fetchGroups();
    // call async here
  }, [groupIds]);

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
          <Button
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
            disabled={!allGroupUsers.length}
          >
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
          <p>
            {messageType &&
              (messageType === MassChatType.Individual ? (
                <p>Send the same individual message to each group member</p>
              ) : (
                <p>Send message in the group chat</p>
              ))}
          </p>
          <Button
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
            disabled={!messageType}
          >
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
