/*
Choose color component. Only shows up in the "createposition" page. Whatever color the user selects is what gets passed on this
Component
*/

import React from 'react'
import {SketchPicker, ColorResult} from 'react-color'

type ChooseColorProps = {
    color: string
    onColorPick: (hex: string) => void
}

const ChooseColor = (props: ChooseColorProps) => {

    const handleChangeComplete = (color: ColorResult) => {
        props.onColorPick(color.hex)
    }

    return(
        <div className="dropdown dropdown-end w-full">

        {/* This div will be whatever is the initial state of the color picker then change from there*/}
        <div 
            style={{
                backgroundColor: props.color
            }}
            tabIndex={0} 
            className="btn bg-dark border-0 w-full md:w-28 normal-case text-white rounded-lg font-semibold">
                Pick color
            </div> 
            <div tabIndex={0} className="mt-1 bg-white shadow menu dropdown-content rounded-box w-auto">
                <SketchPicker
                    onChangeComplete={handleChangeComplete}
                    color={props.color}
                />
            </div>
        </div>

    )
}

export default ChooseColor