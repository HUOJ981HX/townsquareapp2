"use client"

import { doFilterSubmit } from '@/actions/filter'
import BaseModal from '@/app/components/BaseModal';
import PostCriteria from '@/app/components/PostCriteria';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'
import { work } from '@/helper/post';
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'


function Filter({params} : any) {
    const [sliderValue, setSliderValue] = useState(33);
    const [isOpen, setIsOpen] = useState(false);
    const [postFilter, setPostFilter] = useState< { postFilterDisplay: string, postFilterQueryRole: string }>({
        postFilterDisplay: '',  // Initialize with empty string instead of null
        postFilterQueryRole: ''
      });
    
    const handleSliderChange = (value: any) => {
        setSliderValue(value);
    };


    // useEffect(() => {
      
    //     console.log('cccccccccccccccccccc');
    //     console.log('cccccccccccccccccccc');
    //     console.log('cccccccccccccccccccc');
    //     console.log('sean_log postFilter: ' + JSON.stringify(postFilter));
    // }, [postFilter])
    

    return (
        <>
            <div>
                <div>
                    <div className='flex'>
                        <h2>User attributes</h2>
                        <p>?</p>
                    </div>
                    <form action={doFilterSubmit}>
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
                                <input type="checkbox" name="gender" id="UserAttributesFemale" value="Female" />
                                <label htmlFor="UserAttributesFemale">Female</label>
                                <input type="checkbox" name="gender" id="UserAttributesMale" value="male" />
                                <label htmlFor="UserAttributesFemale">Male</label>
                                <input type="checkbox" name="gender" id="UserAttributesNonBinary" value="Female" />
                                <label htmlFor="UserAttributesNonBinary">Non binary</label>
                            </div>

                            {/* <input type="hidden" id="postFilter" name="postFilter" value={`${useSearchParams().get('purpose')}:${postFilter?.postFilterDisplay}`} /> */}

                            <input type="hidden" id="postFilter" name="postFilter" value={postFilter?.postFilterDisplay} />

                            <input type="hidden" id="postFilterQueryRole" name="postFilterQueryRole" value={postFilter?.postFilterQueryRole} />

                            {/* <div>
                            <h2>Is this for a relationship?</h2>
                            <input type="radio" id="genderForGeneral" name="genderIsRelationship" value="noRelationship" />
                            <label htmlFor="genderForGeneral">No</label>
                            <input type="radio" id="genderForRelationship" name="genderIsRelationship" value="yesRelationship" />
                            <label htmlFor="genderForRelationship">Yes</label>
                        </div> */}
                            <div>
                                {postFilter && <p>{postFilter?.postFilterDisplay}</p>}
                                <Button onClick={() => {
                                    setIsOpen(prevState => {
                                        return !prevState
                                    })
                                }}>Add criteria</Button>
                            </div>
                        </div>
                        <div>

                        </div>

                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div>
                    <div className='flex'>
                        <h2>Post attributes</h2>
                        <p>?</p>
                    </div>
                    <PostCriteria setPostFilter={setPostFilter} purpose={useSearchParams().get('purpose')} setIsOpen={setIsOpen} isOpen={isOpen} />
                </div>
            </div>
            {/* <PostCriteria questions={work} /> */}
        </>
    )
}

export default Filter