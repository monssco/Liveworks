/*
• This is the container that gets called when adding a new worker button is clicked on the invite workers page.
• It also contains an Icon delete button that us hidden. This icon should appear in the container that is being created 
when the users clicks on the "add worker" button in the invite workers page
*/

import TextInput from "src/components/TextInputs/textInput";
import WorkersPositionsDropdown from "src/components/Dropdown/workerPositionsDropdown";
import EmailInput from "../TextInputs/emailInput";
import IconButton from "../Buttons/iconButton";
import React from "react";

type AddWorkerProps = {
    inputFName: string
    inputLName: string
    inputEmail: string
    inputPosition: string
    setFieldValue: any
    errors: any
    onDelete: () => void
}

const AddWorkerContainer = (props: AddWorkerProps) => {

    return(
        <div className="xl:flex xl:justify-evenly xl:items-end mb-5 xl:mb-5 m-5 xl:m-0 p-5 xl:p-1 gap-4 bg-white xl:bg-backgroundLight rounded-2xl">

            <TextInput name={props.inputFName} title="First name" placeholder="Enter first name"/>
            <TextInput name={props.inputLName} title="Last name" placeholder="Enter last name"/>
            <EmailInput name={props.inputEmail}/>

            <div className="flex pt-5 lg:pt-0 items-end gap-4 justify-between">
                
                <div className="flex flex-col">
                    
                    
                    <WorkersPositionsDropdown
                        inputPosition={props.inputPosition}
                        onClick={(id) => {
                            props.setFieldValue(props.inputPosition, id, true)
                            console.log(id + "is clicked");
                        }}
                    />
                </div>

                {/* delete button */}
                <div className="">
                    <IconButton 
                    icon="/Icons/DeleteFill.svg"
                    onClick={() => {
                        props.onDelete()
                    }}
                    />
                </div>
            </div>

        </div>
    )
}

export default AddWorkerContainer