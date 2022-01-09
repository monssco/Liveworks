//This is the empty screen illustration.
//<h1> Is the Title </h1> a prop will have to be passed for it to work
// <p> Is the subtext </p> a prop will have to be passed for it to work

interface titlesProp {
    title: string
    subtitle: string
    illustration: string
}
const EmptyScreen = (props: titlesProp) => {
    return(
        <div className="h-96 w-full md:w-80 pl-5 pr-5 md:pl-0 md:pr-0">
            <h1 className="text-1xl font-bold pb-0 md:pb-5"> {props.title} </h1>
            <p> {props.subtitle} </p>
            <img src={props.illustration}/>
        </div>
    );
}

export default EmptyScreen;


