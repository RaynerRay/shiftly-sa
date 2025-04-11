import LoginFormWithBg from "@/components/Auth/Login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

// Remove the explicit typing and let Next.js infer it
export default async function Page(props: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
  // Access searchParams from props
  const { searchParams = {} } = props;
  const returnUrl = searchParams.returnUrl || "/dashboard";
  
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect(typeof returnUrl === 'string' ? returnUrl : "/dashboard");
  }
  
  return (
    <div className="">
      <LoginFormWithBg />
    </div>
  );
}