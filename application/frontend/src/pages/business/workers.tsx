import React from "react";
import SidebarIconActive from "src/components/Navigation/sidebarIconActive";
import SidebarIconInactive from "src/components/Navigation/sidebarIconInactive";
import Navbar from "src/components/Navigation/navbar";
import Sidebar from "src/components/Navigation/sidebar";
import WorkerCard from "src/components/Cards/workerCard";
import ButtonRightIcon from "src/components/Buttons/buttonWithRightIcon";
import EmptyScreen from "src/components/EmptyScreens/emptyscreen";
import MobileTabBar from "src/components/Navigation/mobileTabBar";
import { useBusinessListWorkersQuery } from "src/graphql/generated/graphql";
import AlertError from "src/components/Alert/error";
import AlertInfo from "src/components/Alert/info";
import SEO from "src/components/seo";

const workersPage = () => {

    // gets all the workers for now, later this can be moved over to a paginated input
    const {data, loading, error} = useBusinessListWorkersQuery({
        variables: {
            i: {
                limit: 1000,
                offset: 0,
            }
        }
    })

    return(      
        <div className="flex w-screen h-screen flex-col md:flex-row bg-backgroundLight overflow-hidden">
            <SEO title="Workers"/>
            {/* Col 1: left side */}
            <div className="z-10">
                <Sidebar
                    iconOne={<SidebarIconInactive sidebarIcon='/../Icons/Schedule/CalendarLine.svg' tooltipText="Schedule" destination="/business/schedule"/>}
                    iconTwo={<SidebarIconActive sidebarIcon='/../Icons/Workers/UsersFill.svg' tooltipText="Workers" destination="/business/workers"/>}
                ></Sidebar> 
            </div>

            {/* Col 2: right side */}
            <div className="h-full w-full overflow-hidden z-0">
                
                {/* NavBar */}
                <Navbar screenTitle="Workers"/>

                {error && <AlertError>Unable to fetch workers, error: {error.message}</AlertError>}
                {loading && <AlertInfo>Loading...</AlertInfo>}

                {/* Workers empty screen */}
                {data?.businessListWorkers.length === 0 &&
                    <div className="flex flex-col h-5/6 w-full items-center pt-10 md:pt-20 overflow-scroll">                       
                        <EmptyScreen title="No workers added" subtitle="No workers have been added yet, add them to begin scheduling properly" illustration="/../Illustrations/InviteWorkers.svg"/>
                        <div className="w-full sm:w-80 p-0 pl-5 pr-5 lg:pl-0 lg:pr-0">
                            <ButtonRightIcon title="Add workers" buttonIcon="/Icons/Add/AddFillDark.svg" destination="/business/inviteworkers"/>
                        </div>
                    </div>
                }               

                {/* After workers have been invited section */}
                {data && data.businessListWorkers.length > 0 &&
                    <div className="flex-col h-full w-full pb-10">  
                        {/* Add workers Button Section */}
                        <div className="w-full h-20 p-3 border-b xl:border-none bg-white xl:bg-backgroundLight">
                            <ButtonRightIcon title="Add workers" titleColor="text-dark" buttonIcon="/Icons/Add/AddFillDark.svg" destination="/business/inviteworkers"/>
                        </div>

                        {/* Invited workers list section */}  
                        <div className="flex-col w-full h-5/6 gap-3 p-3 pb-10 overflow-scroll overscroll-none">
                            {
                                data.businessListWorkers.map(worker => (
                                    <WorkerCard 
                                        color={worker.position?.color} 
                                        key={worker.id}
                                        firstName={worker.first_name}
                                        lastName={worker.last_name}
                                        email={worker.email}
                                        position={worker.position?.name}/>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
            <MobileTabBar 
                iconOne={<SidebarIconInactive sidebarIcon='/../Icons/Schedule/CalendarLine.svg' tooltipText="" destination="/business/schedule"/>}
                iconTwo={<SidebarIconActive sidebarIcon='/../Icons/Workers/UsersFill.svg' tooltipText="" destination="/business/workers"/>}
                iconThree={<SidebarIconInactive sidebarIcon='/../Icons/User/UserLineDark.svg' tooltipText="" destination="/business/account"/>}
            ></MobileTabBar>                                           
        
        </div>            
    )
} 

export default workersPage;