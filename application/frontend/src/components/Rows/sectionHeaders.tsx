//This is the section header. It contais a title and a button.


interface buttonTextProp {
    text: string
}

const SectionHeader = (props: buttonTextProp) => {
    return(
        <div className="flex items-center h-11 w-full border-b">
                <label className="w-full mx-3 font-bold text-sm">{props.text}</label>
        </div>
    )
}


export default SectionHeader;

