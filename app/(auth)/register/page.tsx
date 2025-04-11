// import RegisterWithBg from "@/components/Auth/Register";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import React from "react";

// // Remove the explicit typing and let Next.js infer it
// export default async function RegisterPage(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
//   // Access searchParams from props
//   const { searchParams = {} } = props;
//   const role = searchParams.role;
//   const plan = searchParams.plan;
  
//   const session = await getServerSession(authOptions);
//   if (session) {
//     redirect("/dashboard");
//   }
  
//   return (
//     <div className="">
//       <RegisterWithBg role={role} plan={plan} />
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
