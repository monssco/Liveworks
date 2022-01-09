

const AlertInfo: React.FC = (props) => {
    return (
        <div className="alert flex-row alert-info m-1">
            <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
                </svg> 
                <label>{props.children}</label>
            </div>
        </div>
    )
}

export default AlertInfo
