import React from 'react'

const LiveworksSuccess:React.FC<{text:string}> = ({text}) => {
    return (
        <div className="py-3">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{text}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title></svg>
            </span>
            </div>
        </div>
    )
}

export default LiveworksSuccess
