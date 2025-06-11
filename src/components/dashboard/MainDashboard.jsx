import { useEffect, useMemo, useState } from 'react';
import {  BriefcaseMedical, CalendarDays, ClipboardPlus, UsersRound } from 'lucide-react';
import LineChart from '../../components/dashboard/lineChart';
import AllTables from '../../components/dashboard/AllTables';
import useGlobal from '../../hooks/useGlobal';
import apiHandler from '../../functions/apiHandler';
import AnimatedCard from '../utils/animatedCard';
import Card from '../utils/card';
import UserCard from '../utils/userCard';

const MainDashboard = () => {
  const { counts } = useGlobal();
  const [patients, setPatients] = useState([])
  const menu = useMemo(
    () => [
      {
        title: 'Total Patients',
        value: counts?.totalPatientCount,
        icon: <UsersRound className="w-10 h-10" />,
      },
      {
        title: 'Total Clinician',
        value: counts?.totalClinicianCount,
        icon: <BriefcaseMedical className="w-10 h-10" />,
      },
      {
        title: 'Total Appointments',
        value: counts?.totalAppointmentCount,
        icon: <CalendarDays className="w-10 h-10" />,
      },
      {
        title: 'Total Survey',
        value: counts?.totalSurveyCount,
        icon: <ClipboardPlus className="w-10 h-10" />,
      },
    ],
    [counts]
  );
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const { data } = await apiHandler.get("users?skip=0&count=10&role=patient")
    setPatients(data?.data?.resp)
  }
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 p-0">
        {menu.map((item, index) => (
          <AnimatedCard key={index} index={index} icon={item.icon} title={item.title} value={item.value} />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div className=' xl:col-span-3  line_chart h-fit' >

        <Card title="Activity">
          <LineChart />
        </Card>
        </div>
        <Card className={""} title="New Patients" desc="Last 24 hours">
          <UserCard users={patients} />
        </Card>
      </div>
      <AllTables type="clinician" />
    </div>
  );
};

export default MainDashboard;
