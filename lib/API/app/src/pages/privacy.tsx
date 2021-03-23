import React from 'react'
import SEO from '../components/seo'
import { OutboundLink } from 'gatsby-plugin-google-gtag';

interface Props {
    
}

const PrivacyPage = (props: Props) => {
    return (
        <>
            <SEO title='Your Privacy' description='Monss cares about your privacy. Find out how we handle your information.' />
            <section className="container mx-auto p-5 min-h-screen md:h-screen-70"> 
                <p className="font-extralight">Privacy & cookies</p>
                <p className="font-sans font-light text-3xl md:text-6xl max-w-2xl pb-10 leading-tight">
                    PRIVACY MATTERS.
                </p>
                <p className="text-lg lg:text-2xl leading-10 text-black text-opacity-75  max-w-prose">
                    Monss cares about your privacy. That is why we do not use third-party cookies for this website that require your permission. You will not be tracked and we do not store any information about you. We only use anonymized Google Analytics to measure and improve the use of our website.

                    <br/>
                    <br/>
                    If you'd like to opt out of Google Analytics, you can use a tracker blocker such as <OutboundLink className="underline text-black" href='https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en'>uBlock Origin</OutboundLink> for Chrome.

                    <br/>
                    <br/>
                    Information submitted via any of the contact forms is not shared with any third party.
                </p>

            </section>
        </>
    )
}

export default PrivacyPage
