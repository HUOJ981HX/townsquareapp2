import React from "react";
import { FilterFormInputs, Mood } from "@/types/filter";

function MoodInput({PostMood}: any) {
  return (
    <div>
      <label htmlFor={FilterFormInputs.PostMood}>Mood</label>
      <select id={FilterFormInputs.PostMood} name={FilterFormInputs.PostMood} defaultValue={PostMood}>
        <option value={Mood.Happy}>{Mood.Happy}</option>
        <option value={Mood.Laugh}>{Mood.Laugh}</option>
        <option value={Mood.Surprised}>{Mood.Surprised}</option>
        <option value={Mood.Angry}>{Mood.Angry}</option>
        <option value={Mood.Sad}>{Mood.Sad}</option>
        <option value={Mood.Desperate}>{Mood.Desperate}</option>
      </select>
    </div>
  );
}

export default MoodInput;
