/* eslint-disable react/prop-types */

const Card = ({ children,title,desc,className }) => {
  return (
    <>
      <div className={`bg-white p-4 md:p-8 rounded-lg  shadow shadow-background w-full ${className}`}>
        <div className={`card-child`}>
          <span className="text-primary capitalize text-xl font-bold">{title}</span>
          <p className="text-desc text-sm">{desc}</p>
        </div>
        {children}

      </div>
    </>
  )
}

export default Card