import InputField from "../../../utils/InputFields"

export  const questions =[
    
    {
      name: "question", checked: true, accessor: "question",
  },
  // {
  //     name: "Answers", checked: true, cell: (properties) => {
  //         // return properties?.email
  //         return  <ul>
  //         {properties.answers.map((a, idx) => (
  //           <li key={idx} className=' gap-4'>
            
  //           {a.text } 
  //           </li>
  //         ))}
  
  //       </ul>
  
  //     }
  // },
  {
      name: "Answers", checked: true, cell: (properties) => {
          // return properties?.email
        
          return  <ul className="flex gap-4 flex-wrap">
          {properties?.options.map((a, idx) => (
            <li key={idx} className=''>
            
              
              <InputField
               label={`Next Question for option ${a.text} `} type={"select"}  options={questions?.map((e=>{
                return{name:"option " + e.id,id:e.id}
              }))} value={ a?.nextQuestionId || "missing"} />    
            </li>
          ))}
  
        </ul>
  
      }
  },
  {
      name: "Opreations", checked: true, cell: (properties) => {
          // return properties?.email
  
      }
  },
  
  
  
  
  ]