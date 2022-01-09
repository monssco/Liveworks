//Sidebar, work in progress
/*
The sidebar right now calls child components that we can add and remove as we add pages to the app.
If you go to whereever the sidebar component is being called, you will see which child component is being called. Right now
they are the Active and Inactive Icon components on the Navigation folder.
*/

import Image from 'next/image';


interface sidebarIconsProps {
    iconOne?: any
    iconTwo?: any

}

const Sidebar = (props: sidebarIconsProps) => {
    return(
            <div className="hidden md:visible h-screen w-20 md:flex flex-row border-r bg-white">
                <nav className="dark:bg-gray-800 w-20 h-screen justify-between flex flex-col items-center">
                    <ul className="items-center">
                        
                        <div className="h-24 items-center justify-center flex">
                            <Image src='/Logo/LiveworksIcon.svg' width="50" height="50"/>
                        </div>
                        
                        {props.iconOne}
                        {props.iconTwo}                                                                                                                                 
                    
                    </ul>
                </nav>
            </div>
    );
}


export default Sidebar;

