
/**
 * A back arrow button. This button is used to navigate back to the previous page/element based on
 * what ever function that is passed in via the props.
 * @param props onClick that is passed in from the parent component
 * @returns a button that is shaped like a back arrow
 */
const BackButton =(props: {onClick: () => void}) => {

    return(
        <button className="btn btn-square rounded-2xl bg-backgroundLight hover:bg-backgroundDark border-none" onClick={props.onClick}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Icon/Back/Fill</title>
                <g id="Icon/Back/Fill" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
                    <path d="M10.2334868,4.67031269 L10.453462,4.87644877 C10.8564572,5.25409058 10.8770101,5.88692189 10.4993683,6.28991706 C10.4845671,6.30571198 10.4692569,6.32102216 10.453462,6.33582339 L5.802,10.694 L21.476232,10.6946395 C22.0285168,10.6946395 22.476232,11.1423547 22.476232,11.6946395 L22.476232,12.0739573 C22.476232,12.6262421 22.0285168,13.0739573 21.476232,13.0739573 L5.741,13.073 L10.453462,17.4891377 C10.8564572,17.8667795 10.8770101,18.4996108 10.4993683,18.902606 L10.453462,18.9485123 L10.453462,18.9485123 L10.2334868,19.1546484 C9.84887289,19.5150653 9.25053868,19.5150653 8.8659248,19.1546484 L1.91622232,12.6421679 C1.51322714,12.264526 1.49267418,11.6316947 1.87031599,11.2286996 C1.88511722,11.2129046 1.90042739,11.1975945 1.91622232,11.1827932 L8.8659248,4.67031269 C9.25053868,4.30989577 9.84887289,4.30989577 10.2334868,4.67031269 Z" id="Back" fill="#1F1F27"></path>
                </g>
            </svg>
        </button> 
    );
}

export default BackButton;