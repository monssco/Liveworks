//Change profile photo component. This component is called in the account page.



const ChangeProfilePhoto = () => {
    return(
        
        <div className="flex flex-row w-full h-20 rounded-2xl items-center p-0 lg:p-2 justify-between">
            <div className="w-full flex flex-row">
                <img className="w-14 h-14 mask mask-squircle" src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"/> 

                <div className="flex flex-col justify-center pl-2">
                    <h2 className="font-bold text-md">Change profile picture</h2> 
                    <p className="text-sm">Max file size 20MB</p>
                </div>
            </div>
            
            <label className="btn btn-square bg-white hover:bg-backgroundDark border-none">
                <img src='/Icons/EditFill.svg'/>
                <input type="file"  accept="image/png, image/jpeg" className="hidden"/>
            </label>
            

        </div>
    )
}

export default ChangeProfilePhoto