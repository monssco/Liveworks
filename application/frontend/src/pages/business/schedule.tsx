import React from "react";
import SidebarIconActive from "src/components/Navigation/sidebarIconActive";
import SidebarIconInactive from "src/components/Navigation/sidebarIconInactive";
import Sidebar from "src/components/Navigation/sidebar";
import MobileTabBar from "src/components/Navigation/mobileTabBar";
import Navbar from "src/components/Navigation/navbar";
import CreateShiftButton from "src/components/Buttons/createShiftButton";
import AllPositionsCostBreakdown from "src/components/SingleUseComponents/allPositionsCostBreakdown";
import LabourForecastDropdown from "src/components/Dropdown/labourForecastDropdown";
import SEO from "src/components/seo";

const schedulePage = () => {

    return(
        <div className="flex w-screen h-screen flex-col md:flex-row bg-backgroundLight overflow-hidden">
            <SEO title="Schedule"/>
            {/* Col 1: left side */}
            <div className="z-10">
                <Sidebar
                    iconOne={<SidebarIconActive sidebarIcon='/../Icons/Schedule/CalendarFill.svg' tooltipText="Schedule" destination="/business/schedule"/>}
                    iconTwo={<SidebarIconInactive sidebarIcon='/../Icons/Workers/UsersLine.svg' tooltipText="Workers" destination="/business/workers"/>}
                ></Sidebar> 
            </div>
            
            {/* Col 2: right side */}
            <div className="h-full w-full overflow-hidden z-0">

                {/* NavBar */}
                <Navbar screenTitle="Schedule"/> 

                {/* Content container */}
                <div className="flex flex-col xl:flex-row h-full w-full">

                    {/* Calendar Column */}
                    <div className="w-full h-40 p-3 border-b xl:border-b-0 xl:flex xl:flex-col xl:h-full xl:w-80 bg-white xl:bg-backgroundLight">
                        <div className="pb-3">
                            <CreateShiftButton destination="/business/shift/create"/>
                        </div>

                        {/* Calendar + labour forecast */}
                        <div className="flex flex-row justify-between gap-3 xl:flex-col">
                            
                            {/* Calendar goes in this div */}
                            <div className="flex items-center justify-center w-full h-12 xl:h-56 rounded-lg p-3 font-bold bg-backgroundDark xl:bg-white"> Calendar </div>
                            
                            {/* Dropdown iconButton will be hidden on desktop */}
                            <div className="xl:hidden">
                                <LabourForecastDropdown/>
                            </div>

                            {/* Cost breakdown of shifts created per position */}
                            <div className="hidden xl:visible xl:flex">
                                <AllPositionsCostBreakdown/> 
                            </div>                                                                               
                        </div>                       
                    </div>

                    {/* Current day + Gantt Timeline */}
                    <div className="flex flex-col w-full h-full">
                        {/* Current day row */}
                        <div className="hidden xl:visible xl:flex w-full h-20 font-bold pl-5 items-center">
                            Current day shows here
                        </div>

                        {/* Timeline view */}
                        <div className="w-full h-3/4 xl:h-5/6 pb-10 overflow-scroll overscroll-none">
                            
                        </div>                                                                  
                    </div>
                
                </div>                          
            
            </div>
            <MobileTabBar 
                iconOne={<SidebarIconActive sidebarIcon='/../Icons/Schedule/CalendarFill.svg' tooltipText="" destination="/business/schedule"/>}
                iconTwo={<SidebarIconInactive sidebarIcon='/../Icons/Workers/UsersLine.svg' tooltipText="" destination="/business/workers"/>}
                iconThree={<SidebarIconInactive sidebarIcon='/../Icons/User/UserLineDark.svg' tooltipText="" destination="/business/account"/>}
            ></MobileTabBar>
        </div>        
        
    )
}

export default schedulePage;
