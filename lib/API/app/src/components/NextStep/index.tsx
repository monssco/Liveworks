import { Link } from 'gatsby'
import React from 'react'

interface Props {
    
}

const NextStep = (props: Props) => {
    return (
        <section className="bg-monss h-screen/3 text-white flex">
            
            <div className="m-auto container p-5">
                <p className="text-white text-sm md:text-base opacity-50">Find out how we can help your business</p>
                <p className="text-4xl md:text-7xl">Take the next step</p>
                <Link className="md:text-xl underline" to="/contact/">Let's talk</Link>
            </div>
        </section>
    )
}

export default NextStep
