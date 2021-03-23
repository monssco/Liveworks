import React from 'react';


const Skills = () => {

    return (
        <>
            <section className="bg-monss py-10">
                <h2 className="text-white container mx-auto px-5 font-sans md:font-light text-3xl md:text-5xl leading-tight" >Things we're good at</h2>
                <div className="container mx-auto p-5 divide-y-2 divide-white flex flex-col space-y-14 md:space-y-0 gap-14" >
                    <div></div>
                    <SkillItem
                        title="STRATEGY"
                        description="We start with understanding key insights & observations to blend branding, UX and technology to create smart and purpose-driven solutions that transform businesses."
                        options={[
                            'Brand Research',
                            'Discovery Workshops',
                            'Brand Strategy',
                            'Digital Product Strategy',
                            'Brand Messaging',
                            'Campaign Development'
                        ]} />

                    <SkillItem
                        title="DESIGN"
                        description="We design with purpose. We're obsessive with why a design works not just how it looks. We look to partner with clients who realize the potential of well designed systems."
                        options={[
                            'Identity Systems',
                            'Visual Language & Art Direction',
                            'Brand Guidelines',
                            'UI / UX Design',
                            'Design Systems & Styleguides',
                            'Design Production & Execution'
                        ]} />

                    <SkillItem
                        title="TECHNOLOGY"
                        description="We’re curious about emerging new tech. We make digital products through a human-centered focus. We don’t just believe in great ideas, but also in flawless execution of them."
                        options={[
                            'Full-Stack Development',
                            'Interactive Prototyping',
                            'E-commerce & Websites',
                            'CMS Implementation',
                            'Technical Architecture',
                            'iOS & Android Applications'
                        ]} />
                </div>
            </section>
        </>
    )
}

interface SkillItemProps {
    title: string
    description: string
    options: string[]
}

const SkillItem = ({ title, description, options }: SkillItemProps) => {
    return (
        <div className="text-white">
            <h2 className="text-sm font-medium py-3">{title}</h2>
            <div className="flex flex-col md:flex-row gap-10 md:gap-20 my-5 justify-evenly">
                <div className="hidden lg:block flex-1" />
                <p className="flex-1 text-xl max-w-xs">
                    {description}
                </p>
                <ul className="flex-1 divide-white divide-y">
                    {options.map(d => {
                        return (
                            <li key={d} className="text-xl py-4" >{d}</li>
                        )
                    })
                    }
                </ul>
            </div>
        </div>
    )
}


export default Skills;