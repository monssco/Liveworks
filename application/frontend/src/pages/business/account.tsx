import React from "react";
import SidebarIconInactive from "src/components/Navigation/sidebarIconInactive";
import Sidebar from "src/components/Navigation/sidebar";
import Navbar from "src/components/Navigation/navbar";
import SectionHeaderRightText from "src/components/Rows/sectionHeaderRightButton";
import ChangeProfilePhoto from "src/components/Cards/changeProfilePhotoCard";
import MobileTabBar from "src/components/Navigation/mobileTabBar";
import SidebarIconActive from "src/components/Navigation/sidebarIconActive";
import ButtonRightIcon from "src/components/Buttons/buttonWithRightIcon";
import SEO from "src/components/seo";

const accountPage = () => {
    return(
        <div className="flex flex-col md:flex-row w-screen h-screen bg-backgroundLight overflow-hidden">
            <SEO title="Account"/>
            {/* Col 1: left side */}
            <Sidebar
            iconOne={<SidebarIconInactive sidebarIcon='/../Icons/Schedule/CalendarLine.svg' tooltipText="Schedule" destination="/business/schedule"/>}
            iconTwo={<SidebarIconInactive sidebarIcon='/../Icons/Workers/UsersLine.svg' tooltipText="Workers" destination="/business/workers"/>}
            ></Sidebar>

            {/* Col 2: right side */}
            <div className="h-full w-full overflow-hidden">

                {/* NavBar */}
                <Navbar screenTitle="Account"/>

                <div className="flex w-full h-12 items-center p-5 border-b xl:border-0 pb-5 xl:pb-0 bg-white xl:bg-backgroundLight">
                    We're glad you're here! give <a href="https://www.liveworks.app" target="_blank" className="pl-1 font-bold underline"> feedback </a>
                </div>

                {/* 3 columns */}
                <div className="flex flex-col w-full h-5/6 xl:flex-row overflow-scroll overscroll-none">

                    {/*Column 1 (Edit profile info)*/}
                    <div className="w-full p-5">
                        <SectionHeaderRightText text="Your profile" buttonText="Edit"/>
                        <div className="p-5">
                            <ChangeProfilePhoto/>
                            {/*<TextInput title="Venue name" placeholder="Nue Cocktail Bar"/>*/}
                        </div>
                    </div>

                    {/*Column 2 (Edit log in info)*/}
                    <div className="w-full p-5">
                        <SectionHeaderRightText text="Log in info" buttonText="Edit"/>
                        <div className="p-5">
                            {/*<TextInput title="Email" placeholder="janedoe@gmail.com"/>
                            <TextInput title="Password" placeholder="•••••••••••••••"/>*/}
                        </div>
                    </div>

                    {/*Column 3 (Edit address) */}
                    <div className="w-full p-5">
                        <SectionHeaderRightText text="Address" buttonText="Edit"/>
                        <div className="p-5">
                            {/*<TextInput title="Address" placeholder="123 1 Ave SW"/>*/}
                        </div>
                    </div>

                    {/* Mobile only logout button view */}
                    <div className="flex flex-col sm:hidden p-5 w-full items-center pb-12">
                        <ButtonRightIcon title="Log out" titleColor="text-brightRed" buttonIcon="/Icons/logoutFill.svg" destination="/liveworks/login"/>
                        <div className="flex flex-row w-full justify-between items-center h-16 pl-5 pr-5">
                            <a href="https://www.liveworks.app/terms/" target="_blank" className="font-semibold">
                                Terms
                            </a>
                            <a href="https://www.liveworks.app/privacy/" target="_blank" className="font-semibold">
                                Privacy
                            </a>
                            <a href="https://www.liveworks.app/help/" target="_blank" className="font-semibold">
                                Help
                            </a>
                        </div>
                        &copy; Live Companies, Inc. All rights reserved.
                    </div>
                </div>
            </div>

            <MobileTabBar 
                iconOne={<SidebarIconInactive sidebarIcon='/../Icons/Schedule/CalendarLine.svg' tooltipText="" destination="/business/schedule"/>}
                iconTwo={<SidebarIconInactive sidebarIcon='/../Icons/Workers/UsersLine.svg' tooltipText="" destination="/business/workers"/>}
                iconThree={<SidebarIconActive sidebarIcon='/../Icons/User/UserFillWhite.svg' tooltipText="" destination="/business/account"/>}
            ></MobileTabBar>
        </div>
    )
}

export default accountPage