//Email input type.
import {FieldHookConfig, useField} from 'formik';

// https://formik.org/docs/tutorial
// https://stackoverflow.com/questions/61089182/how-to-properly-use-usefield-hook-from-formik-in-typescript
const EmailInput = (props: FieldHookConfig<string>) => {

    const [field, meta] = useField(props);

    return(
        <div className="form-control font-semibold">
            
            <label className="label">
                <span className="label-text">Email</span>
                {meta.touched && meta.error ? (
                // Display error message if there is an error
                <div className="text-sm text-brightRed">{meta.error}</div>
            ) : null}
            </label> 

            <input
                id="email"
                type="email" 
                placeholder="Enter your email here" 
                className="input input-bordered"
                {...field}
            />
            
        </div>
    )
}

export default EmailInput