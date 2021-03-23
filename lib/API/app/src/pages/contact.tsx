import React, {useState} from 'react'
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import Studio from '../images/studio';
import Form from '../components/Form';
import { OutboundLink} from 'gatsby-plugin-google-gtag';


const ContactPage = (props) => {
    return (
        <>
            <SEO title="Contact" description="Monss offers design, development, and custom software solutions for your business. Contact us today for a hassle-free consultation."></SEO>
            <div className="container mx-auto p-5">
                <div className="flex flex-col md:flex-row">
                    <div className=" md:w-3/4">
                        <Form></Form>
                    </div>
                    <div className=" md:w-1/4">
                        <SideBar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactPage

ContactPage.defaultProps = {
    theme: 'indigo'
};

ContactPage.propTypes = {
    theme: PropTypes.string.isRequired
};




const SideBar = () => (
    <div className="w-full py-16 md:pl-20">
        <Studio className="mt-12"/>
        <div className="py-8">
            <p className="font-sans text-xl">Want to join our team?</p>
            <OutboundLink href="https://forms.gle/X9Vuhn2svqNjNjSd7" target="blank" rel="noopener noreferrer">
                <p className="font-bold text-lg transition duration-300 ease-in-out underline hover:no-underline hover:text-yellow-500">
                    Work at Monss</p>
            </OutboundLink>
        </div>
        <div className="">
            <p className="font-sans text-xl">Something else?</p>
            <OutboundLink href="mailto:hello@monss.co?subject=Hello Monss!" target="blank" rel="noopener noreferrer">
                <p className="font-bold text-lg transition duration-300 ease-in-out underline hover:no-underline hover:text-yellow-500">
                    General Inquiries</p>
            </OutboundLink>
        </div>
    </div>
)