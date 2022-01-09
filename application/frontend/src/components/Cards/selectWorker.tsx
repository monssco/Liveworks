/*
This is the card for selecting workers when creating the shifts.

MVP Displays:
• Worker name
• Checkbok
*/

import { Field } from "formik";

interface nameProps {
    firstName?: string | null
    lastName?: string | null
    firstNameInitial: string
    lastNameInitial: string
    id: string
    checkboxName: string
}

const SelectWorker = (props: nameProps) => {
    return(
        <div className="w-full h-auto p-2 rounded-2xl bg-white hover:bg-backgroundDark items-center">
            <label className="form-control cursor-pointer label flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                    {/* Show the workers first name and last name initials in this span */}
                    <span className="flex items-center justify-center w-14 h-14 mask mask-squircle font-bold bg-backgroundDark">
                        {props.firstNameInitial}{props.lastNameInitial}
                    </span>
                    <span className="font-medium">{props.firstName} {props.lastName}</span>
                </div>
                <div className="flex items-center">
                    <Field type="checkbox" name={props.checkboxName} className="text-dark checkbox mr-1" value={props.id}/>
                </div>

            </label>
        </div>            
    )
}

export default SelectWorker;
