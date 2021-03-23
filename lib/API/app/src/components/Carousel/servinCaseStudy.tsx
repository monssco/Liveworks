import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image'


interface CaseStudyInterface {
    title: string;
    subTitle: string;
}

const ServinCaseStudy = (props: CaseStudyInterface) => {

    const data = useStaticQuery(graphql`
        query ServinCarouselQuery {
            fileName: file(relativePath: { eq: "servin_logo.png" }) {
                childImageSharp {
                    fluid(maxHeight: 50) {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluidLimitPresentationSize
                    }
                }
            }
            liveworks: file(relativePath: { eq: "servin.png" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
`)

    function BackgroundSection({ className, children }) {
        const imageData = data.liveworks.childImageSharp.fluid

        return (
            <BackgroundImage
                Tag="section"
                className={className}
                fluid={imageData}
            >
                {children}
            </BackgroundImage>
        )
    }

    return (
        <BackgroundSection className="">
            <div className="mb-0 md:p-20 md:w-1/2 text-white h-screen-90 md:h-screen/2 relative">
                <div className="absolute bottom-10 p-5">
                    <Img fluid={data.fileName.childImageSharp.fluid} imgStyle={{ objectFit: 'contain' }} />
                    <p className="font-sans text-2xl py-5">{props.title}</p>
                    <p className="font-light text-xl">{props.subTitle}</p>
                </div>
            </div>
        </BackgroundSection>
    )
}

export default ServinCaseStudy;
