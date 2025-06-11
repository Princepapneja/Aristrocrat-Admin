import Persona from "../../../utils/persona"
import MentalHealthActions from "../mentalHealthActions"

export const HealthID = [
    {
        name: "actions",sticky:true, checked: true, cell: (properties) => {
            return <MentalHealthActions properties={properties}/>

        }
    },
    {
        name: "Name",
        checked: true,
        accessor: "fullName",
        cell: (properties) => (
            <div className='flex gap-3 items-center '>
                <Persona path={properties?.image} />
                <span className="truncate">{properties?.fullName ||  `${properties?.firstName} ${properties?.lastName}`}</span>
            </div>
        )
    },
    
    {
        name: "email", checked: true, accessor: "email", cell: (properties) => {
            return <span className='lowercase'>{properties?.email}</span>

        }
    },
    
    {
        name: "Mass Health ID", checked: true, accessor: "healthID", cell: (properties) => {
            return properties?.healthID || "-"

        }
    },
    {
        name: "access", checked: true, accessor: "access", cell: (properties) => {
            return properties?.access || "-"

        }
    },

    {
        name: "Gender", checked: true, accessor: "gender",
    },
    {
        name: "Age", checked: true, accessor: "age",
    },

  
    // { name: "Request Date", checked: true, cell:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]