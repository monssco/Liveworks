//This is a double text component. Used to display 2 column text. One to the left, one the right.

interface textProps {
    title: string
    display: string
}

const DoubleText = (props: textProps) => {
    return(
        <div className="flex w-full items-center p-3">
            <div className="w-full text-left">{props.title}</div>
            <div className="w-full text-right font-bold">{props.display}</div>
        </div>
    )
}

export default DoubleText;

