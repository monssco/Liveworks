import React, { FunctionComponent } from "react"
import SEO from "../components/seo"
import Link from 'next/link';

const NotFoundPage: FunctionComponent = () => (
  <>
    <SEO title="404 - Page Not found" />
    <section className="container mx-auto p-5 flex h-screen">
      <div className="m-auto">
        <p className="text-2xl md:text-7xl">404.</p>
        
        <p className="text-xl md:text-5xl">Go to the </p>
        
        <Link href="/">
          <a className="text-3xl md:text-8xl underline">
            homepage
            </a>
        </Link>
      </div>
    </section>
  </>
)

export default NotFoundPage
