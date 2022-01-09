//Password input type.

import { FieldHookConfig, useField } from "formik";

const PasswordInput = (props: FieldHookConfig<string>) => {
    const [field, meta] = useField(props);
    return(
        <div className="form-control font-semibold">
            <label className="label">
                <span className="label-text">Password</span>
                {meta.touched && meta.error ? (
                // Display error message if there is an error.
                <div className="text-sm text-brightRed">{meta.error}</div>
            ) : null}
            </label> 
            <input 
                type="Password" 
                placeholder="Enter your password here" 
                className="input input-bordered"
                {...field}
            />
            
        </div>
    )
}

export default PasswordInput