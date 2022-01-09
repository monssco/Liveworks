/*
• This is the labour forecast component that appears on the left side of the schedule column under the calendar.
• On desktop view it shows under the column and on mobile it's wrapped inside a dropdown component that only appears on mobile.
and as a dropdown inconbutton on mobile view. 
• It's made up of children components whose information is determined by the actions of the user in the app. Follow tree to see
how each component works.
*/

import PositionForecastCard from "../Cards/positionForecastCard"
import LabourForecastCard from "../Cards/labourForecastCard"

const AllPositionsCostBreakdown = () => {
    return(
        <div className="lg:flex flex-col gap-2">
            <div className="flex flex-col gap-2 lg:max-h-60 overflow-scroll overscroll-none">
                <PositionForecastCard position="Managers" numberOfWorkers={3} cost={1000} color="bg-dark"/>
                <PositionForecastCard position="Managers" numberOfWorkers={3} cost={1000} color="bg-dark"/>
                <PositionForecastCard position="Managers" numberOfWorkers={3} cost={1000} color="bg-dark"/>
                <PositionForecastCard position="Managers" numberOfWorkers={3} cost={1000} color="bg-dark"/>
                <PositionForecastCard position="Managers" numberOfWorkers={3} cost={1000} color="bg-dark"/> 
            </div>
            <div className="border-t">
                <LabourForecastCard/> 
            </div>
        </div>
    )
}

export default AllPositionsCostBreakdown