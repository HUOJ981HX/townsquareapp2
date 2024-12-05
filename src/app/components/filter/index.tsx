"use client";

import { filterSubmitAction } from "@/actions/filter.action";
import PostCriteria from "@/app/components/PostCriteria";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import React, { useState, useEffect } from "react";
import { useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGlobalContext } from "@/context/GlobalContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FilterFormInputs, Gender } from "@/types/filter";
import MoodInput from "../sharedFormInputs/MoodInput";

function Filter({ purpose, filter }: any) {
  const [ageMin, setAgeMin] = useState(33);
  const [ageMax, setAgeMax] = useState(33);
  const [isOpen, setIsOpen] = useState(false);
  const [postFilter, setPostFilter] = useState<
    {
      postFilterDisplay: string;
      postFilterQueryRole: string;
    }[]
  >([]);

  const [state, formAction] = useActionState(filterSubmitAction, {
    status: "",
    message: "",
  });

  const { setOpenFilter } = useGlobalContext();
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "success") {
      toast({
        description: state.message,
      });

      setOpenFilter(false);
    } else if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state]);

  const handleAgeMin = (value: any) => {
    setAgeMin(value);
  };

  const handleAgeMax = (value: any) => {
    setAgeMax(value);
  };

  useEffect(() => {
    if (state.status === "success") {
    } else if (state.status === "error") {
    }
  }, [state]);

  return (
    <>
      {/* <div className='fixed w-screen h-screen z-50 bg-[red] left-0 top-0'> */}
      <div>
        <Button onClick={() => setOpenFilter(false)}>Close</Button>
        <div>
          <form action={formAction}>
            <div className="flex items-center space-x-2">
              <Switch id="filterOff" name="filterOff" />
              <Label htmlFor="filterOff">Turn off filter</Label>
            </div>

            <div>
              <h2 className="text-[2rem]">User filter</h2>
              <div>
                <div>
                  <Slider
                    defaultValue={[33]}
                    max={100}
                    min={18}
                    step={1}
                    id={FilterFormInputs.UserAgeMin}
                    name={FilterFormInputs.UserAgeMin}
                    onValueChange={handleAgeMin}
                  />
                  <p>minimum age: {ageMin}</p>
                </div>

                <div>
                  <Slider
                    defaultValue={[33]}
                    max={100}
                    min={18}
                    step={1}
                    id={FilterFormInputs.UserAgeMax}
                    name={FilterFormInputs.UserAgeMax}
                    onValueChange={handleAgeMax}
                  />
                  <p>maximum age: {ageMax}</p>
                </div>
              </div>
              <div>
                <p>Gender</p>
                <input
                  type="checkbox"
                  name={FilterFormInputs.UserGender}
                  id={`${FilterFormInputs.UserGender}${Gender.Female}`}
                  value={Gender.Female}
                />
                <label htmlFor="UserAttributesFemale">Female</label>
                <input
                  type="checkbox"
                  name={FilterFormInputs.UserGender}
                  id={`${FilterFormInputs.UserGender}${Gender.Male}`}
                  value={Gender.Male}
                />
                <label htmlFor="UserAttributesFemale">Male</label>
                <input
                  type="checkbox"
                  name={FilterFormInputs.UserGender}
                  id={`${FilterFormInputs.UserGender}${Gender.NonBinary}`}
                  value={Gender.NonBinary}
                />
                <label htmlFor="UserAttributesNonBinary">Non binary</label>
              </div>
            </div>

            <div>
              <h2 className="text-[2rem]">Post filter</h2>

              <MoodInput />
              <div>
                {postFilter.map((filter) => {
                  return (
                    <>
                      <p>{filter?.postFilterDisplay}</p>
                      <p>{filter?.postFilterQueryRole}</p>
                    </>
                  );
                })}

                <input
                  type="hidden"
                  id={FilterFormInputs.PostPurpose}
                  name={FilterFormInputs.PostPurpose}
                  value={JSON.stringify(postFilter)}
                />
                <div>
                  <p
                    onClick={() => {
                      setIsOpen((prevState) => {
                        return !prevState;
                      });
                    }}
                  >
                    Add Post criteria
                  </p>
                </div>
              </div>
            </div>
            <div></div>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <PostCriteria
            setPostFilter={setPostFilter}
            purpose={purpose}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </div>
      </div>
      {/* <PostCriteria questions={work} /> */}
    </>
  );
}

export default Filter;
