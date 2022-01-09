/*
This is the position selector on the create shift screen. When the venue invites a worker, the position that they choose will 
be added here that they can then select to view and select the workers on that position when creating a shift.
*/

import { FieldHookConfig, useField } from "formik";
import React from "react";
import { useListWorkerPositionsQuery } from "src/graphql/generated/graphql";
import AlertError from "../Alert/error";
import AlertInfo from "../Alert/info";

const SelectPosition = (props: FieldHookConfig<string>) => {

    const [field, meta] = useField(props);

    const {data, loading, error} = useListWorkerPositionsQuery();

    return(
        <>
            {loading && <AlertInfo>Loading positions</AlertInfo>}
            {error && <AlertError>Error loading positions: {error.message}</AlertError>}
            {meta.touched && meta.error ? (
                    // Display error message if there is an error
                    <div className="text-sm text-brightRed">{meta.error}</div>
                ) : null}
            <select 
                {...field} 
                placeholder={props.placeholder} 
                className="select select-bordered w-full">
                <option value="" disabled={true}>Select position</option> 
                {data?.businessListWorkerPositions.map(
                    pos => (
                        <option key={pos.id} value={pos.id}>{pos.name}</option> 
                    )
                )}
            </select>
        </>
    )
}

export default SelectPosition;