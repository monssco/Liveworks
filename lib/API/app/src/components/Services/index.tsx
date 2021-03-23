import React from 'react';

const ServiceArray = [
    'Digital strategy',
    'Digital design (UI + UX)',
    'Full Stack development',
    'Cloud development',
    'DevOps'
]

const ProductArray = [
    'Websites',
    'E-commerce including Stripe',
    'Web applications',
    'Progressive Web Apps',
    'Mobile applications'
]

const Services = () => {

    return (
        <>
            <section className="bg-monss py-10">
                <div className="container mx-auto p-5 flex flex-wrap text-white space-y-10 md:space-y-0 md:gap-10" >
                    <div className="w-full sm:w-1/2 lg:w-2/5 sm:px-25 lg:px-5">
                        <h3 className="py-3 uppercase">Our Services</h3>
                        <ul className="divide-y divide-white divide-opacity-70">
                            {ServiceArray.map(d => {
                                return (
                                    <li className="text-xl py-3" key={d} >{d}</li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="w-full sm:w-1/2 lg:w-2/5 sm:px-25 lg:px-5">
                        <h3 className="py-3 uppercase">Our Products</h3>
                        <ul className="divide-y divide-white divide-opacity-70">
                            {ProductArray.map(d => {
                                return (
                                    <li className="text-xl py-3" key={d} >{d}</li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="w-1/4">
                        
                    </div>
                    
                </div>
            </section>
        </>
    )
}


export default Services;