/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Footer from './Footer/index';

import Header from "./Header/index"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query CompanyNameQuery {
      site {
        siteMetadata {
          companyName
        }
      }
    }
  `)

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header companyName={data.site.siteMetadata?.companyName || `monss`} />
      <main className="flex-grow">{children}</main>
      <Footer></Footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
