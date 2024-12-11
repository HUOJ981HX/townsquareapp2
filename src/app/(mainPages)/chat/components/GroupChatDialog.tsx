import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function GroupChatDialog({ modalName, setModalName, groups }: any) {
  const [currentStep, setCurrentStep] = useState(0);
  const [groupIds, setGroupIds] = useState<any>([]);
  const [allGroupUsers, setAllGroupUsers] = useState<any>([]);

  const { data: session } = useSession();
  //   {
  //     "user": { "name": "Bob", "email": "bob@bob.bob", "id": "2" },
  //     "expires": "2025-01-08T20:50:40.547Z"
  //   }
  const [messageType, setMessageType] = useState("");

  enum MassChatType {
    Individual = "Individual",
  }

  //   const username = session?.user?.name;

  const ids = groups.map((group: any) => group.id);

  console.log("sssssssssssssssssssssssss");
  console.log("sssssssssssssssssssssssss");
  console.log("sssssssssssssssssssssssss");
  console.log("sean_log ids: " + JSON.stringify(ids));

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
  }

  const handleNext = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [setCurrentStep]);

  useEffect(() => {
    const fetchGroups = async () => {
      console.log('fffffffffffffffffffffff');
      console.log('fffffffffffffffffffffff');

      const response = await fetch('/api/groupsUsers?groupIds=' + groupIds.join(','));
      const data = await response.json();

      console.log('ddddddddddddddddddddddd');
      console.log('sean_log data: ' + JSON.stringify(data));
      setAllGroupUsers(data);
    }

    fetchGroups();
    // call async here
  }, [groupIds])
  

  const getPanel = () => {
    if (currentStep === 0) {
      return (
        <>
          {groups.map((group: any) => {
            return (
              <div key={group.id}>
                <Checkbox id={group.id} onCheckedChange={() => {
                  handleGroupAdd(group.id);
                }} />
                <Label htmlFor={group.id}>{group.name}</Label>
              </div>
            );
          })}
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
              <RadioGroupItem
                value={MassChatType.Individual}
                id={MassChatType.Individual}
              />
              <Label htmlFor={MassChatType.Individual}>
                {MassChatType.Individual}
              </Label>
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
