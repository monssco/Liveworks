import { useEffect, useState } from "react";
import { customFormatDuration } from "src/utils/helpers";
import DoubleText from "../Rows/doubleText";

/*
This is the shift cost breakdown component used when the user is creating the shift to show them the cost of the shift being 
created.

To edit the DoubleText component go to components/rows/doubleText file.
*/

type ShiftCostBreakdownProps = {
    positionId: string,
    startTime: string,
    endTime: string,
    rate: string,
    workers: string[]
}

const ShiftCostBreakdown = (props: ShiftCostBreakdownProps) => {
    

    const [data, setData] = useState({
        duration: "0 hours",
        workers: 0,
        rate: "0",
        // cost per worker
        cpw: "0",
        totalCost: "0"
    })

    useEffect(() => {
        if (props.startTime && props.endTime){
            // there is a start time and end time
            let start = parseInt(props.startTime)
            let end = parseInt(props.endTime)

            let duration = customFormatDuration({start, end})

            let difference = end - start

            // this is seconds
            // console.log('difference ',difference)

            // Get time difference (in seconds)
            difference
            // convert to fractional hours

            let fracHours = difference / 3600.00

            let rate = parseFloat(props.rate) * 100.00

            // console.log('rate is', rate)
            // Multiply by the rate
            let cpwFloat = (fracHours * rate) / 100.00 
            let cpw = cpwFloat.toFixed(2)

            setData((old) => ({
                ...old,
                cpw
            }))
            // That's the total cost per worker
            // Multiply cost per worker with num of workers to get total cost

            let totalFloat = cpwFloat * data.workers

            let totalCost = totalFloat.toFixed(2)

            setData((oldData)=> ({
                ...oldData,
                duration,
                totalCost
            }))

        }

        if (props.rate && props.workers) {
            let numWorkers = props.workers.length
            setData((old)=> ({
                ...old,
                workers: numWorkers
            }))

        }
    }, [props])

    return(
        <div className="h-full w-full mb-5 xl:mb-0">
            <DoubleText title="Shift duration" display={data.duration}/>
            <DoubleText title="Rate" display={`$ ${props.rate ? props.rate : '0'}`} />
            <DoubleText title="Cost per worker" display={`$ ${data.cpw}`}/>
            <DoubleText title="Workers scheduled" display={data.workers.toString()}/>
            <DoubleText title="Total cost" display={`$ ${data.totalCost}`}/>            
        </div>
    )
}



export default ShiftCostBreakdown;
