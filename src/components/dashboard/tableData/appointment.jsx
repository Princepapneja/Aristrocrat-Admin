import moment from "moment";
import { dateFormat } from "../../../../constants";
import ViewData from "../actions/viewData";
import AppointmentActions from "../appointments/AppointmentAction";

export const AppointmentCols = [

    {
        name: "actions",sticky:true, checked: true, cell: (properties) => {
            return <div className='flex gap-2 md:justify-center'><ViewData data={properties} type="appointment" />
            
          <AppointmentActions properties={properties} />
            
            </div>

        }
    },
    {
        name: "Patient ", accessor: "patient.fullName", checked: true, cell: (properties) => {
            return <span className="">{properties?.patient?.fullName || "Patient not found"}</span>
        }
    },
    {
        name: "clinician", accessor: "clinician.fullName", checked: true, cell: (properties) => {
            return <span className="">{properties?.clinician?.fullName || "Clinician not found"}</span>

        }
    },
    {
        name: "Start Date ", accessor: "start", checked: true, cell: (properties) => {
            return moment(properties?.start).format(dateFormat);


        }
    },
    {
        name: "Start Time", accessor: "start", checked: true, cell: (properties) => {
            return moment(properties?.start).format(' hh:mm A');


        }
    },
    {
        name: "End Date ", accessor: "end", checked: true, cell: (properties) => {
            return moment(properties?.end).format(dateFormat);


        }
    },
    {
        name: "End Time", accessor: "end", checked: true, cell: (properties) => {
            return moment(properties?.end).format(' hh:mm A');


        }
    },
    {
        name: "status", checked: true, accessor: "status",
    },
    {
        name: "comment", checked: true, accessor: "comment",
    },
    {
        name: "Reason", checked: true, accessor: "reason",
    },
    {
        name: "Feedback", checked: true, accessor: "feedback",
    },
    {
        name: "Action By", checked: true, accessor: "actionPerformedBy",
    },
   
    // { name: "Request Date", checked: true, cell:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]