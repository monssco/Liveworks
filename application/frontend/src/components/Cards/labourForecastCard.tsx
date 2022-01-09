/*
• Labour forecast card. This card is at the bottom of the labour forecast column (under the calendar) that adds the cost of all 
positions with created shifts on them. This card takes all the positions totals and number of workers scheduled to provide a 
full overview of the labour forecast cost and provides a labour percenrage if sales have been entered.
• This component is influenced by the PositionForecastCard component. All the information in that component will determine the
information on this component for that scheduled day.
*/

const LabourForecastCard = () => {
    return(
        <div className="flex w-full bg-white h-20">
            
            <div className="w-full flex items-center py-3">              
                
                <div className="w-full mx-3">
                    <p className="text-dark">Labour forecast</p>
                    <p className="text-textGray text-sm">3 workers scheduled</p>
                    <p className="text-dark font-bold">$3,000</p>
                </div>
                <div className="w-auto mx-3">
                    <p className="text-textGray float-right pr-2">30%</p>
                </div>
                
            </div>
            
            
        </div>
    );
}

export default LabourForecastCard;
