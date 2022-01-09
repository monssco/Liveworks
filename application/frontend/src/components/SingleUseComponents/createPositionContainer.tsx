/*
This is the create position container that appear in the "create positions page". When the user clicks on the "Add position" 
button this container should appear so that they're able to create multiple positions at once.

This container also has a hidden delete iconbutton that should appear when the container is called.
*/ 

import TextInput from "../TextInputs/textInput"
import ChooseColor from "./chooseColor"
import IconButton from "../Buttons/iconButton"
import React, { useEffect, useState } from "react"

type CreatePositionContainerProps = {
    inputName: string
    inputColor: string
    onDelete: () => void
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const CreatePositionContainer = (props: CreatePositionContainerProps) => {

    let randomColor = Math.floor(Math.random()*16777215).toString(16);

    const [color, setColor] = useState(`#${randomColor}`)

    const colorPicked = (hex: string) => {
        console.log("Colorpicked called inside CreatePositionContainer")
        console.log(hex)
        setColor(hex)
        props.setFieldValue(props.inputColor, color)
    }

    // Sets the initial value for color
    useEffect(() => {
        colorPicked(color)
    }, [])

    return(
        <div className="flex flex-col md:flex-row justify-center items-end gap-4 p-5 mb-5 xl:mb-5 m-5 xl:m-0 bg-white xl:bg-backgroundLight rounded-2xl">

            <TextInput name={props.inputName} title="Position name" placeholder="Position name" width="w-full"/>

            {/* This dic contains the choose color dropdown and the hidden delete iconButton */}
            <div className="flex flex-row w-full justify-between md:w-auto gap-4">
                <ChooseColor
                    color={color}
                    onColorPick={colorPicked}
                />

                <div className="">
                    <IconButton icon="/Icons/DeleteFill.svg" onClick={() => {
                        props.onDelete()
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default CreatePositionContainer