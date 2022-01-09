//Email input type.
import {FieldHookConfig, useField} from 'formik';
import Autocomplete from 'react-google-autocomplete'

// https://formik.org/docs/tutorial
// https://stackoverflow.com/questions/61089182/how-to-properly-use-usefield-hook-from-formik-in-typescript
const AddressInput = (props:{placeholder: string} & FieldHookConfig<string>) => {

    const [field, meta, helpers] = useField(props);
    
    return(
        <div className="form-control font-semibold">
            <label className="label">
                <span className="label-text">Address</span>
                {meta.touched && meta.error ? (
                // Display error message if there is an error
                <div className="text-sm text-brightRed">{meta.error}</div>
            ) : null}
            </label> 
            <Autocomplete
                className="input input-bordered"
                // style={{ width: "250px" }}
                placeholder={props.placeholder}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                // Callback when the user types an address
                onPlaceSelected={
                    (place) => helpers.setValue(place.formatted_address)
                }
                // setting this option allows the full address to be shown as you type
                options={{
                    types: ['geocode']
                }}
                {...field}
            />
            
        </div>
    )
}

export default AddressInput