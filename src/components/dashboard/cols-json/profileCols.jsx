const profile = [
  {
    "heading": "image",
    "type": "file",
    "key": "image",
    "placeholder": "Upload your image",
    "add": false,
  },
  {
    "heading": "name",
    "key": "fullName",
    "add": false,
    "placeholder": "Enter your full name",
    "hidden": true

  },
  {
    "heading": "First Name",
    "key": "firstName",
    "viewHidden": true,
    required:true,
    "placeholder": "Enter your first name"
  },
  {
    "heading": "Last Name",
    "key": "lastName",
    required:true,
    "viewHidden": true,
    "placeholder": "Enter your last name"
  },
  {
    "heading": "email",
    "key": "email",
    "placeholder": "Enter your email address",
    required:true,
    "addDisable": true,
    "disable": true,
    render: (prop) => {
      return <span className="normal-case">{prop?.email}</span>
    },
  },
  {
    "heading": "access",
    "key": "access",
    "hidden": true,
    "placeholder": "Enter access level",
    "add": false
  },
  {
    "heading": "Phone",
    "key": "phone",
    max: "10",
    prefix: () => {
      return <span className="p-2 px-3 bg-primary text-white rounded-s-lg">+1</span>
    },
    render: (properties) => {
      return properties?.phone && "+1 " + properties?.phone;

  },
    "type": "tel",
    "placeholder": "Enter your phone number",
    "addDisable": true,
    "disable": true


  }
]
export default profile