"use client";
import { PracticeFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
// import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";
import { hourlyRates } from "@/lib/constants";

// Define the hourly rate options type
// interface HourlyRateOption {
//   profession: string;
//   rate: number;
// }

export default function PracticeInfo({
  page,
  title,
  description,
  specialties,
  formId,
  userId,
  nextPage,
  doctorProfile,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { savedDBData, setPracticeData } = useOnboardingContext();
  const pathname = usePathname();
  console.log(` new specialty ${specialties}`);



  const initialSpecialities =
    doctorProfile.otherSpecialties.length > 0
      ? doctorProfile.otherSpecialties
      : savedDBData.otherSpecialties;
  const [otherSpecialties, setOtherSpecialties] = useState(initialSpecialities);

  const initialServices =
    doctorProfile.servicesOffered.length > 0
      ? doctorProfile.servicesOffered
      : savedDBData.servicesOffered;
  const [services] = useState(initialServices);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    watch,
  } = useForm<PracticeFormProps>({
    defaultValues: {
      page: doctorProfile.page || savedDBData.page,
      hourlyWage: doctorProfile.hourlyWage?.toString() || savedDBData.hourlyWage?.toString() || "",
    },
  });
  
  const selectedHourlyWage = watch("hourlyWage");
  
  // Function to get the display text for the current selection (for info display)
  // const getSelectedRateInfo = () => {
  //   if (!selectedHourlyWage) return "";
    
  //   const selectedOption = hourlyRates.find(option => option.rate.toString() === selectedHourlyWage);
  //   if (!selectedOption) return "";
    
  //   return `${selectedOption.profession}`;
  // };
  
  const router = useRouter();
  
  async function onSubmit(data: PracticeFormProps) {
    data.page = page;
    data.otherSpecialties = otherSpecialties;
    data.servicesOffered = services;
    data.hourlyWage = Number(data.hourlyWage);
    console.log(userId, formId);
    console.log(data);
    setIsLoading(true);
    try {
      const res = await updateDoctorProfile(doctorProfile.id, data);
      setPracticeData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Practice Info Updated Successfully");
        router.push(`${pathname}?page=${nextPage}`);
        console.log(res.data);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) { 
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4 dark:border-slate-600">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <div className="col-span-full sm:col-span-1">
            <label htmlFor="hourlyWage" className="block text-sm font-medium mb-1">
              Your Professional Role
            </label>
            <select
              id="hourlyWage"
              {...register("hourlyWage", { required: "Please select your professional role" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your role and experience level</option>
              {hourlyRates.map((option, index) => (
                <option key={index} value={option.rate.toString()}>
                  {option.profession}
                </option>
              ))}
            </select>
            {errors.hourlyWage && (
              <p className="text-red-500 text-sm mt-1">{errors.hourlyWage.message}</p>
            )}
            
            {selectedHourlyWage && (
              <p className="text-sm text-gray-500 mt-1">
                Hourly rate: £{selectedHourlyWage}/hr
              </p>
            )}
          </div>
        
          <ArrayItemsInput
            setItems={setOtherSpecialties}
            items={otherSpecialties}
            itemTitle="Other Specialties"
          />
        </div>
        
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title="Save and Continue"
            isLoading={isLoading}
            loadingTitle="Saving please wait..."
          />
        </div>
      </form>
    </div>
  );
}