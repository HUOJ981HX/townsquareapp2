"use client"

import { doFilterSubmit } from '@/actions/filter'
import BaseModal from '@/app/components/BaseModal';
import PostCriteria from '@/app/components/PostCriteria';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'
import React, { useState } from 'react'

function Filter() {
    const [sliderValue, setSliderValue] = useState(33);
    const [postCriteria, setPostCriteria] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSliderChange = (value: any) => {

        console.log('vvvvvvvvvvvvvvvvvvv');
        console.log('vvvvvvvvvvvvvvvvvvv');
        console.log('sean_log value: ' + value);
        console.log('sean_log ___: ' + JSON.stringify(value));
        setSliderValue(value);
    };

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

                            {/* <div>
                            <h2>Is this for a relationship?</h2>
                            <input type="radio" id="genderForGeneral" name="genderIsRelationship" value="noRelationship" />
                            <label htmlFor="genderForGeneral">No</label>
                            <input type="radio" id="genderForRelationship" name="genderIsRelationship" value="yesRelationship" />
                            <label htmlFor="genderForRelationship">Yes</label>
                        </div> */}
                            <Button onClick={() => {
                                setIsOpen(prevState => {
                                    return !prevState
                                })
                            }}>Add criteria</Button>
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
                    <form>

                    </form>
                </div>
            </div>
            <BaseModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <PostCriteria setPostCriteria={setPostCriteria} />
            </BaseModal>
        </>
    )
}

export default Filter