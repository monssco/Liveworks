//This is button with an icon. It's used for suggestive actions and not primary ones.
// Ex: Adding workers, add custom position etc..

import Link from "next/link";
import React from "react";

interface iconProps {
    buttonIcon: string
    title: string
    destination?: string
    titleColor?: string
    onclick?: (event: React.MouseEvent<HTMLElement>) => void
}

const ButtonRightIcon = (props: iconProps) => {

    if (props.onclick) {
        return(
            <button onClick={props.onclick} type="button" className="flex btn btn-lg justify-between w-full rounded-xl p-5 bg-white border-none hover:bg-backgroundDark hover:border-none text-dark normal-case font-semibold text-base">
                <div className={`text-left ${props.titleColor}`}>{props.title}</div> 
                <div className="w-auto"><img src={props.buttonIcon}/></div>                
            </button>
        )
    } else if (props.destination) {
        return(
            <Link href={props.destination}>
                <button  className="flex btn btn-lg justify-between w-full rounded-xl p-5 bg-white border-none hover:bg-backgroundDark hover:border-none text-dark normal-case font-semibold text-base">
                    <div className={`text-left ${props.titleColor}`}>{props.title}</div> 
                    <div className="w-auto"><img src={props.buttonIcon}/></div>                
                </button>
            </Link>
        )
    } else {
        return (
            <div>Error: No destination OR onClick function provided.</div>
        )
    }
}

export default ButtonRightIcon;