import Footer from '@/components/Footer/page'
import { Navbar } from '@/components/Navbar/navbar'
import { allConsultations } from '@/utils/api'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { FaPills } from 'react-icons/fa'
import { Consultation } from '@/utils/types'
import { SearchBar } from '@/components/Search/search'
import { AiTwotoneSchedule } from "react-icons/ai";

const Dashboard = async () => {
  const user = await currentUser();
  const consultations:Consultation[] = await allConsultations();

  const matchedConsultations = consultations?.filter(consultation =>
    consultation.email === user?.emailAddresses[0].emailAddress &&
    consultation.patientFirst === user?.firstName &&
    consultation.patientLast === user?.lastName
  );

  const searchValues = matchedConsultations;

  return (
    <div>
      <Navbar />
     
      <div className='p-5'>
        <div className='w-[60%] max-md:w-[90%] absolute -translate-x-1/2 left-1/2 right-1/2'>         
          <SearchBar searchValues={searchValues} />
        </div>

        <div className='mt-32'>
          <h1 className='text-3xl mt-5'>Consultation Details</h1>
          {/* <UserDashboard consultations={consultations} /> */}

          <div>
            {matchedConsultations?.length > 0 ? (
              matchedConsultations.map((consultation) => (
                <div key={consultation._id} className="mt-5 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <AiTwotoneSchedule size={30} />
                  <p className="mb-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Healthcare: {consultation.healthcare}
                  </p>
                  <p className='font-extrabold text-xl'>Consultation Type: {consultation.consultation}</p>
                  <p>Condition: <span className='text-sm'>{consultation.condition}</span></p>
                  <p className="my-2 font-normal text-gray-500 dark:text-gray-400">
                    Appointment Date:
                    {new Date(consultation.consultDate).toLocaleDateString()}
                  </p>
                  <p className="font-normal text-gray-500 dark:text-gray-400">
                    Appointment Time: {consultation.consultTime}
                  </p>
                  <p className=""></p>
                </div>
              ))
            ) : (
              <p>You do not have a consultation. Kindly see an officer to book one</p>
            )} 
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
