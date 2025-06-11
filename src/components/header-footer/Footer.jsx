import React, { useState } from 'react'

function Footer() {

     const [footerData,setFooterData] = useState([
            {
              title:"Home",
            },
            {
                title:"Games",
              },
              {
                title:"Game Assets",
              },
              {
                title:"Certificates",
              },
              {
                title:"Roadmaps",
              },  
              {
                title:"Engagement Tools",
              },  
              {
                title:"Contact Us",
              },    
     ])
  return (
<>
<div className='bg-black py-12'>
    <div className='flex justify-center'>
    <img src={"/logos/linkdin.png"} alt="" className='h-12 w-12' /></div>

    <div className='flex gap-16 justify-center py-14'>
{footerData?.map((item)=>{
    return(
        <p className='text-black-v4 font-medium'>{item.title}</p>    
    )
})}
</div>
    <p className='text-black-v3 flex justify-center'>©Aristocrat 2025. All Rights Reserved.</p>
</div>
</>
  )
}

export default Footer