import moment from "moment"
import { dateFormat } from "../../../../constants"
import Persona from "../../utils/persona"

export const metric = [
    {
        heading: "Name",accessor:"patient.fullName", checked: true, render: (properties) => (
            <div className='flex gap-3 items-center '>
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
        heading: "Date & Time",accessor:"createdAt", checked: true, render: (properties) => {
            return  moment(properties?.createdAt).format(`${dateFormat + " HH:mm:ss"}`)

        }
    },
    {
        heading: "status", checked: true, render: (properties) => {
            return properties?.status

        }
    },
    {
        heading: "Result", checked: true, render: (properties) => {
            return properties?.result && <span>{properties?.result}%</span>

        }
    },
   
    {
        heading: "mood", checked: true, render: (properties) => {
            return properties?.mood

        }
    },
    {
        heading: "meditate", checked: true, render: (properties) => {
            return properties?.meditate

        }
    },
    {
        heading: "stress Level", checked: true, render: (properties) => {
            return properties?.stressLevel

        }
    },
    {
        heading: "sleep Quality", checked: true, render: (properties) => {
            return properties?.sleepQuality

        }
    },
    {
        heading: "substances", checked: true, render: (properties) => {
            return properties?.substances ?"yes":"No"

        }
    },
    {
        heading: "medication", checked: true, render: (properties) => {
            return properties?.medication

        }
    },
    {
        heading: "substance Time", checked: true, render: (properties) => {
            return properties?.substanceType

        }
    },
    {
        heading: "frequently", checked: true, render: (properties) => {
            return properties?.frequently

        }
    },
    {
        heading: "history", checked: true, render: (properties) => {
            return properties?.history

        }
    },
    {
        heading: "symptoms", checked: true, render: (properties) => {
            return properties?.symptoms

        }
    },
    {
        heading: "happy Things", checked: true, render: (properties) => {
            return properties?.happy

        }
    },
    {
        heading: "Gender", checked: true, render: (properties) => {
            return properties?.patient?.gender

        }
    },

   
  
    // { heading: "Request Date", checked: true, render:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]