
"use client";
import { AppointmentProps, DoctorDetail } from "@/types/types";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getDayFromDate } from "@/utils/getDayFromDate";
import { getLongDate } from "@/utils/getLongDate";
import { Loader2, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter} from "next/navigation";
import TextInput from "./FormInputs/TextInput";
import RadioInput from "./FormInputs/RadioInput";
import { TextAreaInput } from "./FormInputs/TextAreaInput";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Appointment, DoctorProfile } from "@prisma/client";
import FrontDoctorDetails from "./FrontDoctorDetails";

export default function DoctorDetails({
  doctor,
  appointment,
  doctorProfile,
}: {
  doctor: DoctorDetail;
  appointment: Appointment | null;
  doctorProfile: DoctorProfile | null | undefined;
}) {
  const [isActive, setIsActive] = useState("availability");
  const { data: session } = useSession();
  const patient = session?.user;
  const [step, setStep] = useState(1);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [totalCost, setTotalCost] = useState(0);
  
  const day = getDayFromDate(date?.toDateString());
  const longDate = getLongDate(date!.toDateString());
  const times = doctor.doctorProfile?.availability?.[day] ?? null;
  const hourlyRate = doctor.doctorProfile?.hourlyWage ?? 0;

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const router = useRouter();
  // const params = useSearchParams();

  // Function to disable past dates
  const disablePastDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };


  // Function to convert time string to minutes for comparison
  const convertTimeToMinutes = (time: string): number => {
    const [timeStr, period] = time.toLowerCase().split(/(?=[ap]m)/);
    let [hours] = timeStr.split(':').map(Number);
    const [ minutes] = timeStr.split(':').map(Number);
    
    // Convert to 24-hour format
    if (period === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period === 'am' && hours === 12) {
      hours = 0;
    }
    
    return hours * 60 + (minutes || 0);
  };

  // Function to check if times are consecutive
  const areTimesConsecutive = (existingTime: string, newTime: string): boolean => {
    const existing = convertTimeToMinutes(existingTime);
    const newTimeMinutes = convertTimeToMinutes(newTime);
    return Math.abs(existing - newTimeMinutes) === 60;
  };

  // Updated time selection handler
  const handleTimeSelection = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      if (selectedTimes.length === 0) {
        // First selection is always valid
        setSelectedTimes([time]);
      } else {
        // Check if the new time is consecutive with any selected time
        const isConsecutive = selectedTimes.some(selectedTime => 
          areTimesConsecutive(selectedTime, time)
        );

        if (isConsecutive) {
          const newTimes = [...selectedTimes, time].sort((a, b) => 
            convertTimeToMinutes(a) - convertTimeToMinutes(b)
          );
          setSelectedTimes(newTimes);
        } else {
          toast.error("Please select consecutive time slots");
        }
      }
    }
  };

  // Calculate total cost whenever selected times change
  useEffect(() => {
    const numberOfHours = selectedTimes.length;
    setTotalCost(numberOfHours * hourlyRate);
  }, [selectedTimes, hourlyRate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentProps>({
    defaultValues: {
      email: appointment?.email || "",
      firstName: appointment?.firstName || patient?.name?.split(" ")[0],
      phone: appointment?.phone ?? "",
      lastName: appointment?.lastName || patient?.name?.split(" ")[1],
      location: appointment?.location ?? "",
      gender: appointment?.gender ?? "",
    },
  });

  async function onSubmit(data: AppointmentProps) {
    if (selectedTimes.length === 0) {
      toast.error("Please select at least one time slot");
      return;
    }

    data.appointmentDate = date;
    data.appointmentFormattedDate = longDate;
    data.appointmentTime = selectedTimes.join(", "); // Join all selected times
    data.doctorId = doctor.id;
    data.charge = totalCost; // Use calculated total cost
    data.patientId = patient?.id ?? "";
    data.doctorName = doctor.name;

    try {
      setLoading(true);
      // const doctorFirstName = doctor.name.split(" ")[0];
      // const patientFirstName = patient?.name?.split(" ")[0];
      // const roomName = `${doctorFirstName} - ${patientFirstName} Meeting Appointment`;

      // const res = await createAppointment(data);
      setLoading(false);
      toast.success("Appointment Created Successfully");
      router.push("/dashboard/user/appointments");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function initiateAppointment() {
    if (patient?.id) {
      if (selectedTimes.length === 0) {
        toast.error("Please select at least one time slot");
        return;
      }
      setStep((curr) => curr + 1);
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      {step === 1 ? (
        <div className="">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsActive("details")}
              className={
                isActive === "details"
                  ? "py-4 px-8 w-full uppercase tracking-widest bg-sky-600 text-white"
                  : "border border-gray-200 bg-slate-100 w-full text-slate-800 text-sm sm:text-md py-4 px-8 uppercase tracking-widest"
              }
            >
              Details
            </button>
            <button
              onClick={() => setIsActive("availability")}
              className={
                isActive === "availability"
                  ? "py-4 px-8 w-full bg-sky-600 text-white uppercase tracking-widest"
                  : "border border-gray-200 bg-slate-100 w-full text-slate-800 text-sm sm:text-md py-4 px-8 uppercase tracking-widest"
              }
            >
              Availability
            </button>
          </div>
          <div className="py-8 px-6">
            {isActive === "availability" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="">
                <Calendar
  value={date}
  onSelect={(newDate) => setDate(newDate)}
  disabled={disablePastDates}
  className="rounded-md border"
/>
                </div>
                <div className="">
                  <span className="text-sky-600 text-sm">
                    You have selected
                  </span>
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {longDate}
                  </h2>
                  {times && times.length > 0 && (
                    <div className="py-3 grid grid-cols-4 gap-2">
                      {times.map((item, i) => (
                        <Button
                          key={i}
                          onClick={() => handleTimeSelection(item)}
                          variant={
                            selectedTimes.includes(item) ? "default" : "outline"
                          }
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  )}
                  {selectedTimes.length > 0 && (
                    <div className="mt-4 p-4 bg-sky-50 rounded-lg">
                      <p className="text-sky-800 font-medium">Selected Times: {selectedTimes.join(", ")}</p>
                      <p className="text-sky-800 font-medium">Duration: {selectedTimes.length} hour(s)</p>
                      <p className="text-sky-800 font-medium">Total Cost: £{totalCost}</p>
                    </div>
                  )}
                  <div className="py-4">
                    <button
                      onClick={initiateAppointment}
                      type="button"
                      className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                    >
                      Book Appointment
                      <MoveRight className="w-6 h-6 ml-3" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <FrontDoctorDetails doctorProfile={doctorProfile} />
              </div>
            )}
          </div>
        </div>
      ) : (
          <div className="p-8 ">
      
          <form
            className=" py-4 px-4  mx-auto "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="scroll-m-20 border-b pb-3 mb-6 text-3xl font-normal tracking-tight first:mt-0 ">
              Tell <span className="font-semibold text-sky-900">{doctor.doctorProfile?.firstName} </span> a few details about the work
            </h2>
            {step === 2 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 ">
                  <TextInput
                    label="First Name"
                    register={register}
                    name="firstName"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter First Name"
                  />
                  <TextInput
                    label="Last Name"
                    register={register}
                    name="lastName"
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <TextInput
                    label="Phone Number"
                    register={register}
                    name="phone"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter Phone Number"
                  />
                  <TextInput
                    label="Email Address"
                    register={register}
                    name="email"
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                 
                   <TextInput
                    label="Company Name (optional)"
                    register={register}
                    name="companyName"
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter Company Name"
                  />
                </div>
                <div className="mt-8 flex justify-between gap-4 items-center">
                  <Button
                  
                    type="button"
                    className=" bg-sky-500 text-white"
                    onClick={() => setStep((currStep) => currStep - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className=" bg-sky-600 text-white"
                    onClick={() => setStep((currStep) => currStep + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="">
                  <TextInput
                    label="Work Location"
                    register={register}
                    name="location"
                    errors={errors}
                    className="col-span-1 my-2"
                    placeholder="Enter work Location"
                  />
                   <RadioInput
                    title="Patient Gender"
                    register={register}
                    name="gender"
                    errors={errors}
                    className="col-span-1"
                    radioOptions={genderOptions}
                  />
                 
                </div>
                <TextAreaInput
                  label="Brief Description Of The Work"
                  register={register}
                  name="appointmentReason"
                  errors={errors}
                  placeholder="Enter work description"
                />

                {/* <MultipleFileUpload
                  label="Medical Documents"
                  files={medicalDocs}
                  setFiles={setMedicalDocs}
                  endpoint="patientMedicalFiles"
                /> */}
                <div className="mt-8 flex justify-between gap-4 items-center">
                  <Button
                    variant={"outline"}
                    className="text-white bg-sky-500"
                    type="button"
                    onClick={() => setStep((currStep) => currStep - 1)}
                  >
                    Previous
                  </Button>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving please wait ...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className=" bg-sky-600 text-white"
                      onClick={() => setStep((currStep) => currStep + 1)}
                    >
                      Complete Appointment
                    </Button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}