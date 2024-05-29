import Footer from '@/components/Footer/page'
import { Navbar } from '@/components/Navbar/navbar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { FaPills } from 'react-icons/fa'

const UserDashboard = () => {
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
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
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
            <div className="mt-5 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              Icon
              <p className="mb-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">doage</p>
              <p className='font-extrabold text-3xl'>name</p>
              <p className="mb-2 font-normal text-gray-500 dark:text-gray-400">when</p>
              <p className="">date</p>

              <div className="mt-3 inline-flex rounded-md shadow-sm" role="group">
              {/* <Link> */}
                  <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                      Edit
                  </button>
              {/* </Link> */}
              <button 
                  type="button" 
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  Delete
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default UserDashboard
