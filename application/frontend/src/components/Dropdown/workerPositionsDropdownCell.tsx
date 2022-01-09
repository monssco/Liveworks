/**
 * This is a dropdown cell
 * @param props should be string text
 * @returns jsx element
 */
const PositionsDropdownCell = (props: {text: string, onClick: () => void}) => {
    return(
        <li className="hover:bg-backgroundDark flex h-16 p-3 items-center rounded-xl cursor-pointer text-dark"
            onClick = {props.onClick}    
        >
            <a className="pl-2">{props.text}</a>
        </li> 
    )
}

export default PositionsDropdownCell