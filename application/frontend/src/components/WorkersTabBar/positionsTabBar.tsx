//This is the tab bar that appears in the workers page. Only the positions that the user has invited will show in this tab bar

interface tabProps {
    positionAdded: string
}

const PositionsTabBar = (props: tabProps) => {
    return(
        <div className="tabs flex-nowrap flex flex-row overflow-scroll">
            <a className="tab tab-bordered tab-active text-md font-bold">{props.positionAdded}</a> 
            <a className="tab text-md">Bartenders</a> 
            <a className="tab text-md">Servers</a>
            <a className="tab text-md">Servers</a>
            <a className="tab text-md">Servers</a>
            <a className="tab text-md">Servers</a>
            <a className="tab text-md">Servers</a>
            <a className="tab text-md">Servers</a>
            <a className="tab text-md">Servers</a>
        </div>
    )
}

export default PositionsTabBar;