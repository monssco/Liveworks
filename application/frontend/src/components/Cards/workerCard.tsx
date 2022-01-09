/*
This is the card that is displayed in the workers screen

MVP Displays:
•Shows the worker name
•Subtext, mvp will display email used to invite worker.

First Update
• Add dropdpwn menu that allows the user to change the workers position or remove them from the list.
*/

interface workerProps {
    firstName?: string | null
    lastName?: string | null
    email: string,
    color?: string | null,
    position?: string | null
}

const getFirstLetter = (char?: string | null) => char?.at(0)?.toUpperCase()

const WorkerCard = (props: workerProps) => {
    return(
        <div className="dropdown w-full p-2 cursor-pointer">
            
            {/* Worker details */}
            <div tabIndex={0} className="card h-20 gap-3 flex flex-row items-center bg-white hover:bg-backgroundDark">
                {/* Color of position added */}
                <div style={{
                    backgroundColor: props.color ? props.color : '' 
                }} className="w-3 h-full bg-black"></div>

                {/* Show the workers first name and last name initials in this span */}
                <span className="flex items-center justify-center w-14 h-14 mask mask-squircle font-bold bg-backgroundDark">{`${getFirstLetter(props?.firstName)}${getFirstLetter(props?.lastName)}`}</span>
                
                <div className="flex-col w-full">
                    <h2 className="pl-3 font-bold w-full">{props.firstName} {props.lastName}</h2> 
                    <p className="w-full pl-3 text-sm text-textGray">{props.position}</p>
                </div>
            </div>

            {/* Dropdown Contents */}
            <ul tabIndex={0} className="p-2 mt-2 shadow dropdown-content bg-white rounded-box w-72 max-h-64 overflow-scroll">
                 {/* The email that the worker was added with will show here */}
                <li className="flex h-16 p-3 items-center rounded-xl cursor-pointer text-dark">
                    <span className="pl-2">Emails will be sent to <strong>{props.email}</strong></span>
                </li>
            </ul> 

        </div>     
    );
}

export default WorkerCard;
