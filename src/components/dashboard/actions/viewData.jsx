import React, { useEffect, useMemo } from 'react'
import Modal from '../../utils/Modal'
import { Eye } from 'lucide-react'
import moment from 'moment';
import doctorCols from '../cols-json/doctorCols'
import patientCols from '../cols-json/patientCols'
import profile from '../cols-json/profileCols'
import categories from '../cols-json/categories.json'

import { mood } from '../cols-json/moodCols'
import { appointment } from '../cols-json/appointmentsCols';
import { metric } from '../cols-json/metricCols';
import { blogs } from '../cols-json/blogs';
import { dateFormat } from '../../../../constants';

const ViewData = ({ type, data }) => {
    const cols = useMemo(
        () => type === "blog" ? blogs : type === "mood" ? mood : type === "appointment" ? appointment : type === "metric" ? metric : type === "admin" ? profile : type === "categories" ? categories :type === "patient"? patientCols : doctorCols,
        [type]
    );



    return (
        <>
            <Modal className={`${type === "blog" && "md:max-w-[70%]"} `} openCTA={<span title="View"> <Eye className='w-5 text-green-700' /> </span>}  heading={"View Details"} firstCtaText={"Close"} >
                <ul className='max-h-96 overflow-auto whitespace-normal '>
                    {
                        cols?.map((item, i) => {
                            if (item?.viewHidden) {
                                return null
                            }
                            return <li key={i} className={`grid grid-cols-2 gap-4   ${i % 2 !== 0 ? "bg-white" : "bg-primary-light"}`}>
                                <span className='w-full p-3  capitalize font-bold break-words'>{item.heading}</span>
                                {
                                    item?.type === "file" ? <img className='w-12 rounded-full h-12 justify-self-end m-2' src={data?.[item?.key] || (type==="categories" ?"/logos/TCFWC.png" : "/Images/persona.avif")} alt="" />
                                        :
                                        <span className='w-full p-3  break-words '>
                                           
                                    {item.type === "date"
                                        ? moment(data?.[item.key]).format(dateFormat)
                                        : Array.isArray(item.key)
                                            ? item.key.map((key) => data?.[key]).join(" ")
                                            : item?.render? item.render(data): data?.[item.key]
                                    }
                                </span>
                                }
                            </li>
                        })
                    }
                </ul>
            </Modal>

        </>
    )
}

export default ViewData