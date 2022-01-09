//This is the sidebar icon component used to build the sidebar
//An Icon SVG prop will have to be provided for it to work

//Work in progress.

import Link from "next/link";

interface iconProps {
    sidebarIcon: string
    tooltipText: string
    destination: string
}

const SidebarIconActive = (props: iconProps) => {
    return(
        <li data-tip={props.tooltipText} className="tooltip tooltip-right pl-1.5">
            <div className="m-3 indicator">
                <div className="hidden indicator-item badge badge-secondary m-4 p-1.5 h-1.5 bg-red-500 border-0"></div>              
                <Link href={props.destination}>
                    <a className="bg-dark rounded-2xl grid w-11 h-11 place-items-center">
                        <img src={props.sidebarIcon}/>
                    </a> 
                </Link>            
            </div>
        </li>
    )
}

export default SidebarIconActive;

