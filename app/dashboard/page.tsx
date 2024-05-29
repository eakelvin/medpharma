import Footer from '@/components/Footer/page'
import { Navbar } from '@/components/Navbar/navbar'
import { Button } from '@/components/ui/button'
import { allConsultations } from '@/utils/api'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { FaPills } from 'react-icons/fa'
import { AiTwotoneSchedule } from "react-icons/ai";
import { Consultation } from '@/utils/types'

const UserDashboard = async () => {
  const user = await currentUser();
  const consultations:Consultation[] = await allConsultations();

  const matchedConsultations = consultations.filter(consultation =>
    consultation.email === user?.emailAddresses[0].emailAddress &&
    consultation.patientFirst === user?.firstName &&
    consultation.patientLast === user?.lastName
  );
  console.log(matchedConsultations);
  

  return (
    <div>
      <Navbar />
      
      <div className='p-5'>
        <div>         
          <form className="max-w-md mx-auto">   
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" 
                    placeholder="Search..." 
                    required 
                  />
                  <Button 
                    type="submit" 
                    className="text-white absolute end-2.5 bottom-2"
                  >
                      Search
                  </Button>
              </div>
          </form>
        </div>
        <div>
          <h1 className='text-3xl mt-5'>Consultation Details</h1>
          <div>
            {matchedConsultations.length > 0 ? (
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

export default UserDashboard
