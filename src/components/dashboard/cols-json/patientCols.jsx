const patient = [
  {
    "heading": "image",
    "type": "file",
    "key": "image",
    "placeholder": "Upload your image",
    "add": false
  },
  {
    "heading": "name",
    "key": "fullName",
    "placeholder": "Enter your full name",
    "add": false,
    "hidden": true

  },
  {
    "heading": "First Name",
    "key": "firstName",
    required: true,
    "viewHidden": true,
    "placeholder": "Enter your first name"
  },
  {
    "heading": "Last Name",
    required: true,
    "key": "lastName",
    "viewHidden": true,
    "placeholder": "Enter your last name"
  },
  {
    "heading": "email",
    required: true,
    "key": "email",
    "disable": true,
    render: (prop) => {
      return <span className="normal-case">{prop?.email}</span>
    },
    "placeholder": "Enter your email address"
  },
  {
    "heading": "Health ID",
    required: true,
    "key": "healthID",
    "type": "text",
    "placeholder": "Enter your health ID"
  },
  {
    "heading": "Age",
    "key": "age",
    "type": "number",
    "min": "1",
    "placeholder": "Enter your age"
  },

  {
    "heading": "Gender",
    "key": "gender",
    "type": "select",
    "options": [
      {
        "name": "Select one",
        "value": "",
        "disable": true
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
    "heading": "Phone",
    "key": "phone",
    "placeholder": "Write you phone number",
    max: "10",
    prefix: () => {
      return <span className="p-2 px-3 bg-primary text-white rounded-s-lg">+1</span>
    },
    render: (properties) => {
      return properties?.phone && "+1 " + properties?.phone;

    },
    "type": "tel",
  },
  {
    "heading": "Time Zone",
    "key": "timezone",
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
export default patient