'use client';

import { useActionState, useEffect } from 'react';
import FormSubmit from './FormSubmit';
import { Mood } from '@/types';
import ImagePicker from '../ImagePicker';
import { useToast } from "@/hooks/use-toast"

export default function PostForm({ action, setIsOpen } : any) {
  const [state, formAction] = useActionState(action, {
    status: "",
    message: ""
  });

  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'success') {
      console.log('vvvvvvvvvvvvvvvvvvv');
      console.log('vvvvvvvvvvvvvvvvvvv');
      toast({
        description: state.message,
      });
      setIsOpen(false);
    } else if (state.status === 'error') {
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
        <select id="mood" name="mood">
            <option value={Mood.Happy}>{Mood.Happy}</option>
            <option value={Mood.Laugh}>{Mood.Laugh}</option>
            <option value={Mood.Surprised}>{Mood.Surprised}</option>
            <option value={Mood.Angry}>{Mood.Angry}</option>
            <option value={Mood.Sad}>{Mood.Sad}</option>
            <option value={Mood.Desperate}>{Mood.Desperate}</option>
        </select>
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
