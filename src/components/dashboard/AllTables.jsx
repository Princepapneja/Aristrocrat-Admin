import { useEffect, useMemo, useState } from 'react'
import { Check, Plus, SquareX } from 'lucide-react'
import useGlobal from '../../hooks/useGlobal'
import { AppointmentCols } from './tableData/appointment'
import { PatientCols } from './tableData/patientCols'
import { DoctorCols } from './tableData/doctorCols'
import { BlogColumns } from './tableData/BlogColumns'
import { metric } from './tableData/metricCols'
import { mood } from './tableData/moodCols'
import moment from 'moment'
import { Admin } from './tableData/adminCols'
import { categoryCols } from './tableData/categories'
import { dateFormat } from '../../../constants'
import Card from '../utils/card'
import ReUseAbleTable from '../utils/reUseAbleTable'
import apiHandler from '../../functions/apiHandler'

const AllTables = ({ type,text }) => {
    const { patients, render, setRender } = useGlobal()
    const [columns, setColumns] = useState()
    useEffect(() => {
        const newColumns =
            type === "appointments" ? AppointmentCols :
                type === "profile" ? Admin :
                    type === "blogs" ? BlogColumns :
                        // type === "mass health" ? HealthID :
                            type === "patients" ? PatientCols :
                                type === "metric survey" ? metric :
                                    type === "mood survey" ? mood :
                                        type === "categories" ? categoryCols :
                                            type === "admins" ? Admin : DoctorCols;

        setColumns(newColumns);
    }, [type, patients, render]);

    const fetchData = async (skip, count, order, orderBy, search, active) => {
        try {
            let url;
            switch (type) {
                case "blogs":
                    url = `blogs?skip=${skip}&count=${count}`;
                    if (active === 1) url += '&published=true';
                    else if (active === 2) url += '&published=false';
                    break;
                case "admins":
                    url = `admin?skip=${skip}&count=${count}`
                    if (active === 1) url += '&access=full';
                    else if (active === 2) url += '&access=blocked';
                    break;
                case "clinician":
                    url = `users?skip=${skip}&count=${count}&role=clinician`;
                    if (active === 1) url += '&access=full';
                    else if (active === 2) url += '&access=blocked';
                    break;
                case "patients":
                        url = `users?skip=${skip}&count=${count}&role=patient`;
                        switch (active) {
                            case 1:
                                url += '&access=restricted';
                                break;
                            case 2:
                                url += '&access=full';
                                break;
                            case 3:
                                url += '&access=blocked';
                                break;
    
                        }
                        break;
                    
                case "appointments":
                    url = `appointments?skip=${skip}&count=${count}`;
                    switch (active) {
                        case 1:
                            url += '&status=pending';
                            break;
                        case 2:
                            url += '&status=cancelled';
                            break;
                        case 3:
                            url += '&status=confirmed';
                            break;
                        case 4:
                            url += '&status=completed';
                            break;
                        case 5:
                            url += '&status=ongoing';
                            break;
                    }
                    break;
                case "mass health":
                    url = `users?skip=${skip}&count=${count}&role=patient`;
                    switch (active) {
                        case 1:
                            url += '&access=restricted';
                            break;
                        case 2:
                            url += '&access=full';
                            break;
                        case 3:
                            url += '&access=blocked';
                            break;

                    }
                    break;
                
                case "metric survey":
                case "mood survey":
                    url = `survey?skip=${skip}&count=${count}&type=${type === "metric survey" ? "metric" : "mood"}`;
                    if (active === 1) url += '&status=pending';
                    else if (active === 2) url += '&status=completed';
                    break;
                case "profile":
                    url = `admin?skip=${skip}&count=${count}`;
                    break;
                case "categories":
                    url = `category?skip=${skip}&count=${count}`;
                    break;
                default:
                    throw new Error("Invalid type provided");
            }

            if (search) {
                url += url.includes('?') ? `&search=${search}` : `?search=${search}`;
            }
            if (order && orderBy) {
                url += `&order=${order}&orderBy=${orderBy}`;
            }

            const response = await apiHandler.get(url);
            const { data } = response;
            const responseData = data?.data?.resp || [];
            const totalCount = data?.data?.totalCount || 0;
            return { data: responseData, totalCount: totalCount };
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Re-throw the error to propagate it up the call stack
        }
    };

    const handleFileData = async (data) => {
        const obj = data?.map((e) => {
            if (type === "appointments") {
                return {
                    Patient: e?.patient?.fullName,
                    clinician: e?.clinician?.fullName,
                    Status: e?.status,
                    Start: moment(e?.start).format(dateFormat).toString(),
                    "Start Time": moment(e?.start).format(' hh:mm A').toString(),
                    "End Date": moment(e?.end).format(dateFormat).toString(),
                    "End Time": moment(e?.end).format(' hh:mm A').toString(),
                    Comment: e?.comment,
                    Reason: e?.reason,
                    Feedback: e?.feedback,
                    "Action Perform By": e?.actionPerformedBy,
                }
            }
            else if (type === "patients") {
                return {
                    Name: e?.fullName,
                    Email: e?.email,
                    Age: e?.age,
                    "Health ID": e?.healthID,
                    Access: e?.access,
                    Gender: e?.gender,
                    Bio: e?.bio,
                }
            } else if (type === "questions") {
                return {
                    Question: e?.question,
                    Answers: e?.option?.text,
                }
            } else if (type === "blogs") {
                return {
                    Name: e?.name,
                    Description: e?.description,
                    Date: moment(e?.createdAt).format(dateFormat).toString(),
                    Category: e?.category?.title,
                    Status: !e?.published ? "Not Published" : "Published",
                }
            }
            //  else if (type === "patients") {
            //     return {
            //         Name: e?.fullName,
            //         Email: e?.email,
            //         Age: e?.age,
            //         "Mass Health ID": e?.healthID,
            //         Gender: e?.gender,
            //     }
            // }
             else if (type === "metric survey") {
                return {
                    Name: e?.patient?.fullName,
                    Email: e?.patient?.email,
                    "Data & Time": moment(e?.createdAt).format(dateFormat).toString() + moment(e?.createdAt).format(' hh:mm A').toString(),
                    Age: e?.patient?.age,
                    Gender: e?.patient?.gender,
                    Status: e?.status,
                    Mood: e?.mood,
                    "Stress Level": e?.stressLevel,
                    "Sleep Quality": e?.sleepQuality,
                    "Medication": e?.medication,
                    "Meditate": e?.meditate,
                    "Substances": e?.substances,
                    "Substance Type": e?.substanceType,
                    frequently: e?.frequently,
                    history: e?.history,
                    symptoms: e?.symptoms,
                    "Happy Things": e?.happyThings,
                    result: e?.result

                }
            } else if (type === "mood survey") {
                return {
                    Name: e?.patient?.fullName,
                    Email: e?.patient?.email,
                    "Data & Time": moment(e?.createdAt).format(dateFormat).toString() + moment(e?.createdAt).format(' hh:mm A').toString(),
                    Age: e?.patient?.age,
                    Gender: e?.patient?.gender,
                    Mood: e?.mood,
                    Status: e?.status,
                    Active: e?.active,
                    Eat: e?.eat,
                    Sleep: e?.sleep,
                }
            } else if(type === "admins") {
                return {
                    Name: e?.fullName,
                    Email: e?.email,
                    "Phone Number": e?.phone,
                    Access: e?.access
                }
            } else return {
                Name: e?.fullName,
                Email: e?.email,
                Age: e?.age,
                DOJ: moment(e?.createdAt).format(dateFormat).toString(),
                Gender: e?.gender,
                Phone: e?.phone,
                "Time Zone": e?.timezone,
                "Shift Start": e?.shiftStart,
                "Shift End": e?.shiftEnd,
                Bio: e?.bio,
                Access: e?.access,
            }
        })
        return obj

    }

    const buttons = useMemo(() => {
        const commonFunc = () => setRender(!render);

        const buttonConfigs = {
            "patients": [
                { name: "All", icon: <Plus />, func: commonFunc },
                { name: "Unverified", icon: <Check />, func: commonFunc },
                { name: "Verified", icon: <Check />, func: commonFunc },
                { name: "Blocked", icon: <SquareX />, func: commonFunc }
            ],
            "clinician": [
                { name: "All", icon: <Plus />, func: commonFunc },
                { name: "Full", icon: <Check />, func: commonFunc },
                { name: "Blocked", icon: <SquareX />, func: commonFunc }
            ],
            "appointments": [
                { name: "All", icon: <Plus />, func: commonFunc },
                { name: "Pending", icon: <Check />, func: commonFunc },
                { name: "Cancelled", icon: <SquareX />, func: commonFunc },
                { name: "Confirmed", icon: <SquareX />, func: commonFunc },
                { name: "Completed", icon: <SquareX />, func: commonFunc },
                { name: "On-going", icon: <SquareX />, func: commonFunc }
            ],
            "metric survey": [
                { name: "All", icon: <Plus />, func: commonFunc },
                { name: "Pending", icon: <Check />, func: commonFunc },
                { name: "Completed", icon: <SquareX />, func: commonFunc }
            ],
            "mood survey": [
                { name: "All", icon: <Plus />, func: commonFunc },
                { name: "Pending", icon: <Check />, func: commonFunc },
                { name: "Completed", icon: <SquareX />, func: commonFunc }
            ],
            "admins": [
                { name: "All", icon: <Plus />, func: commonFunc },
                { name: "Full", icon: <Check />, func: commonFunc },
                { name: "Blocked", icon: <SquareX />, func: commonFunc }
            ],
            "blogs": [
                { name: "All", icon: <Plus />, func: commonFunc },
                { name: "Published", icon: <Check />, func: commonFunc },
                { name: "Draft", icon: <SquareX />, func: commonFunc }
            ],

        };

        return buttonConfigs[type] || [];
    }, [type]);

    return (
        <>
            <Card title={
                <h4 className='capitalize font-bold '>{text || type}</h4>
            } >
                <ReUseAbleTable buttons={buttons} cols={columns} handleFileData={handleFileData} data={render} fetchData={fetchData} files={type!=="blogs" &&  type!=="categories"}/>
            </Card>

        </>
    )
}

export default AllTables