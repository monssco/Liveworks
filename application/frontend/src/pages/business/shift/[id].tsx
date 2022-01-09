import React, { useEffect } from "react";
import Sidebar from "src/components/Navigation/sidebar";
import SidebarIconActive from "src/components/Navigation/sidebarIconActive";
import SidebarIconInactive from "src/components/Navigation/sidebarIconInactive";
import Navbar from "src/components/Navigation/navbar";
import BackButton from "src/components/Buttons/backButton";
import SectionHeader from "src/components/Rows/sectionHeaders";
import SelectWorker from "src/components/Cards/selectWorker";
import ShiftCostBreakdown from "src/components/Cards/shiftCostBreakdownCard";
import NotesInput from "src/components/TextInputs/notesInput";
import TimeInput from "src/components/TextInputs/timeInput";
import AmountInput from "src/components/TextInputs/amountInput";
import TextInput from "src/components/TextInputs/textInput";
import PrimaryButton from "src/components/Buttons/primaryButton";
import { useRouter } from "next/router";
import SEO from "src/components/seo";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from 'yup';
import { useBusinessListWorkersLazyQuery, useBusinessRetrieveShiftQuery, useBusinessUpdateShiftMutation } from "src/graphql/generated/graphql";
import AlertError from "src/components/Alert/error";
import AlertInfo from "src/components/Alert/info";
import EmptyScreen from "src/components/EmptyScreens/emptyscreen";
import ButtonRightIcon from "src/components/Buttons/buttonWithRightIcon";
import { format, fromUnixTime } from "date-fns";
import { toFrontEndCurrency } from "src/utils/helpers";

// Type needed for the initial values.
type EditFormValues = {
    positionId : string,
    startTime : string,
    endTime : string,
    rate: string,
    address: string,
    notes: string,
    workers: string[]
}

