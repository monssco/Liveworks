//Icon buttons are used for secondary actions such as editing shifts, deleting shift.
//It is used as a child component in other components

interface iconProp {
    icon: string
    onClick?: () => void
}

const IconButton = (props: iconProp) => {
    return (
        <button type={props.onClick ? 'button' : 'submit'} className="btn btn-square bg-white hover:bg-backgroundDark border-none" onClick={props.onClick}>
            <img src={props.icon}/>
        </button>
    )
}

export default IconButton;
