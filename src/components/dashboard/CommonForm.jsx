import { Edit } from 'lucide-react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import CtaLoader from '../utils/ctaLoader'
import useGlobal from '../../hooks/useGlobal'
const CommonForm = ({ type, handleEditorChange, className, items, inputItems, handleInput, onSubmit, cta = true, ctaDisable, loader }) => {
const {user}= useGlobal()
  return (
    <>
      <form className={`mt-4 `} onSubmit={onSubmit}>
        <div className={`lg:flex gap-4  ${className} `}>
          <div className='flex justify-center'>
            {type !== 'blog' && (
              <span className='relative'>
                <input
                  type='file'
                  name='image'
                  className='hidden'
                  id={`${type}imageAdd`}
                  onChange={handleInput && handleInput}
                  accept="image/*"

                />
                <label htmlFor={`${type}imageAdd`} className='relative block cursor-pointer w-32 h-32 border'>
                  <img
                    className='w-32 h-32 object-cover'
                    src={inputItems?.image
                      ? (typeof inputItems.image === "string"
                        ? inputItems.image
                        : URL.createObjectURL(inputItems.image))
                      : '/Images/persona.avif'}
                    alt=''
                  />
                  <div className='absolute top-0 right-0 w-5 bg-white backdrop-blur-3xl  '>
                    <Edit className='w-5 text-black' />
                  </div>
                </label>
              </span>
            )}
          </div>

          <div className='input_box grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grow'>
            {
              items?.map((ele,i) => {
                if ((ele?.add === false)) return
                return (
                  <InputField
                    isDisable={user?.role!="super-admin" && ele?.addDisable }
                    key={i}
                    id={ele.key}
                    value={inputItems?.[ele.key] || ""}
                    label={ele?.heading}
                    handleInputChange={handleInput}
                    type={ele.type}
                    placeholder={ele.placeholder}
                    options={ele.options}
                    max={ele.max}
                    min={ele.min}
                    required={ele?.required}
                    prefix={ele?.prefix}
                    handleEditorChange={handleEditorChange}
                  />
                )
              })
            }
          </div>
        </div>
        {
          cta && <div className='text-right mt-2'>
            <Buttons disabled={ctaDisable} big>
              {loader ?
                <CtaLoader />
                : "Save"
              }
            </Buttons>
          </div>
        }
      </form>
    </>
  )
}

export default CommonForm
