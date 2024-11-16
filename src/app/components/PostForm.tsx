'use client';

import { useActionState } from 'react';
import FormSubmit from './FormSubmit';
import { Mood } from '@/types';


export default function PostForm({ action } : any) {
  const [state, formAction] = useActionState(action, {} as any);

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
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
