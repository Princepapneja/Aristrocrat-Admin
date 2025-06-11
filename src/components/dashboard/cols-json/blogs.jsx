import moment from "moment";
import { dateFormat } from "../../../../constants";

export const blogs = [
 
  {
    "heading": "Name",
    "key": "name",
    "type": "text",
    required: true,
    placeholder: "Enter the blog name"
  },

  {
    "heading": "Category",
    "type": "select",
    "key": "category",
    "key2": "_id",
    required: true,
    "options": [

    ],
    render: (prop) => {
      return prop?.category?.title || "Select category";
    },
    placeholder: "Select category"
  },
  {
    "heading": "Status",
    "key": "published",
    "type": "select",
    required: true,

    "options": [
      {
        "name": "Select one",
        "value": "",
        "disable": true
      },
      {
        "name": "Draft",
        "value": false
      },
      {
        "name": "Published",
        "value": true
      }
    ],
    render: (prop) => {
      return prop?.published ? "Published" : "Draft";
    },
    placeholder: "Select status"
  },
  {
    "heading": "Image",
    "type": "file",
    "key": "image",

    render: (prop) => {
      return prop?.image ? <img src={prop.image} alt="Image" /> : null;
    },
    placeholder: "Upload an image",
    
  },
  {
    "heading": "Description",
    "key": "description",
    required: true,
    "type": "textEditor",
    render: (prop) => {
      return <div dangerouslySetInnerHTML={{ __html: prop?.description }} />;
    },
    placeholder: "Enter the blog description"
  },
  {
    "heading": "Date",
    "key": "createdAt",
    "hidden": true,
    render: (prop) => {
      return moment(prop?.createdAt).format(dateFormat);
    },
    "add": false,

    placeholder: "Select date"
  }
];
