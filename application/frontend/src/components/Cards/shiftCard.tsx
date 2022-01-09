import ShiftCardHeader from "../Rows/shiftCardHeader";
import ScheduledWorkerCard from "./scheduledWorkerCard";

/*
This is the shift card component. This is the popup that will appear when the user clicks to see a shifts details
• Time of shift
• Workers scheduled to the shift
• Address

This component has child components and an address display card that can be edited here directly.
• To edit the ScheduledworkerCard component go to /components/Cards/scheduledWorkerCard.tsx file.
• To edit the shiftCardHeader go to /components/Rows/shiftCardheader.tsx file
*/

const ShiftCard = () => {
    return(     
        <div className="w-min block shadow rounded-2xl p-3">
            <ShiftCardHeader/>
            <div className="max-h-96 overflow-auto">
            <ScheduledWorkerCard workerName=""/>
            <ScheduledWorkerCard workerName=""/>
            <ScheduledWorkerCard workerName=""/>
            <ScheduledWorkerCard workerName=""/>
            <ScheduledWorkerCard workerName=""/>
            <ScheduledWorkerCard workerName=""/>
            </div>

            <div className="h-20 mt-3 border rounded-2xl p-3 pl-5">
                <a href="#" className="font-bold">Address</a> 
                <p>City and Province</p>
            </div>           
        </div>
    )
} 

export default ShiftCard;
