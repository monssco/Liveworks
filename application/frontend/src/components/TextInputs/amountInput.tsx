//Amount input type.
import { FieldHookConfig, useField } from "formik"

interface inputProps {
    title: string
    placeholder: string
}

const AmountInput = (props: inputProps & FieldHookConfig<string>) => {

    const [field, meta] = useField(props);


    return(
        <div className="form-control font-semibold">
            <label className="label">
                <span className="label-text">{props.title}</span>
                {meta.touched && meta.error ? (
                    // Display error message if there is an error
                    <div className="text-sm text-brightRed">{meta.error}</div>
                ) : null}
            </label> 
            <input 
                type="number" 
                placeholder={props.placeholder}
                className="input input-bordered"
                {...field}
            />
        </div>
    )
}

export default AmountInput