import React, { FunctionComponent } from "react"
import Helmet from "react-helmet"

import config from '../config'

interface Props {
  description?: string
  lang?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any[]
  title: string
}

const SEO: FunctionComponent<Props> = ({
  description = "",
  lang = "en",
  meta = [],
  title,
}: Props) => {

  const metaDescription = description || config.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${config.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: config.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SEO