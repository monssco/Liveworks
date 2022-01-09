/*
This is the card displayed in the shiftCard when the worker is already scheduled.

Would a img prop for the worker image be needed?
*/

interface nameProps {
    workerName: string
}

const ScheduledWorkerCard = (props: nameProps) => {
    return(
        <div className="p-1 card w-96">
            <div className="form-control flex-row">
                <label className="label">
                <img className="w-14 h-14 mask mask-squircle" src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"/>        
                <span className="label-text w-72 pl-2 font-medium">{props.workerName}</span> 
                </label>
            </div>         
        </div>        
    )
}

export default ScheduledWorkerCard;
