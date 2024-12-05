"use client";

import { useActionState, useEffect } from "react";
import FormSubmit from "./FormSubmit";
import { Mood } from "@/types/filter";
import ImagePicker from "../ImagePicker";
import { useToast } from "@/hooks/use-toast";
import MoodInput from "../sharedFormInputs/MoodInput";

export default function PostForm({ action, setIsOpen }: any) {
  const [state, formAction] = useActionState(action, {
    status: "",
    message: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "success") {
      toast({
        description: state.message,
      });
      setIsOpen(false);
    } else if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state]);

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="image">Image</label>
        {/* <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          /> */}
        <ImagePicker label="Your image" name="image" />
        <label htmlFor="description">Content</label>
        <textarea id="description" name="description" rows={5} />

        <label htmlFor="mood">Mood</label>
        <MoodInput />
        <FormSubmit />
        {/* {state.errors && (
          <ul className="form-errors">
            {state.errors.map((error: any) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )} */}
      </form>
    </>
  );
}