// This is the edit/update shift page.
const editShiftPage = () => {

    const router = useRouter();
    const { id } = router.query;

    const [updateShift, {error: updateError, data: updateData, loading: updateLoading}] = useBusinessUpdateShiftMutation();

    // 1. Get the shift data.
    const {data, loading, error} = useBusinessRetrieveShiftQuery({
        variables: {
            id: id as string // we know that the id is a string
        }
    })

    // 2. Get the list of workers.
    const [fetchWorkers, {data: workersData, error: workersError, loading: workersLoaing}] = useBusinessListWorkersLazyQuery();
    
    // Notice its called as soon as data is updated.
    useEffect(() => {
        console.log(`Data from the shift query: ${JSON.stringify(data)}`);
        fetchWorkers({
            variables: {
                i: {
                    position_id: data?.businessRetrieveShift.position.id,
                    limit: 100,
                    offset: 0
                }
            }
        });
    }, [data]);

    var initialValues: EditFormValues = 
                                        {
                                            positionId: '',
                                            startTime: '',
                                            endTime: '',
                                            rate: '',
                                            address: '',
                                            notes: '',
                                            workers: []
                                        }
    
    return(
        <div className="md:flex h-screen w-screen overflow-hidden">
            <SEO title="Edit shift"/>
             {/* Col 1: left side */}
            <Sidebar
                iconOne={<SidebarIconActive sidebarIcon='/../Icons/Schedule/CalendarFill.svg' tooltipText="Schedule" destination="/business/schedule"/>}
                iconTwo={<SidebarIconInactive sidebarIcon='/../Icons/Workers/UsersLine.svg' tooltipText="Workers" destination="/business/workers"/>}
            ></Sidebar> 
            
            {/* Col 2: right side */}
            <div className="xl:flex-col h-full w-full">
                <Navbar screenTitle="Edit shift"/>

                {/* Errors related to updating shift. */}
                {updateError && <AlertError>{updateError.message}</AlertError>}
                {updateData && <AlertInfo>Shift updated successfully</AlertInfo>}

                {/* Errors related to retrieving shift. */}
                {error && <AlertError>{error.message}</AlertError>}
                {loading && <AlertInfo>Loading...</AlertInfo>}

                {/* Back button + Select day to create shift on */}    
                <div className="flex w-full h-12 items-center font-bold gap-4 pl-3 border-b xl:border-0 pb-5 xl:pb-0 bg-white">
                    <BackButton onClick={router.back}/>
                    {data && format(fromUnixTime(data.businessRetrieveShift.day.date), "EEEE, MMMM d, yyyy")}
                </div>
                
                <Formik
                    initialValues={initialValues}
                    validationSchema={
                        yup.object({
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
                    onSubmit={e=> {
                        console.log('previous', data?.businessRetrieveShift);
                        console.log('edited',JSON.stringify(e))

                        updateShift({
                            variables: {
                                input: {
                                    shift_id: id as string,
                                    start_time: parseInt(e.startTime),
                                    end_time: parseInt(e.endTime),
                                    rate: parseFloat(e.rate) * 100,
                                    address: e.address,
                                    notes: e.notes,
                                    worker_ids: e.workers
                                }
                            }
                        })
                    }}
                    // some function needs to run when the select value is changed.
                    children={({values, submitForm, setValues, setFieldValue}) => {
                        
                        // Called when data is fetched, all the workers are now selected.
                        useEffect(()=> {

                            console.log("got Data", JSON.stringify(data))
                            
                            if (data){
                                setFieldValue('positionId', data.businessRetrieveShift.position.id);
                                setFieldValue('startTime', data.businessRetrieveShift.start_time);
                                setFieldValue('endTime', data.businessRetrieveShift.end_time);
                                setFieldValue('rate', toFrontEndCurrency(data.businessRetrieveShift.rate));
                                setFieldValue('address', data.businessRetrieveShift.address);
                                setFieldValue('notes', data.businessRetrieveShift.notes);
                                setFieldValue('workers', data.businessRetrieveShift.shiftInvites?.map(invite => invite.worker.id));
                            }
                            console.log('values', values)
                        }, [data])


                        // Sets all workers to the array, the ones that are invited automatically get check boxes.
                        useEffect(() => {
                            console.log("Values called", values)
                            setFieldValue('endTime', '')
                        },[values.startTime])

                        // useEffect(() => {
                        //     // will trigger whenever values are updated
                        //     // use this to display cost breakdown.
                        //     setValues({...values,
                        //     address: profile?.retrieveBusiness.address ? profile.retrieveBusiness.address : ''})
                        // }, [profile])

                        return(
                            <>
                                {/* 3 columns */}
                                <div className="flex-col h-4/5 overflow-scroll overscroll-none xl:flex xl:flex-row">
                                    <Form>
                                        <div className="w-full p-5">
                                            <SectionHeader text="Shift requirements"/>
                                            <div className="p-5">
                                                <p>Position</p>
                                                <p className="text-lg py-5">{data?.businessRetrieveShift.position.name}</p>
                                                <div className="flex justify-between">
                                                    <TimeInput unixTime={data ? data.businessRetrieveShift.start_time : 0} name="startTime" title="Start time" placeholder="Enter start time"/>
                                                    <TimeInput unixTime={data ? data.businessRetrieveShift.end_time : 0} name="endTime" title="End time" placeholder="Enter end time"/>
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
                                    
                                    {/*Column 2 (Empty Screen, will hide when workers are invited)*/}
                                    
                                    <div className="hidden flex flex-col w-full items-center p-5 pt-20">
                                        <ErrorMessage name='workers' className="text-sm text-brightRed"></ErrorMessage>
                                        <EmptyScreen title="No workers added" subtitle="When you add workers on Liveworks, they will be shown here to schedule" illustration="/../Illustrations/InviteWorkers.svg"/>
                                        <div className="w-full sm:w-80 pl-5 pr-5 sm:pl-3 sm:pr-3">
                                            <ButtonRightIcon title="Add workers" buttonIcon="/Icons/Add/AddFillDark.svg" destination="/business/inviteworkers"/>
                                        </div>                      
                                    </div>
                                    
                                    {/*Column 2 (Selected position and view workers to schedule)*/}
                                    {/* Looks weird but it works. https://stackoverflow.com/questions/54884488/how-can-i-solve-the-error-ts2532-object-is-possibly-undefined */}
                                    {/* Show all workers for a given position, with the ones that have been invited as selected.*/}
                                    { workersData 
                                        &&
                                        <div className="flex-col w-full p-5">
                                            {error && <AlertError>{error.message}</AlertError>}
                                            {loading && <AlertInfo>Loading...</AlertInfo>}
                                            <ErrorMessage name='workers' className="text-sm text-brightRed"></ErrorMessage>
                                            <div>
                                                <SectionHeader text="Select workers to schedule"/>
                                            </div>
                                            {/* Workers that have been invited will be show in this div for the position selected in column 1 */}
                                            <div className="flex-col items-center h-96 xl:h-5/6 w-full p-3 overflow-scroll overscroll-none">
                                                {workersData.businessListWorkers.map(w => (
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
                                    <PrimaryButton loading={loading || updateLoading} title="Update shift" onClick={submitForm}/> 
                                </div> 
                            </>
                        )}}
                />
            </div>
        </div>
    )
}
export default editShiftPage;