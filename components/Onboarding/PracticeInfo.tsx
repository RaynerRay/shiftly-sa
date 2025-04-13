"use client";
import {  PracticeFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

// import RadioInput from "../FormInputs/RadioInput";
import ArrayItemsInput from "../FormInputs/ArrayInput";
// import ShadSelectInput from "../FormInputs/ShadSelectInput";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";
// import SelectInput from "../FormInputs/SelectInput";
// import { specialisations } from './../../lib/specialisations';

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
  const {  savedDBData, setPracticeData } = useOnboardingContext();
  const pathname = usePathname();
  console.log(` new specialty ${specialties}`)

  // const allSpecialties =
  //   specialties?.map((item) => {
  //     return {
  //       label: item.title,
  //       value: item.id,
  //     };
  //   }) || [];

    const initialSpecialities =
    doctorProfile.otherSpecialties.length > 0
      ? doctorProfile.otherSpecialties
      : savedDBData.otherSpecialties;
  const [otherSpecialties, setOtherSpecialties] = useState(initialSpecialities);

  const initialServices =
    doctorProfile.servicesOffered.length > 0
      ? doctorProfile.servicesOffered
      : savedDBData.servicesOffered;
  // const initialInsuranceStatus =
  //   doctorProfile.insuranceAccepted || savedDBData.insuranceAccepted;
  const [services, setServices] = useState(initialServices);// eslint-disable-line
  // console.log(services, initialServices);
  // const [insuranceAccepted, setInsuranceAccepted] = useState(
  //   initialInsuranceStatus
  // );
  // console.log(date);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PracticeFormProps>({
    defaultValues: {
      page: doctorProfile.page || savedDBData.page,
      hourlyWage: doctorProfile.hourlyWage || savedDBData.hourlyWage,
    },
  });
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
        //extract the profile form data from the updated profile
        toast.success("Practice Info Updated Successfully");
        router.push(`${pathname}?page=${nextPage}`);
        console.log(res.data);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) { 
      setIsLoading(false);
      console.log(error)
    }
  }
  // hospitalName: string;
  // hospitalAddress: string;
  // hospitalContactNumber: string;
  // hospitalEmailAddress: string;
  // hospitalWebsite?: string;
  // hospitalHoursOfOperation: number;
  // servicesOffered: string[];
  // insuranceAccepted: string;
  // languagesSpoken: string[];
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4 dark:border-slate-600">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          {/* <TextInput
            label="Hospital Name"
            register={register}
            name="hospitalName"
            errors={errors}
            placeholder="Enter hospital Name "
            className="col-span-full sm:col-span-1"
          /> */}
          <TextInput
            label="Your Minimum Hourly Charge"
            register={register}
            name="hourlyWage"
            type="number"
            errors={errors}
            placeholder="Enter Charge per Hour "
            className="col-span-full sm:col-span-1"
          />
        
          <ArrayItemsInput
            setItems={setOtherSpecialties}
            items={otherSpecialties}
            itemTitle="Other Specialties"
          />

          
          {/* <ArrayItemsInput
            setItems={setServices}
            items={services}
            itemTitle="Add Additional Services"
          /> */}
          {/* <ArrayItemsInput
            setItems={setLanguages}
            items={languages}
            itemTitle="Add Languages Spoken at the Hospital"
          /> */}
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
