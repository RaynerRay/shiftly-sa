"use client";

import { updateAppointmentById } from "@/actions/appointments";
import RadioInput from "@/components/FormInputs/RadioInput";
import { Button } from "@/components/ui/button";
import { Appointment, AppointmentStatus } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type AppointmentUpdateProps = {
  status: AppointmentStatus;
  meetingLink: string;
  meetingProvider: string;
};

export default function UpdateAppointmentForm({
  appointment,
}: {
  appointment: Appointment;
}) {
  const [loading, setLoading] = useState(false);
  
  // Get the first time from appointmentTime (assuming format like "10:00 AM, 11:00 AM, etc.")
  const firstAppointmentTime = appointment.appointmentTime?.split(',')[0]?.trim() || "";
  
  // Combine date and time to create appointment datetime
  const appointmentDateTime = new Date(`${appointment.appointmentDate} ${firstAppointmentTime}`);
  const currentDateTime = new Date();
  
  // Calculate the difference in hours
  const hoursDifference = (appointmentDateTime.getTime() - currentDateTime.getTime()) / (1000 * 60 * 60);
  
  // Check if appointment is less than 3 hours away or in the past
  const cannotUpdateAppointment = hoursDifference < 3;
  
  const statusOptions = [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Approve",
      value: "approved",
    },
    {
      label: "Reject",
      value: "rejected",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentUpdateProps>({
    defaultValues: {
      meetingLink: appointment.meetingLink,
      meetingProvider: appointment.meetingProvider,
      status: appointment.status,
    },
  });

  async function handleUpdate(data: AppointmentUpdateProps) {
    // Prevent updates if appointment is less than 3 hours away
    if (cannotUpdateAppointment) {
      toast.error("Cannot update appointments within 3 hours of the scheduled time");
      return;
    }

    setLoading(true);
    try {
      await updateAppointmentById(appointment.id, data);
      setLoading(false);
      toast.success("Appointment Updated successfully");
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setLoading(false);
      toast.error(error.message || "Failed to update appointment");
      console.log(error);
    }
  }

  return (
    <form
      className="border-2 border-green-600 shadow rounded-md p-2 sm:p-4 mx-0 sm:mx-4 my-4"
      onSubmit={handleSubmit(handleUpdate)}
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b">
          <h2 className="scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight py-2 mb-2 sm:mb-3">
            Update Appointment
          </h2>
          <Button 
            className="w-full sm:w-auto mb-3 sm:mb-0"
            disabled={loading || cannotUpdateAppointment}
          >
            {loading
              ? "Saving..."
              : cannotUpdateAppointment
                ? "Cannot Update"
                : "Update Appointment"}
          </Button>
        </div>
        
        {cannotUpdateAppointment && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 my-3 sm:my-4">
            <div className="flex">
              <div className="ml-2 sm:ml-3">
                <p className="text-xs sm:text-sm text-yellow-700">
                  {hoursDifference < 0 
                    ? "This appointment has already passed and cannot be updated."
                    : "Appointments cannot be updated within 3 hours of the scheduled time."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-2">
          <div className="py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <RadioInput
                title="Appointment Status"
                name="status"
                errors={errors}
                register={register}
                radioOptions={statusOptions}
                className="col-span-1"
                disabled={cannotUpdateAppointment}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}