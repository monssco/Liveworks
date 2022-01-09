//Notes input field displayed when creating a shift.
import { FieldHookConfig, useField } from "formik"

const NotesInput = (props: FieldHookConfig<string>) => {

    const [field, meta] = useField(props);

    return(
        <div className="form-control font-semibold">
            <label className="label">
                <span className="label-text">Shift notes</span>
                {meta.touched && meta.error ? (
                    // Display error message if there is an error
                    <div className="text-sm text-brightRed">{meta.error}</div>
                ) : null}
            </label> 
            <textarea 
                className="textarea h-24 textarea-bordered" 
                placeholder="Enter notes for this shift here"
                {...field}
            ></textarea>
        </div>
    )
}

export default NotesInput