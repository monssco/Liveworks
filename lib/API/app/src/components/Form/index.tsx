import React, { useState } from 'react'
import { FormikErrors, useFormik } from 'formik';
import axios from "axios";

// Shape of form values
interface FormValues {
    firstName: string,
    lastName: string,
    email: string,
    city: string,
    companyName: string,
    description: string,
    goodFit: string,
    startingDate: string,
    referral: string,
}

const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } 

    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if(!values.city) {
        errors.city = 'Required';
    }

    if(!values.companyName) {
        errors.companyName = 'Required';
    }

    if(!values.description) {
        errors.description = 'Required'
    }

    if (!values.startingDate) {
        errors.startingDate = 'Required'
    }

    if (!values.referral) {
        errors.referral = 'Required'
    }

    return errors;
};

const Form = () => {

    const [submission, setSubmission] = useState({
        error: false,
        success: false,
        message: ''
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            city: '',
            companyName: '',
            description: '',
            goodFit: '',
            startingDate: '',
            referral: '',
        },
        validate,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            axios({
                method: "POST",
                url: "https://formspree.io/f/xgepnnql",
                data: values
            })
                .then(response => {
                    setSubmission({
                        ...submission,
                        success: true
                    })
                    // actions.setSubmitting(false);
                    // actions.resetForm();
                    // handleServerResponse(true, "Thanks!");
                })
                .catch(error => {
                    setSubmission({
                        ...submission,
                        error: true,
                        message: error.response.data.error
                    })
                    // actions.setSubmitting(false);
                    // handleServerResponse(false, error.response.data.error);
                });
        },
    });

    return (
        <>
            {submission.success ? <div><p className="font-sans font-semibold text-4xl pt-5 pb-3">Thanks!</p>
                <p className="text-2xl pb-10">We got your request, we'll be in touch shortly!</p></div>:null}
            <form
                className={`w-full ${submission.success ? "hidden" : "block"} `} onSubmit={formik.handleSubmit}>
                <input type="text" name="_gotcha" style={{display: "none"}} />
                <p className="font-sans font-semibold text-4xl pt-5 pb-3">Project Inquiry</p>
                <p className="text-2xl pb-10">We'll get back to you as soon as possible.</p>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <Input 
                        name='firstName'
                        htmlFor='grid-first-name'
                        error={formik.errors.firstName}
                        touched={formik.touched.firstName}
                        label='First Name'
                        placeholder=''
                        type='text'
                        className='w-full md:w-1/2 px-3 mb-6 md:mb-0'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        
                    />
                        
                    <Input
                        name='lastName'
                        htmlFor='grid-last-name'
                        error={formik.errors.lastName}
                        touched={formik.touched.lastName}
                        label='Last Name'
                        placeholder=''
                        type='text'
                        className='w-full md:w-1/2 px-3'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">

                    <Input
                        name='email'
                        htmlFor='grid-email'
                        error={formik.errors.email}
                        touched={formik.touched.email}
                        label='Email Address'
                        placeholder=''
                        type='email'
                        className='w-full md:w-1/2 px-3 mb-6 md:mb-0'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />

                    <Input
                        name='city'
                        htmlFor='grid-city'
                        error={formik.errors.city}
                        touched={formik.touched.city}
                        label='City'
                        placeholder=''
                        type='text'
                        className='w-full md:w-1/2 px-3'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />


                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <Input
                        name='companyName'
                        htmlFor='grid-company-name'
                        error={formik.errors.companyName}
                        touched={formik.touched.companyName}
                        label='Company Name'
                        placeholder=''
                        type='text'
                        className='w-full px-3'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        
                    />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-black text-base pb-2" htmlFor="project-description">
                            Project Description
                        </label>
                        <textarea name="description" onChange={formik.handleChange} className=" no-resize appearance-none block w-full bg-white text-gray-700 border-2 border-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-48 resize-y" id="project-description"></textarea>
                        <p className={`text-red-500 text-xs italic ${formik.errors.description && formik.touched.description ? `block` : `hidden`}`}>{formik.errors.description}</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-black text-base pb-2" htmlFor="project-description">
                            Why do you think we're a good fit? (optional)
                        </label>
                        <textarea name="goodFit" onChange={formik.handleChange} className=" no-resize appearance-none block w-full bg-white text-gray-700 border-2 border-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-48 resize-y" id="project-description"></textarea>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <Select
                        name='startingDate'
                        className='w-full md:w-1/2 px-3 mb-6'
                        label='How soon would you like to start?'
                        htmlFor='start'
                        handleChange={formik.handleChange}
                        options={['Select one','ASAP', 'In the next month', 'Within the next 3-6 months', 'Sometimes this year', 'Not sure yet']}
                        error={formik.errors.startingDate}
                        touched={formik.touched.startingDate}
                        onBlur={formik.handleBlur}
                    />

                    <Select
                        name='referral'
                        className='w-full md:w-1/2 px-3 mb-6'
                        label='How did you hear about us? '
                        htmlFor='hear'
                        handleChange={formik.handleChange}
                        options={['Select one', 'A friend referred me', 'I know someone at monss', 'Attended an event', 'Startup Calgary', 'Clutch.co', 'Online', 'Dribble']}
                        error = {formik.errors.referral}
                        touched = {formik.touched.referral}
                        onBlur = {formik.handleBlur}
                    />
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3">
                        
                        <button type="submit" className=" text-lg transition duration-300 ease-in-out h-16 bg-black border-black border-4 hover:bg-white text-white hover:text-black py-2 px-10 mr-1">
                            Submit
                        </button>
                    </div>
                    
                </div>
                <p className={`py-5 text-red-500 text-base italic ${submission.error ? `block` : `hidden`}`}>Sorry, there might be an error. Please check your fields and try again. If the problem persists, give us a call @ 587-703-1317!</p>
            </form>
        </>
    )
}

interface InputProps {
    name: string,
    htmlFor: string,
    label: string,
    placeholder: string,
    error: string, // for formik
    touched: boolean, // for formik
    type: string,
    className?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: (e: React.FocusEvent<any>) => void,
}

const Input = (props: InputProps) => (
    <div className={props.className}>
        <label className="block tracking-wide text-black text-base" htmlFor={props.htmlFor}>
            {props.label}
        </label>
        <input onBlur={props.onBlur} onChange={props.onChange} name={props.name} className={`appearance-none block w-full text-gray-700 border-b-2 border-gray-700 py-3 mb-3 leading-tight focus:outline-none focus:border-yellow-500 `} id={props.htmlFor} type={props.type} placeholder={props.placeholder} />
        <p className={`text-red-500 text-xs italic ${props.error && props.touched ? `block` : `hidden`}`}>{props.error}</p>
    </div>
)


interface SelectProps {
    name: string,
    label: string,
    htmlFor: string,
    className: string,
    options: string[],
    error: string,
    touched: boolean,
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    onBlur: (e: React.FocusEvent<any>) => void;
}

const Select = (props: SelectProps) => (
    <div className={props.className}>
        <label className="block tracking-wide text-black text-base" htmlFor={props.htmlFor}>
            {props.label}
        </label>
        <select className="w-full p-2 ring-1 mt-3 ring-black " name={props.name} onChange={props.handleChange} onBlur={props.onBlur}>
            {props.options.map((value) => {
                return (
                    <option key={value} value={value}>
                        {value}
                    </option>
                )
            })}
        </select>
        <p className={`text-red-500 text-xs italic ${props.error && props.touched ? `block` : `hidden`}`}>{props.error}</p>
    </div>
)


export default Form;