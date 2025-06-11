const docCols=[
  {
    "heading": "image",
    "type": "file",
    "key": "image",
    
    "add":false
  },
  {
    "heading": "name",
    "key": "fullName",
    
    "hidden": true,
    "add":false

  },
  {
    "heading": "First Name",
    "key": "firstName",
    required:true,
    "viewHidden": true,
    "placeholder": "Enter your first name"
  },
  {
    "heading": "Last Name",
    "key": "lastName",
    required:true,
    "viewHidden": true,
    "placeholder": "Enter your last name",
  
  },
  {
    "heading": "email",
    "key": "email",
    required:true,
    "disable": true,
    render:(prop)=>{
      return <span className="normal-case">{prop?.email}</span>
    },
    "placeholder": "Enter your email address"
  },
  {
    "heading": "Date of joining",
    "key": "createdAt",
    "type": "date",
    "add":false,
    "disable": true,
    "placeholder": "Select your joining date"
  },

 
  {
    "heading": "Gender",
    "key": "gender",
  required:true,

    "type": "select",
    "options": [
      {
        "name": "Select one",
        "value": "",
        "disable":true
      },
      {
        "name": "Male",
        "value": "male"
      },
      {
        "name": "Female",
        "value": "female"
      },
      {
        "name": "Rather not to say",
        "value": "other"
      }
    ],
    "placeholder": "Select your gender"
  },

  {
    "heading": "Shift Start",
    "key": "shiftStart",
  required:true,

    "type": "select",
    "options": [
      {
        "name": "Select one",
        "value": "",
        "disable": true
      },
      {
        "name": "12:00 AM",
        "value": "12:00 AM"
      },
      {
        "name": "01:00 AM",
        "value": "01:00 AM"
      },
      {
        "name": "02:00 AM",
        "value": "02:00 AM"
      },
      {
        "name": "03:00 AM",
        "value": "03:00 AM"
      },
      {
        "name": "04:00 AM",
        "value": "04:00 AM"
      },
      {
        "name": "05:00 AM",
        "value": "05:00 AM"
      },
      {
        "name": "06:00 AM",
        "value": "06:00 AM"
      },
      {
        "name": "07:00 AM",
        "value": "07:00 AM"
      },
      {
        "name": "08:00 AM",
        "value": "08:00 AM"
      },
      {
        "name": "09:00 AM",
        "value": "09:00 AM"
      },
      {
        "name": "10:00 AM",
        "value": "10:00 AM"
      },
      {
        "name": "11:00 AM",
        "value": "11:00 AM"
      },
      {
        "name": "12:00 PM",
        "value": "12:00 PM"
      },
      {
        "name": "01:00 PM",
        "value": "01:00 PM"
      },
      {
        "name": "02:00 PM",
        "value": "02:00 PM"
      },
      {
        "name": "03:00 PM",
        "value": "03:00 PM"
      },
      {
        "name": "04:00 PM",
        "value": "04:00 PM"
      },
      {
        "name": "05:00 PM",
        "value": "05:00 PM"
      },
      {
        "name": "06:00 PM",
        "value": "06:00 PM"
      },
      {
        "name": "07:00 PM",
        "value": "07:00 PM"
      },
      {
        "name": "08:00 PM",
        "value": "08:00 PM"
      },
      {
        "name": "09:00 PM",
        "value": "09:00 PM"
      },
      {
        "name": "10:00 PM",
        "value": "10:00 PM"
      },
      {
        "name": "11:00 PM",
        "value": "11:00 PM"
      }
    ],
    "placeholder": "Select your shift start time"
  },
  {
    "heading": "Shift End",
    "key": "shiftEnd",
    "type": "select",
  required:true,

    "options": [
      {
        "name": "Select one",
        "value": "",
        "disable":true
      },
      {
        "name": "12:00 AM",
        "value": "12:00 AM"
      },
      {
        "name": "01:00 AM",
        "value": "01:00 AM"
      },
      {
        "name": "02:00 AM",
        "value": "02:00 AM"
      },
      {
        "name": "03:00 AM",
        "value": "03:00 AM"
      },
      {
        "name": "04:00 AM",
        "value": "04:00 AM"
      },
      {
        "name": "05:00 AM",
        "value": "05:00 AM"
      },
      {
        "name": "06:00 AM",
        "value": "06:00 AM"
      },
      {
        "name": "07:00 AM",
        "value": "07:00 AM"
      },
      {
        "name": "08:00 AM",
        "value": "08:00 AM"
      },
      {
        "name": "09:00 AM",
        "value": "09:00 AM"
      },
      {
        "name": "10:00 AM",
        "value": "10:00 AM"
      },
      {
        "name": "11:00 AM",
        "value": "11:00 AM"
      },
      {
        "name": "12:00 PM",
        "value": "12:00 PM"
      },
      {
        "name": "01:00 PM",
        "value": "01:00 PM"
      },
      {
        "name": "02:00 PM",
        "value": "02:00 PM"
      },
      {
        "name": "03:00 PM",
        "value": "03:00 PM"
      },
      {
        "name": "04:00 PM",
        "value": "04:00 PM"
      },
      {
        "name": "05:00 PM",
        "value": "05:00 PM"
      },
      {
        "name": "06:00 PM",
        "value": "06:00 PM"
      },
      {
        "name": "07:00 PM",
        "value": "07:00 PM"
      },
      {
        "name": "08:00 PM",
        "value": "08:00 PM"
      },
      {
        "name": "09:00 PM",
        "value": "09:00 PM"
      },
      {
        "name": "10:00 PM",
        "value": "10:00 PM"
      },
      {
        "name": "11:00 PM",
        "value": "11:00 PM"
      }
    ],
    "placeholder": "Select your shift end time"
  },
  {
    "heading": "Phone",
    "key": "phone",
    max:"10",
    prefix:()=>{
      return <span className="p-2 px-3 bg-primary text-white rounded-s-lg">+1</span>
    },
    render: (properties) => {
      return properties?.phone && "+1 " + properties?.phone;

  },
  required:true,
    "type": "tel",
    "placeholder": "Enter your phone number"
  },
  {
    "heading": "Time Zone",
    "key": "timezone",
  required:true,

    "type": "select",
    "options": [],
    "placeholder": "Select your time zone"
  },
  {
    "heading": "Bio",
    "key": "bio",
    "type": "textarea",
    "placeholder": "Write a short bio"
  }
]
export default docCols