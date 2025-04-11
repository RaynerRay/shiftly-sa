"use client";
import { additionalFormProps } from "@/types/types";

import { useForm } from "react-hook-form";

import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { TextAreaInput } from "../FormInputs/TextAreaInput";

import { StepFormProps } from "./BioDataForm";
import MultipleFileUpload, {
  FileProps,
} from "../FormInputs/MultipleFileUpload";
import { completeProfile, updateDoctorProfile } from "@/actions/onboarding";
import toast from "react-hot-toast";
import { useOnboardingContext } from "@/context/context";
// import path from "path";

export default function AdditionalInfo({
  page,
  title,
  description,
  formId,
  doctorProfile,
}: StepFormProps) {
  const {  savedDBData, setAdditionalData } =
    useOnboardingContext();
  const pathname = usePathname();
  const initialDocs = doctorProfile.additionalDocs.map((item) => {
    return {
      title: item,
      size: 0,
      url: item,
    };
  });
  const isOnboarding = pathname.split("/").includes("onboarding");
  const [isLoading, setIsLoading] = useState(false);
  const [additionalDocs, setAdditionalDocs] =
    useState<FileProps[]>(initialDocs);
  console.log(formId);
  // console.log(date);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<additionalFormProps>({
    defaultValues: {
      // educationHistory:
      //   doctorProfile.educationHistory || savedDBData.educationHistory,
      // research: doctorProfile.research || savedDBData.research,
      accomplishments:
        doctorProfile.accomplishments || savedDBData.accomplishments,
      page: doctorProfile.page || savedDBData.page,
    },
  });
  const router = useRouter();
  async function onSubmit(data: additionalFormProps) {
    data.page = page;
    data.additionalDocs = additionalDocs.map((doc: any) => doc.url); // eslint-disable-line @typescript-eslint/no-explicit-any
    console.log(data);

    setIsLoading(true);
    try {
      if (isOnboarding) {
        const res = await completeProfile(doctorProfile.id, data);
        setAdditionalData(data);
        if (res?.status === 201) {
          setIsLoading(false);

          //extract the profile form data from the updated profile
          // SEND A WELCOME EMAIL

          toast.success("Profile Completed Successfully");

          //ROUTE THEM TO THE LOGIN
          if (isOnboarding) {
            router.push("/login");
          }
        } else {
          setIsLoading(false);
          throw new Error("Something went wrong");
        }
      } else {
        const res = await updateDoctorProfile(doctorProfile.id, data);
        setAdditionalData(data);
        if (res?.status === 201) {
          setIsLoading(false);

          //extract the profile form data from the updated profile
          // SEND A WELCOME EMAIL

          toast.success("Profile Completed Successfully");

          //ROUTE THEM TO THE LOGIN
          if (isOnboarding) {
            router.push("/login");
          }
        } else {
          setIsLoading(false);
          throw new Error("Something went wrong");
        }
      }
    } catch (error) { 
      setIsLoading(false);
      console.log(error)
    }
  }
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 dark:border-slate-600 pb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          {/* <TextAreaInput
            label="Education History"
            register={register}
            name="educationHistory"
            errors={errors}
            placeholder="Enter your Education History"
          /> */}
          {/* <TextAreaInput
            label="Published Works or Research"
            register={register}
            name="research"
            errors={errors}
            placeholder="Enter any Published Works or Research"
          /> */}
          <TextAreaInput
            label="Special Accomplishments or Awards If You Have Any"
            register={register}
            name="accomplishments"
            errors={errors}
            placeholder="Enter Any Special Accomplishments or Awards"
          />
          <h3 className="col-span-full text-blue-900"> Care workers - Upload Training Certificate </h3>
          <h3 className="col-span-full text-green-900"> Social Workers - Upload Social Worker Certificate & DBS</h3>
          <h3 className="col-span-full text-yellow-900"> Nurses - Upload Nursing Certificate</h3>

          <MultipleFileUpload
            label="Upload Above Documents plus ( Right To Work & Criminal Record ) documents"
            files={additionalDocs as any} // eslint-disable-line
            setFiles={setAdditionalDocs}
            endpoint="additionalDocs"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title={isOnboarding ? "Complete" : "Save"}
            isLoading={isLoading}
            loadingTitle="Saving please wait..."
          />
        </div>
      </form>
    </div>
  );
}
