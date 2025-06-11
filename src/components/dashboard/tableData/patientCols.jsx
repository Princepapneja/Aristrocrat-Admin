import Persona from "../../utils/persona"
import DeleteData from "../actions/deleteData"
import EditData from "../actions/editData"
import ViewData from "../actions/viewData"
import AccessActions from "../access/accessActions"

export const PatientCols = [
    {
        name: "actions",sticky:true, checked: true, cell: (properties) => {
            return <div className='flex gap-2  md:justify-center'><ViewData type="patient" data={properties}/><EditData type="patient" data={properties} />
             <AccessActions type="patient"  properties={properties}/>
             <DeleteData type="patient" properties={properties} />

            
            </div>

        }
    },
    {
        name: "Name", checked: true,
        truncateOff:true,
        accessor: "fullName", cell: (properties) => (
            <div className='flex relative gap-3 items-center'>
                <Persona className={"absolute "} path={properties?.image} />
                <span className="ml-12 truncate">{properties?.fullName} </span>
            </div>
        )
    },
    {
        name: "email", checked: true, accessor: "email", cell: (properties) => {
            return <span className='lowercase'>{properties?.email}</span>

        }
    },
    {
        name: "Age", checked: true, accessor: "age",
    },
    {
        name: "Mass Health ID", checked: true, accessor: "healthID",
    },
    {
        name: "Gender", checked: true, accessor: "gender",
    },
    {
        name: "Phone", checked: true, accessor: "phone",cell: (properties) => {
            return properties?.phone && "+1 " + properties?.phone;

        }
    },
    {
        name: "Time zone", checked: true, accessor: "timezone",
    },
    {
        name: "Access", checked: true, accessor: "access",
    },
    {
        name: "Bio", checked: true, accessor: "bio",
    },
  
    // { name: "Request Date", checked: true, cell:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]