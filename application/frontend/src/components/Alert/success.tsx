
const AlertSuccess: React.FC = (props) => {
    return (
        <div className="alert flex-row alert-success m-1">
            <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">          
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>                
                </svg> 
                <label>{props.children}</label>
            </div>
        </div>
    )
}

export default AlertSuccess
