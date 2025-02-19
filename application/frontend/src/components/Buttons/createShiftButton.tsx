//This button starts the action of going to the "create shift screen". Big blue button on the schedule page.

import Link from "next/link";

interface buttonProps{
    destination: string
}
const CreateShiftButton = (props: buttonProps) => {
    return(
        <Link href={props.destination}>
            <button className="w-full h-14 btn bg-blue hover:bg-blue border-0 normal-case text-lg rounded-lg justify-between">
                Create shift
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>Icon/Add/Fill white</title>
                    <g id="Icon/Add/Fill-white" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
                        <path d="M20.77,12 C20.7687616,12.1241756 20.7184299,12.2428147 20.63,12.33 C20.5442692,12.4132547 20.4295036,12.4598782 20.31,12.46 L12.46,12.46 L12.46,20.31 C12.4598782,20.4295036 12.4132547,20.5442692 12.33,20.63 C12.2433782,20.7191982 12.1243369,20.7695316 12,20.7695316 C11.8756631,20.7695316 11.7566218,20.7191982 11.67,20.63 C11.5867453,20.5442692 11.5401218,20.4295036 11.54,20.31 L11.54,12.46 L3.69,12.46 C3.56798926,12.4575444 3.45090366,12.4114197 3.36,12.33 C3.184758,12.1448975 3.184758,11.8551025 3.36,11.67 C3.45090366,11.5885803 3.56798926,11.5424556 3.69,11.54 L11.54,11.54 L11.54,3.69 C11.5401218,3.57049642 11.5867453,3.45573081 11.67,3.37 C11.7566218,3.2808018 11.8756631,3.23046841 12,3.23046841 C12.1243369,3.23046841 12.2433782,3.2808018 12.33,3.37 C12.4132547,3.45573081 12.4598782,3.57049642 12.46,3.69 L12.46,11.54 L20.31,11.54 C20.4295036,11.5401218 20.5442692,11.5867453 20.63,11.67 C20.7184299,11.7571853 20.7687616,11.8758244 20.77,12 Z" id="Path" stroke="#FFFFFF" fill="#FFFFFF"></path>
                    </g>
                </svg>
            </button>
        </Link>
    )
}

export default CreateShiftButton;