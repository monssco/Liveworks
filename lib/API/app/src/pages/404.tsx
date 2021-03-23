import React from "react"
import { Link } from 'gatsby';
import SEO from "../components/seo"
import { OutboundLink} from 'gatsby-plugin-google-gtag';

const NotFoundPage = () => (
  <>
    <SEO title="404 - Page Not found" />
    <section className="container mx-auto p-5 flex h-screen">
      <div className="m-auto">
        <p className="text-2xl md:text-7xl">404. The page you are trying for doesn't exist.</p>
        
        <p className="text-xl md:text-5xl">Fear not! You can still go to the </p>
        
         <Link className="text-3xl md:text-8xl underline" to="/">homepage</Link>

        <p className="opacity-80 pt-10">In case you were expecting a page here, please contact <OutboundLink href="mailto:admin@monss.co">admin@monss.co</OutboundLink> for help!
        </p>
      </div>
    </section>
  </>
)

export default NotFoundPage
