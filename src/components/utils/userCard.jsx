/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { ClipboardX } from 'lucide-react'
import Persona from './persona'

const UserCard = ({ users }) => {
  const [height, setHeight] = useState(0)
  
  const lineChart = document.querySelector(".line_chart")
  useEffect(() => {
    setHeight(lineChart?.scrollHeight)
  }, [lineChart])

  return (
    <>
      <div style={{ height: window.innerWidth > 768 ? height-128 + "px": "unset" }} className=" overflow-y-auto space-y-3 mt-4">
        {
          users?.length === 0 &&
          <div className='grid place-items-center h-full'>
            <div className='grid place-items-center text-desc'>
              <ClipboardX className='w-24 h-24' />
              <span className='font-bold'>No Data</span>

            </div>



          </div>
        }
        {users?.map((user, index) => (
          <div key={index} className="p-2 border-0 border-b border-border border-solid flex justify-between gap-2 items-center">
            <div className="flex items-center gap-2">
              <Persona path={`${user?.image || "/Images/persona.avif"
}`} />
              <div>
                <h4 className='capitalize'>{`${user?.firstName} ${user?.lastName}`}</h4>
                <p className="text-desc text-sm">Address</p>
              </div>
            </div>
            {/* <ArrowRight className="w-5 text-desc opacity-50" /> */}
          </div>
        ))}
      </div>
    </>
  )
}

export default UserCard