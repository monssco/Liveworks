import React, {useState} from 'react'

interface Props {
    
}

const FAQ = (props: Props) => {


    const FAQ = [
        {
            question: 'How long does a project usually take?',
            answer: 'In house design only projects can be completed within 1-4 months, while custom application development usually lasts between 6-12 months - project dependant. We also follow a flexible schedule when embedding our team within an organization. For specific details, please contact us.'
        },
        {
            question: 'Does Monss offer consulting?',
            answer:'Yes, we offer support with strategy, execution, technology stack tooling and on-boarding of technical employees. If you require assistance with anything that isn\'t listed, please feel free to reach out to us and we will be able to provide an answer.'
        },
        {
            question: 'What support options are available post project completion?',
            answer: 'Every project comes with a free 3 month post completion support period. If support is required past this time, we offer options for monthly, retainer or per-issue basis. If you require custom support options, please feel free to reach out to us and we can help adjust to your requirements.'
        },
        {
            question: 'Does Monss support legacy or pre-existing systems?',
            answer: 'Yes we do. We are open to working on pre-existing projects that might have been started by someone else, please contact us with your requirements and we will get back to you.'
        },
        {
            question: 'What if I have any other questions?',
            answer: 'Fear not, we realize that this isn\'t an exhaustive question list, so we are sure you must have other questions for us. In any case please give us a call or contact us and we\'d be happy to sit down with you and discuss things in detail!'
        }
    ]

    return (
        <>
            <div className="bg-gray-100 pt-10">
                <div className="mx-auto max-w-6xl">
                    <div className="p-2 bg-gray-100 rounded">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 p-4 text-sm">
                                <div className="text-3xl">Frequently asked <span className="font-medium">Questions</span></div>
                                <div className="my-2">Wondering about our services?</div>
                                <div className="mb-2">Confused about how we can improve your business?</div>
                                <div className="text-xs text-gray-600">Dive into our FAQ for more details!</div>
                            </div>
                            <div className="md:w-2/3">
                                <div className="p-4">
                                    {
                                        FAQ.map(d=> {
                                            return (
                                                <FAQItem key={d.question} title={d.question} description={d.answer} ></FAQItem>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FAQ;

interface FAQProps {
    title: string,
    description: string,
}

const FAQItem = (props: FAQProps) => {

    const [opened, setOpened] = useState(false);

    return (
        <div className="mb-2 select-none">
            <div onClick={() => setOpened(!opened)} className="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer bg-white hover:bg-white">
                <div className="flex-auto">{props.title}</div>
                <div className="px-2 mt-1">
                    <div >
                        {/* Up buttom */}
                        <svg className={`${opened ? `block` : `hidden`} feather feather-chevron-up w-5 h-5`}  xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                        {/* Down button */}
                        <svg className={`${opened ? `hidden` : `block`} feather feather-chevron-up w-5 h-5`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
            <div className={`${opened ? `block` : `hidden`} p-5 text-justify text-left text-gray-800 mb-5 bg-white`} >{props.description}</div>
        </div>
    )
}
