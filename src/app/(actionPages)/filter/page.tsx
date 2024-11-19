"use client"

import { doFilterSubmit } from '@/actions/filter'
import { Slider } from '@/components/ui/slider'
import React, { useState } from 'react'

function Filter() {
    const [sliderValue, setSliderValue] = useState(33);

    const handleSliderChange = (value: any) => {

        console.log('vvvvvvvvvvvvvvvvvvv');
        console.log('vvvvvvvvvvvvvvvvvvv');
        console.log('sean_log value: ' + value);
        console.log('sean_log ___: ' + JSON.stringify(value));
        setSliderValue(value);
    };

    return (
        <div>
            <div>
                <div className='flex'>
                    <h2>User attributes</h2>
                    <p>?</p>
                </div>
                <form action={doFilterSubmit}>
                    <Slider
                        defaultValue={[33]}
                        max={100}
                        min={18}
                        step={1}
                        id="age"
                        name="age"
                        onValueChange={handleSliderChange}
                    />
                    <p>Current value: {sliderValue}</p>
                    <input type="email" id="email" name="email" required />
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
    )
}

export default Filter