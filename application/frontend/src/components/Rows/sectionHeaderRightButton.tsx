//This is the section header. It contais a title and a button.
//A button text prop will have to be passed for it to work.

interface buttonTextProp {
    text: string
    buttonText: string
}

const SectionHeaderRightText = (props: buttonTextProp) => {
    return(
        <div className="flex items-center h-11 w-full justify-between border-b">
                <label className="w-full mx-3 font-bold text-sm">{props.text}</label>
                <button className="btn btn-sm btn-ghost mr-1 text-blue normal-case hover:bg-backgroundDark">{props.buttonText}</button> 
        </div>
    )
}


export default SectionHeaderRightText;