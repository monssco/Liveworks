import React from "react"
import SEO from "../components/seo"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from 'gatsby-image';

import HireUs from "../components/HireUs/index";
import Careers from '../components/Careers/index';
import Carousel from "../components/Carousel";
import Button from "../components/Button";
import Results from "../components/Results";
import NextStep from "../components/NextStep";
import Services from "../components/Services";

const IndexPage = () => (
  <>
    <SEO title="Monss - Digital Product Design Agency located in Calgary" 
          lang='en'
    />
    <div className="flex flex-col min-h-full mx-auto">
      {/* Main home landing container */}

      <Landing></Landing>
      <WhoWeAre></WhoWeAre>
      <Services></Services>

      {/* Paths we have travelled container */}
      
      <Carousel></Carousel>

      <Results></Results>

      {/* Hire Us */}
      <section className="container mx-auto p-5">
        <HireUs />
        <Careers />
      </section>

      <NextStep></NextStep>
    </div>
  </>
)

export default IndexPage


const Landing =() => {

  const data = useStaticQuery(graphql`
        query LandingImageQuery {
            monssStudio: file(relativePath: { eq: "studio_monss.png" }) {
                childImageSharp {
                    fluid(maxWidth: 2000, maxHeight: 1335, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluidLimitPresentationSize
                    }
                }
                
            }
        }
    `)

  return (
    <div className="container mx-auto md:pt-20 pb-10 lg:py-40 p-5">
      <h1 className="text-4xl md:text-7xl xl:text-9xl font-semibold">digital design +
        <br/>
        development
      </h1>
      <div className="flex flex-col md:flex-row justify-between pt-5 md:pt-10 lg:pt-20">
        <div className="flex-1" >
          <Img
          alt="Monss Studio Calgary"
          fadeIn
          fluid={data.monssStudio.childImageSharp.fluid}/></div>

        <div className="w-full md:w-2/5 xl:w-1/3 text-lg lg:text-2xl leading-10 text-black text-opacity-75 mt-5 md:ml-12 md:mt-0">
          <h2 className="text-2xl md:text-4xl mb-10">
            Transforming <span className="italic">your</span> ideas into digital products.
          </h2>

          <h2>
            We create digital experiences including websites and mobile apps. Monss is more than just a tech company - we are your digital partners.
          </h2>

        <div className="mt-4 md:mt-10">
            <Link to="/about/">
              <Button text="About us" />
            </Link>
        </div>
        </div>
      </div>
    </div>
  )
}



const WhoWeAre = () => {
  return (
    <section className="container mx-auto min-h-screen md:min-h-screen-90 lg:min-h-screen-60 relative flex lg:block">
      <div className="my-auto">
        <p className="text-center text-sm opacity-50 m-5 capitalize">Hi, we're monss.</p>
        <div className="w-2/3 m-auto">
          <h2 className="text-left md:text-center md:leading-relaxed text-2xl md:text-4xl">
            <span>We're a digital design and tech company that speaks all the software lingo. But luckily, we speak human too. </span>

            <em className="font-william">We design, we write code, and we love the business side of it all.</em> We are hired to <strong className="font-bold">work on new problems together</strong>, instead of telling people what they want to hear.
        </h2>
        </div>
      </div>
        
        <p className="absolute bottom-0 md:bottom-10 left-0 h-40 w-3  bg-black"></p>
    </section>
  )
}

