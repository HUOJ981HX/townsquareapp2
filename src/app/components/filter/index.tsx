"use client"

import { filterSubmitAction } from '@/actions/filter'
import BaseModal from '@/app/components/BaseModal';
import PostCriteria from '@/app/components/PostCriteria';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'
import { work } from '@/helper/post';
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react';
import { createPostAction } from '@/actions/post';
import { useToast } from "@/hooks/use-toast"
import { useGlobalContext } from '@/context/GlobalContext';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

function Filter({purpose}: any) {
    const [sliderValue, setSliderValue] = useState(33);
    const [isOpen, setIsOpen] = useState(false);
    const [postFilter, setPostFilter] = useState< { postFilterDisplay: string, postFilterQueryRole: string }>({
        postFilterDisplay: '',  // Initialize with empty string instead of null
        postFilterQueryRole: ''
    });

    const [state, formAction] = useActionState(filterSubmitAction, {
        status: "",
        message: ""
    });

    const { setOpenFilter } = useGlobalContext();
    const { toast } = useToast();

    useEffect(() => {
        if (state.status === 'success') {
          toast({
            description: state.message,
          });

        setOpenFilter(false);

        } else if (state.status === 'error') {
          toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
          });
        }

    }, [state]);
    
    const handleSliderChange = (value: any) => {
        setSliderValue(value);
    };

    useEffect(() => {
        if (state.status === 'success') {
        } else if (state.status === 'error') {
        }
    }, [state]);

    return (
        <>
            <div className='fixed w-screen h-screen z-50 bg-[red] left-0 top-0'>
                <Button onClick={() => setOpenFilter(false)}>Close</Button>
                <div>
                    <form action={formAction}>

                    <div className="flex items-center space-x-2">
                        <Switch id="filterOff" name='filterOff'/>
                        <Label htmlFor="filterOff">Turn off filter</Label>
                    </div>

                        <div>
                            <Slider
                                defaultValue={[33]}
                                max={100}
                                min={18}
                                step={1}
                                id="UserAttributesAge"
                                name="UserAttributesAge"
                                onValueChange={handleSliderChange}
                            />
                            <p>Current value: {sliderValue}</p>
                        </div>

                        <div>
                            <div>
                                <h2>Gender</h2>
                                <input type="checkbox" name="UserAttributesGender" id="UserAttributesFemale" value="Female" />
                                <label htmlFor="UserAttributesFemale">Female</label>
                                <input type="checkbox" name="UserAttributesGender" id="UserAttributesMale" value="Male" />
                                <label htmlFor="UserAttributesFemale">Male</label>
                                <input type="checkbox" name="UserAttributesGender" id="UserAttributesNonBinary" value="Non-binary" />
                                <label htmlFor="UserAttributesNonBinary">Non binary</label>
                            </div>

                            {/* <input type="hidden" id="postFilter" name="postFilter" value={`${useSearchParams().get('purpose')}:${postFilter?.postFilterDisplay}`} /> */}

                            <p>{postFilter?.postFilterDisplay}</p>
                            <input type="hidden" id="postFilterDisplay" name="postFilterDisplay" value={postFilter?.postFilterDisplay} />

                            <p>{postFilter?.postFilterQueryRole}</p>
                            <input type="hidden" id="postFilterQueryRole" name="postFilterQueryRole" value={postFilter?.postFilterQueryRole} />
                            {/* <div>
                                <h2>Is this for a relationship?</h2>
                                <input type="radio" id="genderForGeneral" name="genderIsRelationship" value="noRelationship" />
                                <label htmlFor="genderForGeneral">No</label>
                                <input type="radio" id="genderForRelationship" name="genderIsRelationship" value="yesRelationship" />
                                <label htmlFor="genderForRelationship">Yes</label>
                            </div> */}
                            <div>
                                <p onClick={() => {
                                    setIsOpen(prevState => {
                                        return !prevState
                                    })
                                }}>Add Post criteria</p>
                            </div>
                        </div>
                        <div>

                        </div>

                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div>
                    <PostCriteria setPostFilter={setPostFilter} purpose={purpose} setIsOpen={setIsOpen} isOpen={isOpen} />
                </div>
            </div>
            {/* <PostCriteria questions={work} /> */}
        </>
    )
}

export default Filter