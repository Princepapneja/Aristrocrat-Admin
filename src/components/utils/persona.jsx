import React from 'react'

const Persona = ({path,className}) => {
  return (

     <img className={`h-10 w-10  rounded-full object-cover ${className}`} src={path || "/Images/persona.avif"} alt="" />
               
  )
}

export default Persona