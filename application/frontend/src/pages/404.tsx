import React from "react";
import SEO from "../components/seo"
import BackButton from "src/components/Buttons/backButton";
import router from "next/router";
import NavHeader from "src/components/Navigation/navHeader";

const PageNotFound = () => {
  return(
    <div className="flex flex-col w-screen h-screen">
      <SEO title="404 - Page Not found" />
        <div className="w-full sticky top-0 bg-white">
          <NavHeader/>
        </div>

        <div className="flex w-full h-24 items-center font-bold gap-4 pl-5 md:pl-20 xl:pl-40 border-b xl:border-0 pb-5 xl:pb-0 bg-white sticky top-24">
          <BackButton onClick={router.back}/>
          Go back
        </div>

        <div className="w-full flex flex-col md:flex-row">        
          <div className="flex flex-col w-full order-last md:order-first">
            <ul className="flex flex-col pl-5 md:pl-20 xl:pl-40">
              <span className="flex w-full h-24 items-center font-bold text-6xl">Oops...</span>
              <span className="flex w-full h-16 items-center text-2xl">Sorry, we can't find that page!</span>
              <span className="flex w-full h-10 items-center font-semibold text-xl">Error code: 404</span>
              <span className="flex w-full pt-5 items-center text-xl">Try these popular pages:</span> 
            </ul>
              
            <ul className="flex h-52 flex-col w-full gap-4 pt-5 pl-5 md:pl-20 xl:pl-40 text-blue">
              <a href="/liveworks/login/" className="hover:underline">Log in</a>
              <a href="https://www.liveworks.app" className="hover:underline">Home</a>
              <a href="https://www.liveworks.app/help/" className="hover:underline">Help</a>
              <a href="https://www.liveworks.app/about/" className="hover:underline">About</a>  
            </ul>      
          </div>
            
          <div className="flex w-full xl:h-ful order-first md:order-last">
            <img src="/Illustrations/404.svg" width="400" className="self-start"/>
          </div>

        </div>

        <div className="flex w-full items-center h-20 pl-5 md:pl-20 xl:pl-40">
          &copy; Live Companies, Inc. All rights reserved.
        </div>  
    </div>
  )

}

export default PageNotFound
