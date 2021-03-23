import React from 'react';

const Results = () => {
    return (
        <section className="bg-monss text-white">
            <div className="container mx-auto p-5">
                <p className="text-5xl max-w-lg py-20">We deliver results in months, not years.</p>
                <div className="flex flex-col md:flex-row md:divide-x">

                    <div className="md:w-2/12 lg:w-1/12">
                        <p className="px-5 py-10 bg-gray-800">Initial <br/> Meeting</p>
                        <p className="p-5">1-2 Hours</p>
                    </div>
                    <div className="md:w-3/12 lg:w-1/6" >
                        <p className="px-5 py-10  bg-gray-700">Requirements <br /> Gathering</p>
                        <p className="p-5">3-4 Weeks</p>
                    </div>
                    <div className="md:w-4/12 lg:w-3/12" >
                        <p className="px-5 py-10 bg-gray-600">Interactive <br /> Prototyping</p>
                        <p className="p-5">4-6 Weeks</p>
                    </div>
                    <div className="md:w-6/12" >
                        <p className="px-5 py-10 bg-gray-500" >Code Development <br /> and Production Deployment</p>
                        <p className="p-5">6-8 Months</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Results;