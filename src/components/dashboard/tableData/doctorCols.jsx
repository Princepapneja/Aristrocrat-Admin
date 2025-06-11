import moment from "moment";
import ViewData from "../actions/viewData";
import EditData from "../actions/editData";
import DeleteData from "../actions/deleteData";
import Persona from "../../utils/persona";
import { dateFormat } from "../../../../constants";
import AccessActions from "../access/accessActions";

export const DoctorCols = [
    {
        name: "actions", sticky:true , checked: true, cell: (properties) => {
            return <div className='flex md:justify-center gap-2  '><ViewData data={properties} type={"clinician"} />
            <EditData type={"clinician"} data={properties} /> <DeleteData type={"clinician"} properties={properties} /> <AccessActions properties={properties} type="clinician" />
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
        name: "DOJ", checked: true, accessor: "createdAt", cell: (properties) => {
            return moment(properties?.createdAt).format(dateFormat);

        }
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
        name: "Time Zone", checked: true, accessor: "timezone",
    },
    {
        name: "Shift Start", checked: true, accessor: "shiftStart"
    },
    {
        name: "Shift End", checked: true, accessor: "shiftEnd"
    },
    {
        name: "Access", checked: true, accessor: "access",
    },
    {
        name: "Bio", checked: true, accessor: "bio",
    },

    
    // { name: "Request Date", checked: true, cell:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]