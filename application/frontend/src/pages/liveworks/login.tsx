//This is the login page. This is a global page, it's neither business nor worker but the one that takes them to either one.


import React from "react";
import Link from "next/link"; 
import EmailInput from "src/components/TextInputs/emailInput";
import PasswordInput from "src/components/TextInputs/passwordInput";
import PrimaryButton from "src/components/Buttons/primaryButton";
import NavHeader from "src/components/Navigation/navHeader";
import { Formik, Form } from "formik";
import LiveworksInfo from "src/components/Alert/info";
import { loginUser } from "src/utils/auth";
import SEO from "src/components/seo";

const logInPage = () => {

    const [alert, setAlert] = React.useState({
        show: false,
        message: "",
    });

    const [loading, setLoading] = React.useState(false);

    return(
        <div className="w-screen max-h-screen">
            <SEO title="Log in"/>
            <div className="sticky top-0 bg-white">
                <NavHeader/>
            </div>
            
            {/*LogIn container */}
            <div className="flex w-full h-full items-center justify-center">
                <div className="justify-center items-center w-full xl:w-1/4 p-10 xl:p-0">
                    {alert.show && <LiveworksInfo>{alert.message}</LiveworksInfo>}
                    <div className="xl:text-left">
                        <h1 className="text-xl font-bold p-3">Welcome back!</h1> 
                        <p className="p-3">Enter your email and password to login</p>
                    </div> 
                    <div className="items-center w-full p-3">
                        <Formik 
                            initialValues={{
                                email: "",
                                password: ""
                            }}
                            onSubmit={async (values, {setSubmitting}) => {
                                setAlert({
                                    show: false,
                                    message: "",
                                })
                                console.log(values)
                                console.log("submitted");

                                try {
                                    setLoading(true);
                                    await loginUser(values.email, values.password);
                                    console.log("logged in");
                                    setLoading(false)
                                    setAlert({
                                        show: true,
                                        message: "Successfully signed in, you will be directed shortly."
                                    })
                                } catch (error) {
                                    console.log(error);
                                    setAlert({
                                        show: true,
                                        message: "Something went wrong, please try again",
                                    })
                                    setLoading(false);
                                }
                                setSubmitting(false)
                            }} > 
                            <Form>
                                <EmailInput name="email"/>
                                <PasswordInput name="password"/>
                                <div className="pt-4 pb-4 pl-1 text-blue text-sm">
                                    <Link href=''> Forgot your password? </Link>
                                </div> 
                                <div className="w-full">
                                <PrimaryButton loading={loading} title="Login"/>
                                </div>   
                            </Form>
                        </Formik>
                    </div> 
                    <div className="flex p-4 justify-between">
                        <p className="font-base">New to Liveworks?</p>
                        <div className="font-bold text-sm md:text-base text-right md:text-left">
                        <Link href='/liveworks/selectaccount'> Create an account </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default logInPage;