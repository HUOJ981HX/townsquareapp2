import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

function GroupChatDialog({ modalName, setModalName, groups }: any) {
  const [currentStep, setCurrentStep] = useState(0);
  const { data: session } = useSession();
  const [messageType, setMessageType] = useState("");

  enum MassChatType {
    Individual = "Individual",
  }

  //   const username = session?.user?.name;

  console.log("sssssssssssssssssssssssss");
  console.log("sssssssssssssssssssssssss");
  console.log("sssssssssssssssssssssssss");
  console.log("sean_log groups: " + JSON.stringify(groups));

//   {
//     "user": { "name": "Bob", "email": "bob@bob.bob", "id": "2" },
//     "expires": "2025-01-08T20:50:40.547Z"
//   }
  

  const handleNext = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [setCurrentStep]);

  const getPanel = () => {
    // if (currentStep === 0) {
    //     return <TestDialog />
    // }
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
