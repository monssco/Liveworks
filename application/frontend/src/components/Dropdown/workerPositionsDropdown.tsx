/*
This is the dropdown card on the "invite workers page" where the user select the position for the worker they're going to invite
*/

import { ErrorMessage } from "formik";
import React from "react";
import { useRef, useState } from "react";
import { useListWorkerPositionsQuery } from "src/graphql/generated/graphql"
import ButtonRightIcon from "../Buttons/buttonWithRightIcon";
import PositionsDropdownCell from "./workerPositionsDropdownCell"

type DropDownProps = {
    onClick: (id: string) => void,
    inputPosition: string
}


/**
 *  this is a function component which is a drop down menu that uses PositionDropDownCell as each child component for selecting a worker position.
 * @returns jsx element from a WorkerPositionDropDown menu 
 */

const WorkersPositionsDropdown = (props: DropDownProps) => {
    const { loading, error, data } = useListWorkerPositionsQuery();

    const [position, setPosition] = useState("Select")

    const dropDownRef = useRef<HTMLUListElement>(null);

    return(
        <div>
            <label className="label">
                <span className="label-text font-semibold">Position</span>
                <ErrorMessage name={props.inputPosition} component="div" className="text-sm text-brightRed font-semibold self-end" />
            </label> 
            <div className="dropdown" >
                {error && <div>{`Error fetching data: ${error.message}`}</div>}
                {loading && <div> Loading... </div>}
                <div tabIndex={0} className="select select-bordered items-center hover:bg-backgroundDark min-w-max w-40 pl-2" >{position}</div> 
                    <ul tabIndex={0} ref={dropDownRef} className={`p-2 shadow dropdown-content bg-white rounded-box w-72 mt-2 max-h-64 overflow-scroll `}
                        >
                        
                        {/* Add custom position button */}
                        <ButtonRightIcon destination="/business/createposition" title="Add custom position" buttonIcon="/../Icons/Add/AddFillDark.svg"/>
                        

                        {/* Positions go here */}

                        {data && 
                            data.businessListWorkerPositions.map(
                                ( { id, name } )  => {
                                    return(
                                        <PositionsDropdownCell

                                            key={id} 
                                            text={name}
                                            onClick = {() => {
                                                props.onClick(id);
                                                console.log(`Clicked ${id} ${name}`);
                                                // decides when to blur position drop down cell when a cell is clicked by removing focus on said element and thus closing the menu
                                                dropDownRef.current?.blur();
                                                setPosition(name);
                                            }}
                                        />
                                    )
                                }
                            )
                        }
                        
                    </ul>
            </div>
        </div>
    )
}

export default WorkersPositionsDropdown



