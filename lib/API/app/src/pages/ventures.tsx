import React from 'react'
import {useStaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import Difference from '../components/Difference';
import Form from '../components/Form/venture';

interface Props {
    
}

const VenturesPage = (props: Props) => {

    

    const data = useStaticQuery(graphql`
        query VentureImageQuery {
            mountainsDistance: file(relativePath: { eq: "mountains_distance.png" }) {
                childImageSharp {
                    fluid {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluidLimitPresentationSize
                    }
                }
            }
        }
    `)


// TODO: Change all the wording, its copied from funsize


    return (
        <>  
            <SEO title="Monss Ventures" description='Investing in people with bold ideas. We provide affordable strategy and design solutions for your business. Find out how we can help your startup. Apply Today.'></SEO>
            <div className="">
                <div className="container mx-auto p-5 flex flex-col lg:flex-row justify-center space-y-10 space-x-10 gap-10 md:gap-8 py-10 lg:py-20">

                    <div className="flex-1 relative">

                        <Img
                            className="z-0"
                            fluid={data.mountainsDistance.childImageSharp.fluid}
                            alt="User interface design"
                        />
                        <p className="z-10 p-3 absolute top-0 left-0 bg-black text-white text-2xl font-extrabold tracking-widest">Ventures</p>

                        <p className="z-10 p-3 absolute left-0 bottom-0 bg-white text-white text-2xl font-extrabold tracking-widest">Monss</p>
                    </div>
                    <div className="flex-1 py-14 md:py-0">
                        <p className="font-sans md:font-light text-4xl md:text-6xl leading-tight max-w-prose">
                            Investing in people with <strong>bold</strong> ideas.
                        </p>
                        <p className="max-w-md text-xl py-4">We know that starting a business is not easy. Canadians come from different backgrounds and bring various experiences to the table.
                        <br/><br/>
                        Because all of us are not cut from the same cloth, we don’t have to grow businesses the same way either.
                        <br/><br/>
Monss Ventures invests in passionate, underrepresented founders and provides them with affordable strategy and design solutions to help them reach their goals.</p>
                    </div>
                </div>

                <WhatWeLookFor></WhatWeLookFor>

                <NittyGritty></NittyGritty>
                <div className="container p-5 max-w-prose mx-auto mb-20">
                    <Form></Form>
                </div>
            </div>

        </>
    )
}

export default VenturesPage

const WhatWeLookFor = () => {
    return(
        <section className="text-white bg-monss opacity-95 py-24">
            
            <div className="container mx-auto p-5 my-10">
                <p className="font-sans md:font-light text-4xl md:text-6xl max-w-2xl pb-10 leading-tight flex-1">What we look for</p>
                <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10 gap-10 flex-1">
                    <Difference number={1} title="Under Represented" subTitle="We’re open to everyone and we have a special place in our heart for minority and family-owned businesses."></Difference>
                    <Difference number={2} title="Driven" subTitle="We like working with people who are go-getters. They don't take no for an answer, and always find ways around challenges."></Difference>
                    <Difference number={3} title="Design Oriented" subTitle="We want to work with people who are equally passionate about design as we are."></Difference>
                    <Difference number={4} title="Empathetic" subTitle="We look for founders that look at problems from all perspectives, even if they are different than their own."></Difference>
                </div>
            </div>
        </section>
    )
}


const NittyGritty = () => {
    return (
        <section className=" container mx-auto bg-gray-200 m-20 p-10 ">
            <div className="max-w-prose mx-auto">
                <p className="font-sans text-4xl md:text-6xl max-w-2xl pb-10 leading-tight">The lowdown</p>
                <p className="text-xl">It’s pretty straight-forward: Monss takes an equity stake in your startup. In exchange, we provide you with the full firepower of our strategy and design experts to take your digital product or service to the next level.</p>
                <div className="md:ml-32 py-10 md:p-10">
                    <p className="py-5 text-3xl">What we offer</p>
                    <div className="flex flex-col md:flex-row md:gap-8">
                        <p className="leading-loose text-xl">
                            $1000 in credits*
                            <br/>
                            Business Strategy
                            <br/>
                            Product Journey Mapping
                            <br/>
                            Design Sprints
                            ‍<br/>
                            User Testing
                        </p>
                        <p className="leading-loose text-xl">
                            Market Research
                            <br />
                            Branding
                            <br />
                            UI / UX
                            <br />
                            Service Design
                            <br />
                            Front-End Development
                        </p>
                        
                    </div>
                    
                </div>
                <p className="text-xs">*Conditions Apply</p>
            </div>
        </section>
    )
}