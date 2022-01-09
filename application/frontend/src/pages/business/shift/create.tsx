import React, { useEffect } from "react";
import Sidebar from "src/components/Navigation/sidebar";
import SidebarIconActive from "src/components/Navigation/sidebarIconActive";
import SidebarIconInactive from "src/components/Navigation/sidebarIconInactive";
import Navbar from "src/components/Navigation/navbar";
import BackButton from "src/components/Buttons/backButton";
import SectionHeader from "src/components/Rows/sectionHeaders";
import EmptyScreen from "src/components/EmptyScreens/emptyscreen";
import ButtonRightIcon from "src/components/Buttons/buttonWithRightIcon";
import SelectWorker from "src/components/Cards/selectWorker";
import ShiftCostBreakdown from "src/components/Cards/shiftCostBreakdownCard";
import SelectPosition from "src/components/Elements/createdPositionsSelector";
import NotesInput from "src/components/TextInputs/notesInput";
import TimeInput from "src/components/TextInputs/timeInput";
import AmountInput from "src/components/TextInputs/amountInput";
import TextInput from "src/components/TextInputs/textInput";
import PrimaryButton from "src/components/Buttons/primaryButton";
import router from "next/router";
import SEO from "src/components/seo";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from 'yup';
import { useBusinessCreateShiftMutation, useBusinessListWorkersLazyQuery, useBusinessProfileQueryQuery } from "src/graphql/generated/graphql";
import AlertError from "src/components/Alert/error";
import AlertInfo from "src/components/Alert/info";

import {getUnixTime} from 'date-fns'

