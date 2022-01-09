/*
This is the business sign up flow. Containers are organized in the way that the user will flow through them.
*/

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import LiveworksError from "src/components/Alert/error";
import LiveworksInfo from "src/components/Alert/info";
import LiveworksSuccess from "src/components/Alert/success";
import BackButton from 'src/components/Buttons/backButton';
import PrimaryButton from "src/components/Buttons/primaryButton";
import NavHeader from "src/components/Navigation/navHeader";
import SelectTypeOfVenue from "src/components/SingleUseComponents/selectTypeOfBusiness";
import AddressInput from "src/components/TextInputs/addressInput";
import EmailInput from "src/components/TextInputs/emailInput";
import PasswordInput from "src/components/TextInputs/passwordInput";
import TextInput from "src/components/TextInputs/textInput";
import { useListBusinessTypeLazyQuery, useUpdateBusinessMutation, useUpdateBusinessPictureMutation } from "src/graphql/generated/graphql";
import { confirmUser, resendConfirmationCode, signUpBusiness } from "src/utils/auth";
import * as yup from 'yup'

import { useRouter } from "next/router";
import SEO from "src/components/seo";

const businessSignUpPage = () => {

    // nextjs router
    const router = useRouter();
    const [screenState, setScreenState] = useState<{
        index: number,
        lastSlug: string,
        visibleComponents: boolean[]
    }>({
        index: 0,
        // Url of the page we want them to go to after they have finished signing up.
        lastSlug: '/business/schedule',
        // An array that keeps track of which component should be visible at a given stage.
        // by default, the first component is visible.
        visibleComponents: [true, false, false, false, false, false, false]
    });

    /**
     * Function responsible for going forward through the sign up flow.
     * It will use the visiblecomponents array inside the screenState to determine which components should be visible.
     */
    const goForward = () => {
        console.log("Going forward");

        const {index, lastSlug, visibleComponents} = screenState;

        console.log(`Components ${visibleComponents.length}`)
        console.log(`components ${visibleComponents}`)
        console.log(`index ${index}`)
        console.log(`lastSlug ${lastSlug}`)

        if (index < visibleComponents.length - 1) {
            console.log("Not the last screen");
            visibleComponents[index] = false;
            visibleComponents[index + 1] = true;
            setScreenState({
                index: index + 1,
                lastSlug: lastSlug,
                visibleComponents: visibleComponents
            })
            // setPassthroughScreens({
            //     index: index + 1,
            //     currentComponent: visibleComponents[index + 1],
            //     lastSlug: lastSlug,
            // });
        } else {
            console.log("Last screen");
            router.push(lastSlug)
        }

    }

    /**
     * Responsible for going back through the sign up flow.
     */
    const goBack = () => {
        console.log("Going back");
        const {index, lastSlug, visibleComponents} = screenState;

        if (index > 0) {
            console.log("Not the first screen");
            console.log(`index ${index}`)
            visibleComponents[index] = false;
            visibleComponents[index - 1] = true;
            setScreenState({
                index: index - 1,
                lastSlug: lastSlug,
                visibleComponents: visibleComponents
            })
        } else {
            console.log("First screen");
            router.back()
        }
    }


    const [update, result] = useUpdateBusinessMutation();

    const [businessInfo, setBusinessInfo] = useState({
        email: '',
        password: '',
        name: '',
        address: '',
        type_id: ''
    })

    const [showBackButton, setBackVisibility] = useState(true);

    return(
        <div className="w-screen max-h-screen">
            <div className="sticky top-0 bg-white">
                <NavHeader/>
            </div>
            

            {/* All components lie here
                Treat them as a bunch of forms wrapped in a back button.
                All of them are rendered, but they are hidden initially.
                As the user progresses through the flow, you uncover them one by one. */}
            <div className="flex flex-col w-full h-full items-center justify-center">
                <SEO title="Business sign up"/>
                <div className="justify-center items-center w-full xl:w-1/4 p-10 xl:p-0">
                    {result.error && <LiveworksError>Unable to update your information, please try again.</LiveworksError>}
                    <div className={showBackButton ? 'block' : 'hidden'}>
                        <BackButton onClick={goBack}/>
                    </div>

                    <EmailPasswordForm 
                        visible={screenState.visibleComponents[0]} 
                        onSubmit={
                            (email: string, password: string) => {
                                setBusinessInfo((prevState) => ({
                                    ...prevState,
                                    email: email,
                                    password: password
                                }))
                                goForward()
                    }}/>

                    <VerificationCodeForm
                        visible={screenState.visibleComponents[1]}
                        email={businessInfo.email} 
                        password={businessInfo.password} 
                        onSubmit={() => {
                            //Hides back button
                            setBackVisibility(false);
                            goForward()
                        }}
                    />

                    <VenueNameForm
                        visible={screenState.visibleComponents[2]}
                        onSubmit={(name: string) => {
                            setBusinessInfo({
                                ...businessInfo,
                                name: name
                            })
                            setBackVisibility(true);
                            goForward();
                        }}
                    />
                    <VenueAddressForm
                        visible={screenState.visibleComponents[3]}
                        onSubmit={(address: string) => {
                            console.log(address)
                            setBusinessInfo({
                                ...businessInfo,
                                address: address
                            })
                            goForward()
                    }}/>

                    <VenueTypeSelection 
                        visible={screenState.visibleComponents[4]}
                        onSelect={
                            async (type: string) => {
                                setBusinessInfo({
                                    ...businessInfo,
                                    type_id: type
                                })
                                await update({
                                    variables: {
                                        input: {
                                            address: businessInfo.address,
                                            name: businessInfo.name,
                                            type_id: businessInfo.type_id
                                        }
                                    }
                                })
                                console.log("Backend call successful.")
                                goForward()
                            }}
                        />

                    <VenueUploadPicture
                        visible={screenState.visibleComponents[5]}
                        onSubmit={goForward}
                        
                    />

                    <VenueConfirmScreen
                        visible={screenState.visibleComponents[6]}
                        onSubmit={goForward}
                    />

            </div>
        </div>

        </div>
    )
}

