import React from 'react'
import ContactUsButton from '../ContactUsButton/index'

const HireUs = () => {
    return (
        <div className='divide-y py-20'>
            <div className="py-5 ">
                <p className="text-5xl max-w-md">Hire Us</p>
                <div className="flex flex-col lg:flex-row justify-between">
                    <Callout title="1 Week Trial" subTitle="We start new relationships with a one week sprint. This helps both parties assess fit before making a longer-term commitment." />


                    <Callout title="How we operate" subTitle="We work in monthly increments because it provides us the flexibility to adapt, as requirements and priorities shift." />
                </div>

            </div>
            
            <div className="py-5">
                <ContactUsButton/>
            </div>
        </div>
    )
}


interface CalloutProps {
    title:string,
    subTitle:string,
}

export const Callout = (props: CalloutProps) => (
    <div className="flex-1">
        <p className="font-normal opacity-50 text-3xl pt-5">{props.title}</p>
        <p className="max-w-sm py-4 text-lg lg:text-2xl leading-10 text-black text-opacity-80">{props.subTitle}</p>
    </div>
)

export default HireUs;