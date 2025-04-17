import { getAppointmentById } from "@/actions/appointments";
import { Button } from "@/components/ui/button";
import { Calendar, HandCoins } from "lucide-react";
// import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  // Properly await the params object before accessing its properties
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const appointment = await getAppointmentById(id);
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl font-semibold tracking-tight first:mt-0">
            {appointment?.doctorName}
          </h2>
          <div className="flex flex-wrap space-x-2 divide-x-2 divide-gray-200 text-sm">
            <p className="capitalize px-2">{appointment?.gender}</p>
            <p className="px-2">{appointment?.phone}</p>
          </div>

          <div className="flex items-center text-sm mt-4">
            <HandCoins className="w-4 h-4 mr-2" />
            <span>Total Charge</span>
            <span> : £ {appointment?.charge}</span>
          </div>
        </div>
        
        <div className="w-full md:w-auto text-left md:text-right">
          <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl font-medium tracking-tight first:mt-0">
            {appointment?.appointmentFormattedDate}
          </h2>
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{appointment?.appointmentTime?.toString().split(',')[0]}</span>
          </div>
        </div>
      </div>
      
      {appointment?.status === "approved" ? (
        <div className="border-2 border-green-600 shadow rounded-md p-3 md:p-4 my-4">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3">
              <h2 className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight py-2 mb-2 sm:mb-0">
                Appointment Approved
              </h2>
              <Button className="w-full sm:w-auto mt-2 sm:mt-0 text-xs md:text-sm">
                {`${appointment?.appointmentFormattedDate} 
                from ${appointment?.appointmentTime?.toString().split(',')[0]}
                `}
              </Button>
            </div>
            
            <div className="py-4 space-y-4">
              <div className="py-4">
                <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">Description</p>
                  <p className="sm:px-3 w-full sm:w-3/4">{appointment?.appointmentReason}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">Total Hours</p>
                  <p className="sm:px-3 w-full sm:w-3/4"> £ {appointment?.totalHours}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">To Pay</p>
                  <p className="sm:px-3 w-full sm:w-3/4"> £ {appointment?.charge}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">Email</p>
                  <p className="sm:px-3 w-full sm:w-3/4">{appointment?.email}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">Address</p>
                  <p className="sm:px-3 w-full sm:w-3/4">{appointment?.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-green-600 shadow rounded-md p-3 md:p-4 my-4">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <h2 className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight py-2 mb-2 sm:mb-0">
                Appointment Status 
              </h2>
              <Button className="w-full sm:w-auto mt-2 sm:mt-0">{appointment?.status}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}