import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {useState} from "react"

const Header = ({ companyName }) => {

  const [isExpanded, toggleExpansion] = useState(false);
  const routes = [
    {
      route: `/about/`,
      title: `About`,
    },
    {
      route: `/services/`,
      title: `Services`,
    },
    {
      route: `/ventures/`,
      title: `Ventures`
    },
    {
      route: `/contact/`,
      title: `Contact`,
    },
  ]

  return (
    <div className="text-gray-600 body-font shadow z-20">
      <div className="container mx-auto">
        <div className="relative z-10 md:pb-8 bg-white ">

          <div className="relative py-4 md:py-0 md:pt-8 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-between" aria-label="Global">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link to="/" className="flex title-font font-medium items-center text-gray-900 ">

                    <span className="text-3xl">{companyName}</span>
                  </Link>
                  
                    <div className="-mr-2 flex items-center md:hidden">
                      <button type="button" onClick={() => toggleExpansion(true)} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" id="main-menu" aria-haspopup="true">
                        <span className="sr-only">Open main menu</span>
                        {/* <!-- Heroicon name: menu --> */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                      
                    </div>
            </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                {routes.map((link) => (
                  <Link
                    activeClassName="active"
                    // className="font-medium text-lg text-gray-500 hover:text-gray-900"
                    key={link.title}
                    to={link.route}
                    onClick={() => toggleExpansion(false)}
                  >
                    {link.title}
                  </Link>
                ))}
                  

                </div>
        </nav>
      </div>

            {/* <!--
        Mobile menu, show/hide based on menu open state.

        Entering: "duration-150 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-100 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      --> */}
      <div className={`absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden ${isExpanded ? "" : "hidden"}`}>
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                  <Link onClick={() => toggleExpansion(false)} to="/" className="flex title-font font-medium items-center text-gray-900 ">

                    <span className="text-3xl">{companyName}</span>
                  </Link>
            </div>
                    <div className="-mr-2">
                      <button type="button" onClick={() => toggleExpansion(false)} className=" bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close main menu</span>
                        {/* <!-- Heroicon name: x --> */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1" role="none">
                      
                      {routes.map((link) => (
                        <Link
                          activeClassName="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-900 hover:bg-gray-50"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
                          role="menuitem"
                          key={link.title}
                          to={link.route}
                          onClick={() => toggleExpansion(false)}
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                    <div role="none">
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </div>
  )
}

Header.propTypes = {
  companyName: PropTypes.string,
}

Header.defaultProps = {
  companyName: ``,
}

export default Header;