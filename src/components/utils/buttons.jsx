import { useState } from "react"
import MiniLoader from "./miniLoader"

// eslint-disable-next-line react/prop-types
const Buttons = ({ type = "primary", children, spinner = false, disabled, big = false, className, onClick, href, name }) => {
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {

    setLoading(true)
    onClick && await onClick()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  return (
    <>
    <div>
      {
        
        type === 'download'?
        <a href={href}>
           <div className='flex gap-2.5 bg-primary-dark px-8 py-2.5 rounded-xl items-center'>
        <p className='font-semibold text-white '>{name}</p>
        <img className='h-4 w-4' src={"/logos/download.png"} alt="" />
    </div>
          {children}
        </a>
        : <button disabled={disabled} onClick={handleClick} className={` relative rounded-xl  py-2.5 px-8 ${type === "border" ? "text-primary-dark  border border-primary-dark border-solid disabled:opacity-70 disabled:text-desc" : type === "danger" ? "bg-red-500 text-white" : "bg-primary-dark text-white"} select-none $ disabled:opacity-50 font-semibold ${className}`}>
        {
          spinner &&
          <span className="absolute left-2 top-3">
            {
              loading && <MiniLoader />
            }
          </span>
        }
        {children}
      </button>
      }
   
    </div>

    </>
  )
}

export default Buttons