import React from "react";
import SidebarIconActive from "src/components/Navigation/sidebarIconActive";
import SidebarIconInactive from "src/components/Navigation/sidebarIconInactive";
import Navbar from "src/components/Navigation/navbar";
import Sidebar from "src/components/Navigation/sidebar";
import BackButton from "src/components/Buttons/backButton";
import ButtonRightIcon from "src/components/Buttons/buttonWithRightIcon";
import PrimaryButton from "src/components/Buttons/primaryButton";
import CreatePositionContainer from "src/components/SingleUseComponents/createPositionContainer";
import router from "next/router";
import { FieldArray, Formik, Form } from "formik";
import * as yup from 'yup';
import { useBusinessCreatePositionMutation } from "src/graphql/generated/graphql";
import AlertSuccess from "src/components/Alert/success";
import AlertError from "src/components/Alert/error";
import SEO from "src/components/seo";

type StateType = {
    colorName: string
    positionName: string
}


const createPositionPage = () => {

    // apollo hook used for backend call
    const [addPosition, {data, loading, error}] = useBusinessCreatePositionMutation();

    // initial values for apollo
    const initialValues: {
        positions: StateType[]
    } = {
        positions: []
    }

    // validation schema
    const validationSchema = yup.object().shape({
        positions: yup.array().of(
            yup.object().shape({
                colorName: yup.string().required("Color required"),
                positionName: yup.string().required("Name required")
            })
        )
    }) 

    // called when someone presses submit
    const onSubmit = (values: { positions: StateType[] }) => {

        // Iterate over the positions and call the backend for each position.
        values.positions.forEach(async pos => {
            await addPosition({
                variables: {
                    input: {
                        color: pos.colorName,
                        position_name: pos.positionName
                    }
                }
            })
        })
    }

    return(
        <div className="md:flex w-screen h-screen bg-backgroundLight overflow-hidden">
            <SEO title="Create custom position"/>
            {/* Col 1: left side */}          
            <Sidebar
                iconOne={<SidebarIconInactive sidebarIcon='/Icons/Schedule/CalendarLine.svg' tooltipText="Schedule" destination="/business/schedule"/>}
                iconTwo={<SidebarIconActive sidebarIcon='/Icons/Workers/UsersFill.svg' tooltipText="Workers" destination="/business/workers"/>}
            ></Sidebar>

            {/* Col 2: right side */}
            <div className="flex-col lg:flex lg:flex-col h-full w-full">

                {/* NavBar */}
                <Navbar screenTitle="Add workers"/>

                <div className="flex w-full xl:w-3/5 self-center h-12 lg:h-24 pb-5 items-center pl-3 xl:pl-3 border-b xl:border-b-0 xl:pb-0 bg-white xl:bg-backgroundLight">
                    <BackButton onClick={router.back}/>
                </div>

                {/* Theses divs are shown if there is an error or success after the backend call */}
                <div className="w-full xl:w-3/5 self-center">
                    {error && <AlertError>Error: {error.message}</AlertError>}
                    {data && <AlertSuccess>Successfully created: {data.businessCreatePosition.name}</AlertSuccess>}
                </div>

                {/* Formik  */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    children={({values, setFieldValue }) => (
                        // {/* Create position (This is the only part of the screen that should be scrollable) */} 
                        <Form className="flex flex-col w-full h-full xl:h-5/6 xl:overflow-hidden">
                            <div className="flex flex-col w-full h-4/5 xl:h-auto overflow-scroll overscroll-none">
                                <div className="w-full xl:w-3/5 self-center">
                                    <p className="flex w-full h-14 items-center font-bold text-xl pl-5 lg:pl-5">Create your own positions</p>
                                    <p className="flex w-full h-14 items-center pl-5 lg:pl-5 pr-5">Enter a position name and select a color to make it unique!</p>
                                </div>

                                {/* Field array lets us use dynamic field inputs. */}
                                <FieldArray
                                    name="positions"
                                    children={(helpers) => (
                                        <>
                                            {/* Enter position details container */}
                                            <div className="w-full xl:w-3/5 self-center">
                                                {
                                                    values.positions.map(( _ , index) => 
                                                        (
                                                            // 2 inputs, name, color
                                                            <CreatePositionContainer
                                                                inputName={`positions.${index}.positionName`}
                                                                inputColor={`positions.${index}.colorName`}
                                                                key={index}
                                                                onDelete={() => {
                                                                    helpers.remove(index)
                                                                }}
                                                                setFieldValue={setFieldValue}
                                                            />
                                                        )
                                                    )
                                                }
                                            </div>                   

                                            {/* This button will add another "CreatePositionContainer" above */}
                                            <div className="w-full xl:w-3/5 self-center pl-5 pr-5 xl:pl-3 xl:pr-3 pb-16">
                                                <ButtonRightIcon title="Add position" buttonIcon="/Icons/Add/AddFillDark.svg" onclick={() => helpers.push({
                                                        colorName: '',
                                                        positionName: ''
                                                })}/>
                                            </div> 
                                        </>
                                    )} 
                                />
                            </div>
                        
                            {/* Submit button for making worker positions */}
                            <div className="p-2 w-full xl:w-3/5 self-center sticky bottom-0 bg-white xl:bg-backgroundLight border-t xl:border-t-0">
                                <PrimaryButton loading={loading} title="Create positions" />
                            </div>
                        </Form>
                    )}/>
            </div>
        </div>
    )
}

export default createPositionPage