import moment from "moment"
import { dateFormat } from "../../../../constants";
import ViewData from "../actions/viewData";
import EditData from "../actions/editData";
import DeleteData from "../actions/deleteData";

export const BlogColumns = [
    {
        name: "actions",sticky:true, checked: true, cell: (properties) => {
            return <div className='flex gap-2 p-5  whitespace-normal md:justify-center'><ViewData data={properties} type="blog" />
            
            <EditData type={"blog"} data={properties} /><DeleteData type={"blog"} properties={properties} />
            
            </div>

        }
    },
    {
        name: "Image", checked: true, cell: (properties) => (
            <img className='rounded w-16 h-16  object-contain' src={properties?.image || "/logos/TCFWC.png"} alt="" />
        )
    },
    {
        name: "Name", checked: true, accessor: "name",
    },
   
    {
        name: "Date", checked: true, accessor: "createdAt", cell: (properties) => {
            return moment(properties?.createdAt).format(dateFormat);

        }
    },
    {
        name: "Category", accessor: "category.title", checked: true, cell: (properties) => {
            return properties?.category?.title
        },
    },
    {
        name: "status", accessor: "published", checked: true, cell: (properties) => {
            return properties?.published ? "Published" : "Draft"
        },
    },


    // { name: "Request Date", checked: true, cell:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]
