import moment from "moment"
import { dateFormat } from "../../../../constants"
import Persona from "../../utils/persona"

export const mood = [
    {
        heading: "Name",  render: (properties) => (
            <div className='flex gap-3  items-center p-2'>
                   {
                    properties?.patient ? 
                    <>
                    <Persona className={"absolute "} path={properties?.patient?.image} />
                    <span className="ml-12 truncate">{properties?.patient?.fullName} </span>
                    </>
                    : <span>Patient not found</span>
                }
            </div>
        )
    },
    {
      heading: "email", checked: true, render: (properties) => {
        return properties?.patient?  <span className='lowercase'>{properties?.patient?.email}</span>: <span>Patient not found</span>


        }
    },
    {
      heading: "Date & Time", checked: true, render: (properties) => {
            return  moment(properties?.createdAt).format(`${dateFormat + " HH:mm:ss"}`)

        }
    },

    {
      heading: "mood", checked: true, render: (properties) => {
            return properties?.mood

        }
    },
    {
      heading: "active", checked: true, render: (properties) => {
            return properties?.active

        }
    },
    {
      heading: "eat", checked: true, render: (properties) => {
            return properties?.eat

        }
    },
    {
      heading: "sleep", checked: true, render: (properties) => {
            return properties?.sleep

        }
    },
    {
      heading: "Age", checked: true, render: (properties) => {
            return properties?.patient?.age

        }
    },
    {
      heading: "Status", checked: true, render: (properties) => {
            return properties?.status

        }
    },
    {
      heading: "Gender", checked: true, render: (properties) => {
            return <span className="capitalize">
                {properties?.patient?.gender}
            </span>

        }
    },
   
]