import DeleteData from "../actions/deleteData"
import EditData from "../actions/editData"
import ViewData from "../actions/viewData"


export const categoryCols = [
    {
        name: "Image", checked: true, cell: (properties) => (
            <img className='rounded w-20 h-20 object-contain' src={properties?.image || "/logos/TCFWC.png"} alt="" />
        )
    },
    {
        name: "title ", accessor: "title", checked: true,
    },
    {
        name: "actions",accessor:"actions", sticky:true, checked: true, cell: (properties) => {
            return <div className='flex p-6 md:justify-center gap-2'><ViewData data={properties} type="categories" />
            
            <EditData type={"categories"} data={properties} /><DeleteData type={"categories"} properties={properties} />
            
            </div>

        }
    },
    // { name: "Request Date", checked: true, cell:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]