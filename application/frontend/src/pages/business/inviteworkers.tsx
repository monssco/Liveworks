import React from "react";
import SidebarIconActive from "src/components/Navigation/sidebarIconActive";
import SidebarIconInactive from "src/components/Navigation/sidebarIconInactive";
import Navbar from "src/components/Navigation/navbar";
import Sidebar from "src/components/Navigation/sidebar";
import BackButton from "src/components/Buttons/backButton";
import ButtonRightIcon from "src/components/Buttons/buttonWithRightIcon";
import AddWorkerContainer from "src/components/SingleUseComponents/addWorkerContainer";
import SendInviteButton from "src/components/Buttons/sendInviteButton";
import router from "next/router";
import * as yup from 'yup'
import { FieldArray, Form, Formik } from "formik";
import AlertError from "src/components/Alert/error";
import { useBusinessInviteWorkerToAppMutation } from "src/graphql/generated/graphql";
import AlertSuccess from "src/components/Alert/success";
import SEO from "src/components/seo";

type WorkerInviteType = {
    fName: string
    lName: string
    email: string
    pId: string
}

const inviteWorkersPage = () => {

    const [inviteWorker, {data, loading, error}] = useBusinessInviteWorkerToAppMutation()

    let initialValues: {
        workers: WorkerInviteType[]
    } = {
        workers: []
    }

    // validation schema
    const validationSchema = yup.object().shape({
        workers: yup.array().of(
            yup.object().shape({
                fName: yup.string().required("Required"),
                lName: yup.string().required("Required"),
                email: yup.string().email('Invalid').required('Required'),
                pId: yup.string().required('Required')
            })
        )
    })

    const onSubmit = (values: {workers: WorkerInviteType[]}) => {
        values.workers.forEach(async w => {
            await inviteWorker({
                variables: {
                    i:{
                        email: w.email,
                        position_id: w.pId,
                        first_name: w.fName,
                        last_name: w.lName
                    }
                }
            })
        })
    }


    return(
        <div className="md:flex w-screen h-screen bg-backgroundLight overflow-hidden">
            <SEO title="Invite workers"/>
            {/* Col 1: left side */}          
            <Sidebar
                iconOne={<SidebarIconInactive sidebarIcon='/../Icons/Schedule/CalendarLine.svg' tooltipText="Schedule" destination="/business/schedule"/>}
                iconTwo={<SidebarIconActive sidebarIcon='/../Icons/Workers/UsersFill.svg' tooltipText="Workers" 
                destination="/business/workers"/>}
            ></Sidebar> 

            {/* Col 2: right side */}
            <div className="flex-col xl:flex xl:flex-col h-full w-full">

                {/* NavBar */}
                <Navbar screenTitle="Add workers"/>

                <div className="flex w-full xl:w-8/12 self-center h-12 lg:h-24 pb-5 items-center pl-3 xl:pl-9 border-b xl:border-b-0 xl:pb-0 bg-white xl:bg-backgroundLight">
                    <BackButton onClick={router.back}/>
                </div>
                
                {/* Theses divs are shown if there is an error or success after the backend call */}
                <div className="w-full xl:w-3/5 self-center">
                    {error && <AlertError>Error inviting: {error.message}</AlertError>}
                    {data && <AlertSuccess>Successfully invited!</AlertSuccess>}
                </div>

                {/* Formik */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    children={({values, setFieldValue, errors }) =>(
                        // {/* Invite workers (This is the only part of the screen that should be scrollable) */} 
                        <Form className="flex flex-col w-full h-full xl:h-5/6 xl:overflow-hidden">
                            <div className="flex flex-col w-full h-4/5 xl:h-auto overflow-scroll overscroll-none">
                                <div className="w-full xl:w-3/5 self-center">
                                    <p className="flex w-full h-14 items-center font-bold text-xl pl-5 xl:pl-0">Invite workers</p>
                                    <p className="flex w-full h-14 items-center pl-5 xl:pl-0 pr-5">Enter the details of the worker you want to invite and select their position</p>
                                </div>
                                
                                <FieldArray
                                    name="workers"
                                    children={(helpers)=> (
                                        <>
                                            {/* Add workers container (When the "Add worker" is clicked inside this div is where the container should appear) */}
                                            <div className="w-full xl:w-3/5 self-center">
                                                {values.workers.map((_, index)=> 
                                                (
                                                    <AddWorkerContainer
                                                        key={index}
                                                        inputFName={`workers.${index}.fName`}
                                                        inputLName={`workers.${index}.lName`}
                                                        inputEmail={`workers.${index}.email`}
                                                        inputPosition={`workers.${index}.pId`}
                                                        setFieldValue={setFieldValue}
                                                        errors={errors}
                                                        onDelete={()=> helpers.remove(index)}
                                                    />
                                                ))}
                                            </div>
                                            {/* This button will add another "addWorkerContainer" above */}
                                            <div className="w-full xl:w-3/5 mx-auto self-center pl-5 pr-5 xl:pl-0 xl:pr-0 pb-16">
                                                <ButtonRightIcon title="Add worker" buttonIcon="/Icons/Add/AddFillDark.svg" onclick={()=> {
                                                    helpers.push({
                                                        fName: '',
                                                        lName: '',
                                                        email: '',
                                                        pId: ''
                                                    })
                                                }}/>
                                            </div>
                                        </>
                                    )}
                                />
                            </div>

                            {/* Send workers invite button */}
                            <div className="flex w-full xl:w-3/5 self-center justify-end sticky bottom-0 bg-white xl:bg-backgroundLight border-t xl:border-t-0 p-3">
                                <SendInviteButton loading={loading}/>
                            </div>    
                        </Form>
                    )}
                />               
            </div>
        </div>
    )
}

export default inviteWorkersPage