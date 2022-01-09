//Used when sending the worker an invite to join their team on Liveworks.

type SendInviteButtonProps = {
    loading?: boolean
    onClick?: () => void
}

const SendInviteButton = (props: SendInviteButtonProps) => {

    return(
        <button type="submit" 
            onClick={props.onClick}
            className={`${props.loading ? ' loading ' : ' '} btn btn-square btn-lg bg-blue hover:bg-blue border-none`}>
            <svg className={`${props.loading ? ' hidden ' : ' block '}`} width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Icon/Send/Fill</title>
                <g id="Icon/Send/Fill" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
                    <path d="M4.42993358,2.68092075 L22.1039929,11.0971395 C22.602629,11.3345852 22.8143656,11.9312975 22.5769198,12.4299336 C22.4782296,12.6371831 22.3112425,12.8041703 22.1039929,12.9028605 L4.42993358,21.3190792 C3.93129748,21.556525 3.33458524,21.3447884 3.09713948,20.8461523 C3.03318586,20.7118497 3,20.564971 3,20.4162187 L3,14.0036847 L3,14.0036847 L3,13.0041656 L13.003145,12 L3,10.9999084 L3,10.0454551 L3,3.58378127 C3,3.03149652 3.44771525,2.58378127 4,2.58378127 C4.14875232,2.58378127 4.29563098,2.61696713 4.42993358,2.68092075 Z" id="Shape" fill="#FFFFFF"></path>
                </g>
            </svg>
        </button>
    );
}

export default SendInviteButton;
