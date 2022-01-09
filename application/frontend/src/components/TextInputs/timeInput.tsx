//Time input

import { addHours, endOfDay, format, fromUnixTime, startOfDay } from "date-fns";
import { FieldHookConfig, useField } from "formik"
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import {getUnixTime} from 'date-fns'

interface inputProps {
    title: string
    placeholder: string
    unixTime: number
}
const TimeInput = (props: inputProps & FieldHookConfig<string>) => {

    // Related to formik. FieldHookConfig is a type that contains the field's name, value, and other properties.
    const [field, meta, helpers] = useField(props);

    // Date state for internal visual representation and value for formik
    const [date, setDate] = useState<Date>();
    
    // Once props are set, update the internal date state and the value of the field.
    useEffect(() => {
        // If indeed we get the unix time, convert it to a date and store it in the state.
        // If the date has not been set already, and we get a value for initial time, then set it to the date.
        if (props.unixTime && date === undefined) {
            setDate(fromUnixTime(props.unixTime))
            // This call might be redundant, there's no reason to set the value of the field if the date is already set.
            // helpers.setValue(props.unixTime.toString())
            console.log('unix time', props.unixTime)
            console.log('date passed in is', fromUnixTime(props.unixTime))
            // console.log('State Date is ', date)
            // console.log('Start of day is ', startOfDay(date))
            // console.log('End of day is ', endOfDay(date))
        }
    }, [props.unixTime])

    return(

        <div className="form-control font-semibold">
            <label className="label" htmlFor="time">
                <span className="label-text">{props.title}</span>
                {meta.touched && meta.error ? (
                    // Display error message if there is an error
                    <div className="text-sm text-brightRed">{meta.error}</div>
                ) : null}
            </label>
            {date &&
            <DatePicker
                className="input input-bordered appearance-none border-full py-2 px-4 bg-white text-dark placeholder-dark rounded-lg text-base flex-1"
                {...field}
                onChange={(date) => {
                    if (date instanceof Date) {
                        console.log("Onchange called, setting the date.")
                        setDate(date);
                        helpers.setValue(getUnixTime(date).toString())
                    }
                }}
                minTime={startOfDay(date)}
                // Can't get time to show for 4 more hours than the end of day.
                // might need to revisit this.
                maxTime={addHours(endOfDay(date), 0)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                value={format(date, 'h:mm aa')}
                selectsRange={false}
            />
            }
            {/* <input 
                placeholder={props.placeholder}
                {...field}
                type="time" 
                className="input input-bordered appearance-none border-full py-2 px-4 bg-white text-dark placeholder-dark rounded-lg text-base flex-1"/> */}
        </div>
    )
}

export default TimeInput