import AllPositionsCostBreakdown from "../SingleUseComponents/allPositionsCostBreakdown"

const LabourForecastDropdown = () => {
    return(
        <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-square border-none hover:border-none bg-backgroundDark xl:bg-white hover:bg-backgroundDark"><img src="/Icons/LabourForecastFill.svg"/></div> 
            <div tabIndex={0} className="mt-2 p-3 shadow menu dropdown-content bg-base-100 rounded-box w-80 h-96 overflow-scroll overscroll-none">
                <li>
                <AllPositionsCostBreakdown/>
                </li> 
                
            </div>
        </div>
    )
}

export default LabourForecastDropdown