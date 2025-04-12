"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "@/types/types";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";


import { Cross } from "lucide-react";
import { HiInformationCircle } from "react-icons/hi";
// import SignupCarousel from "../Frontend/SignupCarousel";



export default function LoginFormWithBg() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // eslint-disable-line
  } = useForm<LoginInputProps>();
  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setIsLoading(false);
        toast.error("Sign-in error: Check your credentials");
        setShowNotification(true);
      } else {
        // Sign-in was successful
        setShowNotification(false);
        reset();
        setIsLoading(false);
        toast.success("Login Successful");
        router.push(returnUrl);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[800px] lg:grid-cols-2 relative bg-gray-50 dark:bg-gray-950">
      <div className="flex items-center justify-center py-20 lg:py-24">
        <div className="mx-auto grid w-[540px] gap-10">
          <div className="absolute top-8 left-8">
            <Link href="/" className="flex items-center">
              <div className="text-gray-700 dark:text-gray-300 text-5xl mr-3">
                <Cross />
              </div>
              <span className="text-3xl font-extrabold tracking-wide text-gray-800 dark:text-gray-100">
                SHIFTLY
              </span>
            </Link>
          </div>
          
          <div className="grid gap-4 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">
              Login to Your Account
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Welcome back to <span className="font-semibold text-gray-700 dark:text-gray-300">Shiftly</span>. Let&apos;s get you signed in.
            </p>
          </div>

          <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
            {showNotification && (
              <div className="flex items-center p-4 text-red-600 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
                <HiInformationCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="font-semibold ml-2">Sign-in error!</span> Please check your credentials.
              </div>
            )}
            
            <div className="grid gap-2">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Eg. johndoe@gmail.com"
                {...register("email")}
                className="h-16 text-xl px-5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="******"
                {...register("password")}
                className="h-16 text-xl px-5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-16 text-xl font-semibold rounded-lg bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white mt-4"
            >
              {isLoading ? "Logging you in, please wait..." : "Login"}
            </button>
          </form>

          <div className="text-center text-lg text-gray-700 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-gray-100 dark:bg-gray-900 lg:block">
        {/* <SignupCarousel /> */}
      </div>
    </div>
  );
}