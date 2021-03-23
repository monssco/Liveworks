import React from 'react';

interface DifferenceProps {
    number: number;
    title: string;
    subTitle?: string;
    options?: string[];
}

const Difference = (props: DifferenceProps) => {
    return (
        <div className="flex-1 max-w-sm py-5 lg:py-0 divide-y-2">
            <div>
            </div>
            <div>
                <p className="pt-2">{props.number}</p>
                <p className="font-sans font-medium text-2xl py-3 leading-loose">{props.title}</p>
                <p className="leading-loose">{props.subTitle}</p>
                <ul className="">
                    {
                        props.options == null ? null : <>{props.options.map(d => {
                            return (
                                <li className="text-lg font-light" key={d}> {d}</li>
                            )
                        })}</>
                    }
                </ul>
            </div>

        </div>
    )
}

export default Difference;