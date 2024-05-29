"use client"
import { Sidenav } from '@/components/Sidenav/sidenav'
import { Consultation } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { MdOutlineSick } from "react-icons/md";

type Props = {
  consultations: Consultation[]
};

export const Admin = ({ consultations }: Props) => {
  // console.log(consultations);
  
    return (
        <div className="flex w-full bg-gray-50">
      <Sidenav />
      <div className="w-full h-full flex flex-col lg:ml-72 py-16 pt-20 px-4">
        <h1 className='text-3xl mb-4'>All Consultations</h1>
        <div className='grid grid-cols-2 gap-y-6'>
          {consultations?.map((consult) => (
            <Card key={consult._id} className="w-[380px]">
              <CardHeader>
                <CardTitle>{consult.patientFirst} {consult.patientLast}</CardTitle>
                <CardDescription>DOB: {new Date(consult.dob).toLocaleDateString()}</CardDescription>
                <CardDescription>{consult.email}</CardDescription>
                <CardDescription>{consult.gender}</CardDescription>
                <CardDescription>{consult.location}</CardDescription>
                <CardDescription>{consult.number}</CardDescription>
                {/* <CardDescription>{consult.}</CardDescription> */}
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <MdOutlineSick size={30}/>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none capitalize">
                      Consultation Type: {consult.consultation}
                    </p>
                    <p className="text-sm font-medium leading-none capitalize">
                      Consultation Type: {consult.healthcare}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Condition: {consult.condition}
                    </p>
                  </div>
                </div>
                <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Appointment
                    </p>
                    <div className='flex gap-2'>
                    <p className="text-sm text-muted-foreground">
                      {new Date(consult.consultDate).toLocaleDateString()}
                      {/* {new Date(consult.consultDate).toLocaleTimeString()} */}                    
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {consult.consultTime}                   
                    </p>
                    </div>                  
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
        </div>
    )
}