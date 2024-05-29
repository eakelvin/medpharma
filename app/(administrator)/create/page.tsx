import { ConsultationForm } from '@/components/Consultation/book'
import { Sidenav } from '@/components/Sidenav/sidenav'

const Create = () => {
  return (
    <div className="flex w-full">
      <Sidenav />
      <div className="w-full h-full flex flex-col lg:ml-72 py-16 pt-20 px-4">
        <h1 className='text-3xl font-bold text-gray-500 text-center'>
          Book a Consultation
        </h1>
        <div className='mt-8'>
          <ConsultationForm />
        </div> 
      </div>
    </div>
  )
}

export default Create
