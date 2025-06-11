import moment from "moment";
import { dateFormat } from "../../../../constants";

export const appointment = [

  {
    "heading": "Clinician",
    render: (properties) => {
      return properties?.clinician?  <span className='lowercase'>{properties?.clinician?.fullName}</span>: <span>clinician not found</span>

    },
    disable:true

  },
  {
    "heading": "Patient",
    render: (properties) => {
      return properties?.patient ?  <span className='lowercase'>{properties?.patient?.fullName}</span>: <span>patient not found</span>

    },
    disable:true

  },
  {
    "heading": "Start Date",
    render: (prop) => {
      return moment(prop?.start).format(dateFormat);
    }
  },
  {
    "heading": "Start Time",
    render: (prop) => {
      return moment(prop?.start).format(' hh:mm A');
    }
  },
  {
    "heading": "End Date",
    render: (prop) => {
      return moment(prop?.end).format(dateFormat);
    }
  },
  {
    "heading": "End Time",
    render: (prop) => {
      return moment(prop?.end).format(' hh:mm A');
    }
  },
  {
    "heading": "Status",
    render: (prop) => {
      return <span className="capitalize">{prop?.status}</span>
    },
    hidden:true
  },
  {
    "heading": "Comment",
    render: (prop) => {
      return prop?.comment
    }
  },

 
  {
    "heading": "Reason",
    render: (prop) => {
      return <span className="capitalize">{prop?.reason}</span>
    }
  },
  {
    "heading": "Feedback",
    render: (prop) => {
      return <span className="capitalize">{prop?.feedback}</span>
    }
  },
  {
    "heading": "Action By",
    render: (prop) => {
      return <span className="capitalize">{prop?.actionPerformedBy}</span>
    }
  },
]
