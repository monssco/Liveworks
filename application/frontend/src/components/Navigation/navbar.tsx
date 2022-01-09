//Nav bar. Work in progress

import ButtonRightIcon from "../Buttons/buttonWithRightIcon";

interface screenTitleProps {
    screenTitle: string
}

const Navbar = (props: screenTitleProps) => {
    return(
        <div className="navbar h-20 bg-white">

            {/* Page title, Shows the user what page they're on */}
            <div className="flex-1 px-2 lg:flex-none">
                <a className="text-lg font-bold">{props.screenTitle}</a>
            </div>

            <div className="flex justify-end flex-1 px-2">
                <div className="flex items-stretch">
                    <div className="dropdown dropdown-end">

                        {/* User profile photo */}
                        <div tabIndex={0} className="btn btn-ghost rounded-btn hover:bg-white">
                            <img className="rounded-2xl w-10 h-10" src="https://i.pravatar.cc/500?img=32"/>
                        </div>

                        <ul tabIndex={0} className="p-2 shadow dropdown-content bg-white rounded-box w-72 mt-2 overflow-scroll hidden md:visible md:flex md:flex-col">
                            <li className="hover:bg-backgroundDark h-16 items-center rounded-xl cursor-pointer text-dark">
                                <ButtonRightIcon title="Account" titleColor="text-dark" buttonIcon="/Icons/user/userFillDark.svg" destination="/business/account"/>                           
                            </li> 
                            <li>
                                <a href="https://www.liveworks.app/terms/" target="_blank" className="hover:bg-backgroundDark flex h-16 pl-5 items-center rounded-xl cursor-pointer text-dark">
                                    Terms
                                </a>
                            </li> 
                            <li>
                                <a href="https://www.liveworks.app/privacy/" target="_blank" className="hover:bg-backgroundDark flex h-16 pl-5 items-center rounded-xl cursor-pointer text-dark">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="https://www.liveworks.app/help/" target="_blank" className="hover:bg-backgroundDark flex h-16 pl-5 items-center rounded-xl cursor-pointer text-dark">
                                    Help
                                </a>
                            </li>
                            {/* Logout/end session button */}
                            <li className="flex hover:bg-backgroundDark h-16 items-center rounded-xl cursor-pointer">
                                <ButtonRightIcon title="Log out" titleColor="text-brightRed" buttonIcon="/Icons/logoutFill.svg" destination="/liveworks/login"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>          
        </div>
    )
}

export default Navbar;