const createShiftPage = () => {

    // List all workers
    const [getWorkers, {data, loading, error}] = useBusinessListWorkersLazyQuery();

    // Get business profile
    const {data: profile } = useBusinessProfileQueryQuery();

    // Get workers
    useEffect(()=> {
        getWorkers({
            variables: {
                i: {
                    limit: 100,
                    offset: 0,
                }
            }
        })
    }, [])


    const [createShift, {data: createData, loading: createLoading, error: createError}] = useBusinessCreateShiftMutation();

    return(
        <div className="md:flex h-screen w-screen overflow-hidden">
            <SEO title="Create shift"/>
             {/* Col 1: left side */}
            <Sidebar
                iconOne={<SidebarIconActive sidebarIcon='/../Icons/Schedule/CalendarFill.svg' tooltipText="Schedule" destination="/business/schedule"/>}
                iconTwo={<SidebarIconInactive sidebarIcon='/../Icons/Workers/UsersLine.svg' tooltipText="Workers" destination="/business/workers"/>}
            ></Sidebar> 
            
            {/* Col 2: right side */}
            <div className="xl:flex-col h-full w-full">
                <Navbar screenTitle="Create shift"/>

                {createError && <AlertError>{createError.message}</AlertError>}
                {/* Should re-route to elsewhere.. possibly in the onsubmit. Go back to home page? */}
                {createData && <AlertInfo>Shift created!</AlertInfo>}

                {/* Back button + Select day to create shift on */}    
                <div className="flex w-full h-12 items-center font-bold gap-4 pl-3 border-b xl:border-0 pb-5 xl:pb-0 bg-white">
                    <BackButton onClick={router.back}/>
                    Date of shift goes here
                </div>
                
                {/*Column 1 (Enter shift details)*/}
                <Formik
                    initialValues={{
                        positionId: '',
                        startTime: '',
                        endTime: '',
                        rate: '',
                        address: '',
                        notes: '',
                        workers: []
                    }}
                    validationSchema={yup.object({
                        positionId: yup.string()
                            .required('Required'),
                        startTime: yup.date()
                            .required('Required'),
                        endTime: yup.date()
                            .required('Required')
                            .when('startTime', (startTime: Date, schema) => (
                                startTime ? yup.date().min(startTime, 'End Time must be after Start Time').typeError('End Time is required') : schema
                            )),
                        rate: yup.string().test(
                                "maxDigitsAfterDecimal",
                                "Please enter proper amount",
                                (number) => /^\d+(\.\d{1,2})?$/.test(number ? number : '')
                            ),
                        address: yup.string()
                            .required('Required'),
                        notes: yup.string()
                            .required('Required'),
                        workers: yup.array().min(1, 'Must invite at least 1 worker').required('required')
                    })}
                    onSubmit={async e => {
                        console.log(`Submitting create: ${JSON.stringify(e)}`)

                        await createShift({
                            variables: {
                                input: {
                                    start_time: parseInt(e.startTime),
                                    end_time: parseInt(e.endTime),
                                    rate: parseFloat(e.rate) * 100,
                                    address: e.address,
                                    notes: e.notes,
                                    position_id: e.positionId,
                                    worker_ids: e.workers
                                }
                            }
                        })

                        console.log("Create shift called.")
                    }}
                    // some function needs to run when the select value is changed.
                    children={({values, submitForm, setValues}) => {

                        
                        useEffect(()=> {
                            if (values.positionId !== '') {
                                // reset the workers array
                                setValues({
                                    ...values,
                                    workers: []
                                })
                                // Get workers for new position
                                getWorkers({variables: {i: { position_id: values.positionId, limit: 100, offset: 0}}})
                            }
                        }, [values.positionId])

                        useEffect(() => {
                            // will trigger whenever values are updated
                            // use this to display cost breakdown.
                            setValues({...values,
                            address: profile?.retrieveBusiness.address ? profile.retrieveBusiness.address : ''})
                        }, [profile])

                        useEffect(() => {
                            console.log(`Workers: ${JSON.stringify(data?.businessListWorkers)}`)
                        }, [data])

                        return(
                            <>
                                {/* 3 columns */}
                                <div className="flex-col h-4/5 overflow-scroll overscroll-none xl:flex xl:flex-row">
                                    <Form>
                                        <div className="w-full p-5">
                                            <SectionHeader text="Shift requirements"/>
                                            <div className="p-5">
                                                <SelectPosition
                                                    name="positionId"
                                                    placeholder="Select a position"/>
                                                <div className="flex justify-between">
                                                    {/* TODO: This should be unix time of the day this shift is being created for. */}
                                                    <TimeInput unixTime={getUnixTime(new Date())} name="startTime" title="Start time" placeholder="Enter start time"/>
                                                    <TimeInput unixTime={getUnixTime(new Date())} name="endTime" title="End time" placeholder="Enter end time"/>
                                                </div>
                                                <AmountInput name="rate" title="Hourly Rate" placeholder="$0.00"/>
                                                <TextInput 
                                                    name="address" 
                                                    title="Address" 
                                                    placeholder="Address entered on sign up"
                                                />
                                                <NotesInput name="notes"/>
                                            </div>
                                        </div>
                                    </Form>

                                    {/* If we get back data, and data is empty, show this screen, it means that no workers exist on the backend. */}
                                    {data && data.businessListWorkers.length === 0 &&
                                    // {/*Column 2 (Empty Screen, will hide when workers are invited)*/}
                                        <div className="flex flex-col w-full items-center p-5 pt-20">
                                            {error && <AlertError>{error.message}</AlertError>}
                                            {loading && <AlertInfo>Loading...</AlertInfo>}
                                            <ErrorMessage name='workers' className="text-sm text-brightRed"></ErrorMessage>
                                            <EmptyScreen title="No workers added" subtitle="When you add workers on Liveworks, they will be shown here to schedule" illustration="/../Illustrations/InviteWorkers.svg"/>
                                            <div className="w-full sm:w-80 pl-5 pr-5 sm:pl-3 sm:pr-3">
                                                <ButtonRightIcon title="Add workers" buttonIcon="/Icons/Add/AddFillDark.svg" destination="/business/inviteworkers"/>
                                            </div>                      
                                        </div>
                                    }

                                    {/*Column 2 (Selected position and view workers to schedule)*/}
                                    {data && data.businessListWorkers.length > 0 &&
                                        <div className="flex-col w-full p-5">
                                            {error && <AlertError>{error.message}</AlertError>}
                                            {loading && <AlertInfo>Loading...</AlertInfo>}
                                            <ErrorMessage name='workers' className="text-sm text-brightRed"></ErrorMessage>
                                            <div>
                                                <SectionHeader text="Select workers to schedule"/>
                                            </div>
                                            {/* Workers that have been invited will be show in this div for the position selected in column 1 */}
                                            <div className="flex-col items-center h-96 xl:h-5/6 w-full p-3 overflow-scroll overscroll-none">
                                                {data.businessListWorkers.map(w => (
                                                    <SelectWorker 
                                                        key={w.id} 
                                                        firstName={w.first_name}
                                                        lastName={w.last_name} 
                                                        firstNameInitial="J" 
                                                        lastNameInitial="D"
                                                        id={w.id}
                                                        checkboxName='workers'
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    }

                                    {/*Column 3 (Shift cost breakdown) */}
                                    <div className="w-full p-5 pb-16">
                                        <SectionHeader text="Cost breakdown"/>
                                        <ShiftCostBreakdown {...values}/>
                                    </div> 
                                </div> 
                                <div className="w-full xl:w-2/6 sticky bottom-0 border-t xl:border-none bg-white pl-3 p-2">
                                    <PrimaryButton loading={createLoading} title="Create shift" onClick={submitForm}/> 
                                </div> 
                            </>
                        )}}
                        />
            </div>
        </div>
    )
}
export default createShiftPage;