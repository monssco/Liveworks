//Primary actions. Such as creating shifts, continuing on screens, confirming changes etc.
//Will probably add a tooltip to these to clarify to the user.

import React from "react";

interface buttonProp {
    loading?: boolean;
    title: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PrimaryButton = (props: buttonProp) => {
    return(
        <div className="p-1">
            <button type="submit" className={`${props.loading ? 'loading' : ''} btn btn-block bg-dark normal-case rounded-full text-lg`} onClick={props.onClick}>{props.title}</button>
        </div>
    );
}

export default PrimaryButton;

/*
interface buttonProp {
    title: string
    onClick: (event:React.MouseEvent <HTMLButtonElement>) => void
}

const PrimaryButton = (props: buttonProp) => {
    return(
        <div className="p-5">
        <button className="btn btn-block bg-dark normal-case rounded-full" onClick={props.onClick} >{props.title}</button>
        </div>
    );
}
*/