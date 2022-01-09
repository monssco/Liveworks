/*
This is the page where the user selects what type of account they want to create. The reason why this is it's own page
is because i'm considering this a global page in the app. it's neither business nor worker therefore it goes in the liveworks
folder inside the pages root tree.
*/

import React from "react";
import Link from "next/link";
import BackButton from 'src/components/Buttons/backButton';  
import NavHeader from "src/components/Navigation/navHeader";
import { useRouter } from 'next/router';
import SEO from "src/components/seo";

const selectAccountPage = () => {

    const router = useRouter();

    return(
        <div className="w-screen max-h-screen">
            <SEO title="Create account"/>
            <div className="sticky top-0 bg-white">
            <NavHeader/>
            </div>

            {/*Select type of account (Business or Worker) */}
            <div className="flex w-full h-full items-center justify-center lg:pt-0">
                <div className="justify-center items-center w-full xl:w-5/12 p-10 xl:p-0 ">
                    <BackButton onClick={router.back}/>
                    <div className="xl:text-left">
                        <h1 className="text-xl font-bold p-3">What type of account would you like to create?</h1> 
                    </div> 
                    <div className="block md:flex items-center justify-between w-full gap-3 p-5">
                    <Link href='/business/signup'>
                        <div className="flex flex-col h-60 w-60 normal-case text-dark text-left border-2 rounded-lg hover:bg-backgroundDark hover:border-dark cursor-pointer mb-5">                                                
                            <img src="/../Illustrations/BusinessIllustration.svg" width="100" height="100" className=" justify-self-start"/>
                            <p className="text-lg font-bold pl-5">Business account</p>
                            <p className="text-md pl-5"> If you’re a business owner or manager looking to create employee scheduling, then choose this account.</p>                                                  
                        </div>
                    </Link>
                    <Link href=''>
                        <div className="flex flex-col h-60 w-60 normal-case text-dark text-left border-2 rounded-lg hover:bg-backgroundDark hover:border-dark cursor-pointer mb-5">
                            <img src="/../Illustrations/WorkerIllustration.svg" width="100" height="100" className=" justify-self-start"/>
                            <p className="text-lg font-bold pl-5">Worker account</p>
                            <p className="text-md pl-5"> If you’re a worker employed with a venue currently using Liveworks, then choose this account.</p> 
                        </div>
                    </Link>                        
                    </div>                                                                                                                                      
                </div>
            </div>
        </div>
    )
}

export default selectAccountPage;