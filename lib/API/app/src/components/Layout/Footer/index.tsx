import { Link } from 'gatsby';
import React from 'react'
const Logo = require('./logo.svg') as string;
import { OutboundLink } from "gatsby-plugin-google-gtag"


const Footer = () => {
    return (
      <footer className="bg-monss text-white pt-10">
        <div className="container mx-auto p-5">
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 gap-8">
            <FooterItemCompany></FooterItemCompany>
            <FooterItemServices></FooterItemServices>
            <FooterItemNewProjects></FooterItemNewProjects>
            {/* <FooterItemDirections></FooterItemDirections> */}
            <FooterPrivacy></FooterPrivacy>
          </div>

          <div className="divide-y divide-white my-10">
            <div className="flex flex-col-reverse md:flex-row justify-between items-end space-y-2 md:space-y-0 gap-2">
              <p className="text-sm">
                © {new Date().getFullYear()}, monss inc.
            </p>
              <div className="">
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                  <OutboundLink href="https://www.facebook.com/monssco-100898055292131" className="hover:text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </OutboundLink>

                  {/* Twitter */}
                  <OutboundLink href="https://twitter.com/monssco" className="ml-3 hover:text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </OutboundLink>
                  <OutboundLink href="https://www.instagram.com/monss.co/" className="ml-3 hover:text-gray-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                    </svg>
                  </OutboundLink>
                  <OutboundLink href="https://www.linkedin.com/company/monss" className="ml-3 hover:text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="none"
                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                      />
                      <circle cx="4" cy="4" r="2" stroke="none" />
                    </svg>
                  </OutboundLink>
                </span>
              </div>

              <div className="flex flex-col items-end">
                <Logo />
                <p>Made in Calgary with love.</p>
              </div>
            </div>
            <div className="mt-5">
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;

const FooterItemCompany = () => {

  const Links = [
    {
      title: 'About',
      link: '/about/'
    },
    {
      title: 'Services',
      link: '/services/'
    },
    {
      title: 'Ventures',
      link: '/ventures/'
    }
  ]

  return(
    <div className="flex-1">
      <p className="opacity-40 text-lg">Company</p>
      <ul className="">
        {Links.map(d=> {
          return(
            <li key={d.title}>
              <Link to={d.link} className="text-lg opacity-80 hover:opacity-100 hover:underline">{d.title}</Link>
            </li>
          )
        })}
        <li>
          <OutboundLink href="https://forms.gle/X9Vuhn2svqNjNjSd7" className="text-lg opacity-80 hover:opacity-100 hover:underline">Careers</OutboundLink>
        </li>
      </ul>
    </div>
  )
}

const FooterItemServices = () => {

  const Links = [
    {
      title: 'Product Design',
      link: '/services/'
    },
    {
      title: 'Mobile App Development',
      link: '/services/'
    },
    {
      title: 'Web Development',
      link: '/services/'
    },
    {
      title: 'Cloud Development',
      link: '/services/'
    },
    {
      title: 'DevOps',
      link: '/services/'
    },
    {
      title: 'Support',
      link: '/services/'
    }
  ]

  return (
    <div className="flex-1">
      <p className="opacity-40 text-lg">Services</p>
      <ul className="">
        {Links.map(d => {
          return (
            <li key={d.title}>
              <Link to={d.link} className="text-lg opacity-80 hover:opacity-100 hover:underline">{d.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const FooterItemNewProjects = () => {

  return (
    <div className="flex-1">
      <p className="opacity-40 text-lg">New Projects</p>
      <ul className="">
        <li>
          <OutboundLink href="mailto:hello@monss.co?subject=Hello Monss!" className="text-lg opacity-80 hover:opacity-100 underline">hello@monss.co</OutboundLink>
        </li>
        <li>
          <OutboundLink href="tel:587-609-7008" className="text-lg opacity-80 hover:opacity-100 underline">587-609-7008</OutboundLink>
        </li>
        <li>
          <Link to="/contact/" className="text-lg opacity-80 hover:opacity-100 underline">Contact</Link>
        </li>
      </ul>
    </div>
  )
}

const FooterItemDirections = () => {

  return (
    <div className="flex-1">
      <p className="opacity-40 text-lg">Directions</p>
      <OutboundLink className="text-lg opacity-80 hover:opacity-100 hover:underline" href="https://goo.gl/maps/17xdtmrge9bR5eB5A">500 Center Street S <br/> Calgary, Alberta</OutboundLink>
    </div>
  )
}

const FooterPrivacy = () => {

  const Links = [
    {
      title: 'Privacy & Cookies',
      link: '/privacy/'
    }
  ]

  return (
    <div className="flex-1">
      <p className="opacity-40 text-lg">Your Privacy</p>
      <ul className="">
        {Links.map(d => {
          return (
            <li key={d.title}>
              <Link to={d.link} className="text-lg opacity-80 hover:opacity-100 hover:underline">{d.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}