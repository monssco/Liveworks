import { ListBusinessTypeQuery } from "src/graphql/generated/graphql"
import {FieldHookConfig, useField} from 'formik';

// Select type of business component, used in the signup flow.
// Requires a list of business types to be passed in as props.
// Must be housed inside a formik form.
const SelectTypeOfBusiness = (props: {
    types: ListBusinessTypeQuery;
} & FieldHookConfig<string>) => {

    const [field, meta, helpers] = useField(props);

    return(
        <div className="p-2 card">
            {meta.touched && meta.error ? (
                // Display error message if there is an error
                <div className="text-sm text-brightRed font-semibold">{meta.error}</div>
            ) : null}
            {props.types.listBusinessType.map((element) => {
                return(
                    <div className="form-control" key={element.id}
                    {...field}
                    onClick={() => helpers.setValue(element.id)}>
                        <label className="p-5 cursor-pointer label hover:bg-backgroundDark rounded-xl">
                        <span className="label-text">{element.name}</span> 
                        <input
                            id='radio'
                            type='radio'
                            className="radio" 
                            {...field}
                            onClick={() => helpers.setValue(element.id)}
                        />
                        </label>
                    </div>
                )
            })}
            
        </div>
    )
}

export default SelectTypeOfBusiness