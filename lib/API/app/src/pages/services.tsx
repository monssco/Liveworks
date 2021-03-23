import React from 'react'
import FAQ from '../components/FAQ';
import SEO from '../components/seo';

import Difference from '../components/Difference';
import { Link } from 'gatsby';

const ServicesPage = () => {
    return (
        <>
            <SEO title="Services" description="Monss uses design and data science to provide elegant software solutions, we combine your ideas with our experience. Find out how we can transform your business" />
        <div className="">
            
            <section className="container mx-auto p-5 flex flex-row pt-10">
                <div className="flex-1">
                    <p className="font-extralight">OUR SERVICES</p>
                        <p className="font-sans font-light text-3xl md:text-6xl max-w-2xl pb-10 leading-tight">
                        What we offer.
                    </p>
                        <h1 className="max-w-prose text-lg lg:text-2xl leading-10 text-black text-opacity-75">From strategy to development and everything in between. <br/><br/> We work with our clients to customize the scope of each software project. Our goal is to achieve the maximum business impact. Whether that means full project ownership or collaboration with an existing team.</h1>
                </div>
            </section>

            
            <MockUpImage></MockUpImage>
            <div className="p-10"></div>
            <Skills></Skills>

            <section className="container mx-auto p-5">
                <div className="py-10 mx-0">
                    <div className="center">
                        <div className="h-8 w-20 bg-black"></div>
                            <p className="text-lg">
                                Have a Project for us?
                    </p>
                        <Link to="/contact">
                            <p className="py-3 underline font-bold text-lg">Let's chat</p>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="pb-32">
                <FAQ></FAQ>
            </div>
        </div>
        </>
    )
}

export default ServicesPage;


import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Skills from '../components/Skills';



const MockUpImage = () => {

    const data = useStaticQuery(graphql`
        query MockupImageQuery {
            fileName: file(relativePath: { eq: "mockup.png" }) {
                childImageSharp {
                    fluid(maxWidth: 300, maxHeight: 385) {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluidLimitPresentationSize
                    }
                }
            }
            userDesign: file(relativePath: { eq: "user_experience.png" }) {
                childImageSharp {
                    fluid(maxWidth: 400, maxHeight: 385) {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluidLimitPresentationSize
                    }
                }
            }
            userMockup: file(relativePath: { eq: "usermockup.png" }) {
                childImageSharp {
                    fluid(maxWidth: 300, maxHeight: 385) {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluidLimitPresentationSize
                    }
                }
            }
            designStudio: file(relativePath: { eq: "design_studio.png" }) {
                childImageSharp {
                    fluid(maxWidth: 250, maxHeight: 385) {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluidLimitPresentationSize
                    }
                }
            }
        }
`)

    const imageData = data.fileName.childImageSharp.fluid

    return (
        <div className="flex md:flex-row justify-center space-x-4 md:space-x-8 gap-4 md:gap-8 py-10 md:py-20">
            <Img
                className="hidden md:block flex-1 flex-shrink-0 object-cover h-96"
                fluid={imageData}
                alt="User interface design"
            >
            </Img>
            <Img
                className="flex-1 object-cover h-96 my-10"
                fluid={data.userDesign.childImageSharp.fluid}
                alt="User design">
            </Img>
            <Img
                className=" flex-1 object-cover h-96 -my-5"
                fluid={data.userMockup.childImageSharp.fluid}
                alt="monss user testing mockups">
            </Img>
            <Img
                className="hidden md:block flex-1 object-cover h-96 mt-5"
                fluid={data.designStudio.childImageSharp.fluid}
                alt="monss user testing mockups">
            </Img>
        </div>
    )

}