export default businessSignUpPage

/**
 * The form that asks for the user's email and password.
 */
const EmailPasswordForm = (
    props: {
        visible: boolean,
        onSubmit: (email: string, password: string) => void
    }) => {

    const [alert, setAlert] = useState({
        show: false,
        message: '',
    });

    const [loading, setLoading] = useState(false);

    return (
        <div className={`${props.visible ? 'block' : 'hidden' }`}>
        {/* Step 1: Enter email and password */}

        {alert.show && <LiveworksInfo>{alert.message}</LiveworksInfo>}
            <div className="flex lg:text-left justify-between">
                <h1 className="text-xl font-bold p-3 justify-between">Create a business account</h1> 
                <img src="/Illustrations/BusinessIllustration.svg" width="50" height="50" className="mr-3"/>                      
            </div> 
            <p className="p-3">Enter an email and password to continue</p>
            {/* https://formik.org/docs/tutorial */}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={yup.object({
                    email: yup.string()
                            .email('Email is invalid')
                            .required('Email is required'),
                    password: yup.string()
                            .required('Password is required')
                            .min(8, 'Password must be 8 characters or longer')
                            .matches(/[a-zA-Z]/, 'Password must contain letters')
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    
                    // show loading icon
                    setLoading(true)
                    setAlert({
                        show: false,
                        message: '',
                    });
                    setSubmitting(false);

                    try {
                        await signUpBusiness(values.email, values.password);
                        // so signup was success, move on to verification.
                        props.onSubmit(values.email, values.password);
                    } catch (error) {
                        console.log(error);
                        setAlert({
                            show: true,
                            message: JSON.stringify(error, null, 2),
                        });
                    }

                    setLoading(false)
                }}
            >
                <Form>
                    <div className="items-center w-full p-3">
                        <EmailInput
                            name="email"
                            type="email" 
                        />
                        <PasswordInput
                            name="password"
                            type="password"
                        />
                    </div> 
                    <div className="pl-5 text-xs text-textGray">
                        <p>Must be your business email and password must be 8 letters long, contain a number, and an uppercase letter</p>
                        <p className="pt-3 pb-3 text-dark"> By signing up you agree to our <a href="https://www.liveworks.app/terms/" target="_blank" className="font-bold"> terms of use </a> and <a href="https://www.liveworks.app/privacy/" target="_blank" className="font-bold"> privacy policy </a></p>
                    </div>                   
                    <PrimaryButton loading={loading} title="Continue" /> 
                </Form>
            </Formik>
        </div>
    )
}

/**
 * The form that asks for a user's verification code. Sent to them via email by aws cognito.
 */
const VerificationCodeForm = (props: {visible: boolean, email: string, password: string, onSubmit: () => void }) => {
    const [alert, setAlert] = useState({
        show: false,
        message: '',
    });

    const [loading, setLoading] = useState(false);

    return (
        <div className={`${props.visible ? 'block' : 'hidden'}`}>
        {/* Step 2: Enter verification code */}
            {alert.show && <LiveworksInfo>{alert.message}</LiveworksInfo>}
            <div className="lg:text-left">
                <h1 className="text-xl font-bold p-3">Let's verify it's you</h1> 
                <p className="p-3">Enter the verification code sent to your email. Didn't get a code?</p>
                <button className="btn btn-sm btn-ghost normal-case text-blue hover:bg-backgroundDark" 
                    onClick={async () => {
                        setLoading(true)
                        try {
                            await resendConfirmationCode(props.email)
                            setAlert({
                                show: true,
                                message: `Verification code sent to ${props.email}`
                            })
                        } catch (error) {
                            console.log(error);
                            setAlert({
                                show: true,
                                message: JSON.stringify(error, null, 2),
                            });

                        }
                        setLoading(false)
                    }}>
                        Tap here to resend                             
                </button>
            </div> 
            <Formik
                initialValues={{
                    code: ''
                }}
                validationSchema={yup.object({
                    code: yup.string()
                            .required('Code is required'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setLoading(true)
                    setAlert({
                        show: false,
                        message: '',
                    });
                    setSubmitting(false);

                    try {
                        await confirmUser(props.email, props.password, values.code);
                        // verification was great success
                        props.onSubmit();
                    } catch (error) {
                        console.log(error);
                        setAlert({
                            show: true,
                            message: JSON.stringify(error, null, 2),
                        });
                    }
                    setLoading(false)
                }}
            >
                <Form>
                    <div className="items-center w-full p-3">
                        <TextInput name="code" title="Verification code" placeholder="Enter verification code here"/>
                    </div>
                    <PrimaryButton loading={loading} title="Continue"/>
                </Form>   
            </Formik>
        </div>
    )
}

/**
 * This form asks the venue for their name.
 */
const VenueNameForm = (props: {visible: boolean, onSubmit: (name: string) => void}) => {

    const [loading, setLoading] = useState(false);
    
    return (
        <div className={`${props.visible ? 'block' : 'hidden'}`}>
        {/*Step 3: Enter venue name container */}
        <div className="p-2 space-y-2">
            <progress className="progress" value="25" max="100"></progress> 
        </div>
            <Formik  
                initialValues={{
                    name: ''
                }}
                validationSchema={yup.object({
                    name: yup.string()
                            .required('Name is required'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false);
                    setLoading(true)
                    props.onSubmit(values.name);
                    setLoading(false);
                }}>
                <Form>
                    <div className="lg:text-left">
                        <h1 className="text-xl font-bold p-3">Enter your business name</h1> 
                        <p className="p-3">How workers will see your business in the app</p>
                    </div> 
                    <div className="items-center w-full p-3">
                        <TextInput name="name" title="Venue name" placeholder="Enter your venue name here"/>
                    </div>                                                                                                    
                    <PrimaryButton loading={loading} title="Continue"/>   
                </Form>
            </Formik>
        </div>
    )
}

const VenueAddressForm = (props: {visible: boolean, onSubmit: (address: string) => void}) => {
    return (
        <div className={`${props.visible ? 'block' : 'hidden'}`}>
        {/* Step 4: Enter venue address */}
            <div className="p-2 space-y-2">
                <progress className="progress" value="50" max="100"></progress> 
            </div>
                <div className="lg:text-left">
                    <h1 className="text-xl font-bold p-3">Venue address</h1> 
                    <p className="p-3">The address where workers will be working their shifts</p>
                </div> 
            <Formik  
                initialValues={{
                    address: ''
                }}
                validationSchema={yup.object({
                    address: yup.string()
                            .required('Address is required'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false);
                    props.onSubmit(values.address);
                }}>
                <Form>
                    <div className="items-center w-full p-3">
                        <AddressInput name="address" title="Address" placeholder="Enter your address here" />
                    </div>                                                                                                    
                    <PrimaryButton title="Continue"/>  
                </Form>
            </Formik>
        </div>
    )
}

const VenueTypeSelection = (props:{visible: boolean, onSelect(type_id: string): void,}) => {
    const [getBusinessType, { loading, error, data }] = useListBusinessTypeLazyQuery();

    // write a function that runs when this component becomes visible
    useEffect(() => {
        getBusinessType();
    }, [props.visible]);

    if (data){
        return (
            <div className={`${props.visible ? 'block' : 'hidden'}`}>
            {/*Step 5: Select type of venue */}
                <div className="p-2 space-y-2">
                    <progress className="progress" value="75" max="100"></progress> 
                </div>
                {loading && <LiveworksInfo>Loading business types....</LiveworksInfo>}
                {error && <LiveworksError>Error: {error.message}</LiveworksError>}
                <Formik  
                    initialValues={{
                        radio: ''
                    }}
                    validationSchema={yup.object({
                        radio: yup.string()
                                .required('You must select a type.'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(false);
                        console.log(values);
                        props.onSelect(values.radio);
                    }}>
                    <Form>
                        <div className="lg:text-left">
                            <h1 className="text-xl font-bold p-3">Type of venue</h1> 
                        </div> 
                        <div className="items-center w-full p-3">
                            <SelectTypeOfVenue name='radio' types={data}/>
                        </div>       
                        <PrimaryButton loading={loading} title="Continue"/>
                    </Form>
                </Formik>
            </div>
        )
    } else {
        return (<div>
            No data
        </div>)
    }
}

const VenueUploadPicture = (props: {visible: boolean, onSubmit: () => void}) => {
    const [updatePicture, {data, loading, error}] = useUpdateBusinessPictureMutation();

    const [image, setImage] = useState('/Illustrations/BusinessIllustration.svg');

    if (error) {
        console.log(error);
    }

    return (
        <div className={`${props.visible ? 'block' : 'hidden'}`}>
        {/* Step 6: Add profile Photo */}
            <div className="p-2 space-y-2">
                <progress className="progress" value="100" max="100"></progress> 
            </div>
            {loading && <LiveworksInfo>Uploading Picture....</LiveworksInfo>}
            {error && <LiveworksError>Error uploading picture... {error.message}</LiveworksError>}
            {data && <LiveworksSuccess>Picture uploaded!</LiveworksSuccess>}
            <div className="lg:text-left">
                <h1 className="text-xl font-bold p-3">Let's add your profile photo</h1> 
                <p className="p-3">This can be your logo or any photo workers will identify you with</p>
            </div> 
            <div className="flex items-center justify-center w-full p-3">
                <img src={image} className="mask mask-squircle" width="200" height="200"/>
            </div>
            <label className="btn btn-md btn-ghost normal-case text-blue hover:bg-backgroundDark w-full">
                Upload photo
                <input className="hidden" type="file" accept="image/*" onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        // show upload picture 
                        const url = URL.createObjectURL(file);
                        setImage(url)
                        // try to upload it
                        try {
                            await updatePicture({
                                variables: {
                                    file: file
                                }
                            })
                        } catch (error) {
                            console.log(error);
                        }
                        
                    }
                }}/>
            </label>
            <PrimaryButton loading={loading} title="Continue" onClick={props.onSubmit}/>
        </div>
    )
}

const VenueConfirmScreen = (props: {visible: boolean, onSubmit: () => void}) => {
    return (
        <div className={`${props.visible ? 'block' : 'hidden'}`}>
            {/* Success: Account created confirmation */}

            <div className="lg:text-left">
                <h1 className="text-xl font-bold p-3">You're all set, Welcome to Liveworks!</h1> 
                <p className="p-3">You can begin creating your schedule and managing your workforce</p>
            </div> 
            <div className="flex items-center justify-center w-full p-3">
                <img src="/Illustrations/CelebrateIllustration.svg"/>
            </div>                                                                                            
            <PrimaryButton title="Continue" onClick={props.onSubmit}/>                                       

        </div>
    )
}