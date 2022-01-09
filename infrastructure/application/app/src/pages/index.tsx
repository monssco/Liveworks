import React from "react"
import SEO from "../components/seo"
import { NextPage } from "next";


const IndexPage: NextPage = () => {


  return (
    <>
      <SEO title="Liveworks - Title!" 
            lang='en'
      />
      <div>
        Hello from the homepage!
      </div>
    </>
  )
}

export default IndexPage
