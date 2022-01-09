import IconButton from "../Buttons/iconButton";

/* 
This is the shifts details card header that shows a close button, time of shift, edit and delete buttons of each individual 
shift that is being created.

•Find Icon buttons in the components/buttons/iconButtons to edit the component.
•This component is used as a child component in the shiftCard.tsx file under components/Cards/shiftCard

Have to pass time as a prop maybe? Not sure if this is how is passed. will have to double check.
*/

const ShiftCardHeader = () => {
    return(
        <div className="items-center flex-row w-96">
            
            <IconButton icon='/Icons/CloseFill.svg'/>
            
            <label className="ml-2 mr-5 font-bold text-m">10:00AM - 2:00AM</label>
            
            <div className="float-right">
            <IconButton icon='/Icons/DeleteFill.svg'/>
            </div>
            
            <div className="float-right">
            <IconButton icon='/Icons/EditFill.svg'/>
            </div>                   
            
    </div>
    )
}


export default ShiftCardHeader;
