//Mobile Tab bar. Only visible on mobile screens.

interface sidebarIconsProps {
    iconOne?: any
    iconTwo?: any
    iconThree?: any

}

const MobileTabBar = (props: sidebarIconsProps) => {
    return(
            <div className="md:hidden w-screen h-20 flex flex-row border-t bg-white">
                <nav className="dark:bg-gray-800 h-20 w-screen flex flex-col items-center">
                    <ul className="flex w-full items-center justify-evenly">
                        
                        {props.iconOne}
                        {props.iconTwo}
                        {props.iconThree}                                                                                                                                 
                    
                    </ul>
                </nav>
            </div>
    );
}


export default MobileTabBar;