import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useCallback } from "react";
import { useSession } from "next-auth/react";

function GroupChatDialog({ modalName, setModalName }: any) {
  const [currentStep, setCurrentStep] = useState(0);
  const { data: session } = useSession();

//   const username = session?.user?.name;

console.log('sssssssssssssssssssssssss');
console.log('sssssssssssssssssssssssss');
console.log('sssssssssssssssssssssssss');
console.log('sean_log session: ' + JSON.stringify(session));

  const handleNext = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [setCurrentStep]);

  const getPanel = () => {
    if(currentStep === 0) {
        return <p>username</p>
    }
  }

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
