/*
• This is the labour forecast card displayed on the left of the schedule screen right below the calendar.
• This breaks down the cost of each individual position when workers have been scheduled.
• When a business creates a shift this is the card that is generated OR amounts are updated as more shifts of the same position
are being created. This component displayes the labour forecast of that position.
• This component is called on the AllPositionsCostBreakdown component.
*/


interface titlesProp {
    position: string
    numberOfWorkers: number
    cost: number
    color: string
}

const PositionForecastCard = (props: titlesProp) => {
    return(
        <div className="flex w-full bg-white">
            
            <div className="w-full flex items-center py-2">              
                
                <div className="w-full mx-3">
                    <p className="text-dark font-medium">{props.position}</p>
                    <p className="text-textGray text-xs">{props.numberOfWorkers} workers scheduled</p>
                </div>
                <div className="w-auto mx-3">
                    <p className="text-dark font-bold float-right pr-2">${props.cost}</p>
                </div>
                
            </div>
            
            <div className={`w-3 ${props.color}`}></div>
        </div>
    )
}

export default PositionForecastCard;
