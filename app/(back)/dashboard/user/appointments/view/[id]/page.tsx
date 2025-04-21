import { getAppointmentById } from "@/actions/appointments";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CreditCard,  HandCoins} from "lucide-react";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Configurable platform fee
const PLATFORM_FEE = 12;

export default async function Page({ params }: PageProps) {
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
         
          <div className="flex items-center text-sm mt-4">
            <Clock className="w-4 h-4 mr-2" />
            <span>Booking Hours</span>
            <span> :  {appointment?.totalHours}</span>
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
      <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">Address</p>
                  <p className="sm:px-3 w-full sm:w-3/4">{appointment?.location}</p>
                </div>
      <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">Description</p>
                  <p className="sm:px-3 w-full sm:w-3/4">{appointment?.appointmentReason}</p>
                </div>

    {/* Payment Section */}
   {/* Payment Section */}
{appointment?.isCompleted && appointment?.status === "approved" && (
    <div className="border-2 border-blue-200 shadow rounded-md p-3 md:p-4 my-4">
      <div className="flex flex-col  md:items-start md:justify-between">
        <div className="w-full">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Payment Details</h2>
          
          {/* Hours Comparison Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Hours Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500">Agreed Hours</p>
                <p className="text-lg font-semibold">{appointment.totalHours || 0} hours</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500">Actual Hours</p>
                <p className="text-lg font-semibold">{appointment.actualHours || 0} hours</p>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-100 text-sm">
              {(appointment.actualHours || 0) > (appointment.totalHours || 0) ? (
                <p>
                  <span className="font-semibold">Note:</span> Using actual worked hours ({appointment.actualHours} hours) for calculation as it exceeds agreed hours.
                </p>
              ) : (
                <p>
                  <span className="font-semibold">Note:</span> Using agreed hours ({appointment.totalHours} hours) for calculation.
                </p>
              )}
            </div>
          </div>

          {/* Pricing Details */}
          <div className="space-y-2">
            {/* <p><span className="font-semibold">Name:</span> {appointment.doctorName}</p>
            <p><span className="font-semibold">Date:</span> {appointment.appointmentFormattedDate}</p> */}
            <p><span className="font-semibold">Total Hours:</span> {Math.max(appointment.totalHours || 0, appointment.actualHours || 0)} hours</p>
            
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <p><span className="font-semibold">Base Charge:</span></p>
                <p>£{Math.max(appointment.charge || 0, appointment.finalCharge || 0)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p><span className="font-semibold">Platform Fee:</span></p>
                <p>£{PLATFORM_FEE}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t mt-2">
                <p><span className="font-semibold">Total Amount:</span></p>
                <p className="text-lg font-bold">£{Math.max(appointment.charge || 0, appointment.finalCharge || 0) + PLATFORM_FEE}</p>
              </div>
            </div>
            
            {/* Price Calculation Explanation */}
            <div className="bg-gray-50 p-3 rounded text-sm mt-3">
              {(appointment.finalCharge || 0) > (appointment.charge || 0) ? (
                <p>
                  <span className="font-semibold">Note:</span> The final charge (£{appointment.finalCharge}) was used as it is higher than the original agreed charge.
                </p>
              ) : (
                <p>
                  <span className="font-semibold">Note:</span> The original agreed charge (£{appointment.charge}) was used for calculation.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:ml-4 flex justify-end">
          <button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group">
            <span className="flex items-center gap-1">
              <CreditCard className="w-5 h-5 transition-transform group-hover:scale-110" />
            </span>
            <span className="font-bold">Pay Now</span>
          </button>
        </div>
      </div>
    </div>
)}
      
      {appointment?.status === "approved" ? (
        <div className="border-2 border-green-200 shadow rounded-md p-3 md:p-4 my-4">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3">
              <h2 className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight py-2 mb-2 sm:mb-0">
                Appointment Approved
              </h2>
              {/* <Button className="w-full sm:w-auto mt-2 sm:mt-0 text-xs md:text-sm">
                {`${appointment?.appointmentFormattedDate} 
                from ${appointment?.appointmentTime?.toString().split(',')[0]}
                `}
              </Button> */}
            </div>
            
            <div className="py-4 space-y-4">
              <div className="py-4">
                
                
                <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">Appointmet Hours</p>
                  <p className="sm:px-3 w-full sm:w-3/4">{appointment?.totalHours} hours</p>
                </div>
                
                {/* <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">To Pay</p>
                  <p className="sm:px-3 w-full sm:w-3/4"> £ {appointment?.charge}</p>
                </div> */}
                
                {/* <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
                  <p className="font-semibold text-sm sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">Email</p>
                  <p className="sm:px-3 w-full sm:w-3/4">{appointment?.email}</p>
                </div> */}
                
                
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-yellow-300 shadow rounded-md p-3 md:p-4 my-4">
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