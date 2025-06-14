// // import { getDoctorAppointments } from "@/actions/appointments";
// import { getInboxMessages } from "@/actions/inbox";
// import HomeDisplayCard from "@/components/Dashboard/Doctor/HomeDisplayCard";
import NewButton from "@/components/Dashboard/Doctor/NewButton";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  // Updated to authorize USER, CLIENT, and INDIVIDUALCLIENT roles
  const authorizedRoles = ["USER", "CLIENT", "INDIVIDUALCLIENT"];
  
  if (!user?.role || !authorizedRoles.includes(user.role)) {
    return <NotAuthorized />;
  }
  
  // const messages = (await getInboxMessages(user?.id)).data || [];
  
  return (
    <div>
      <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <NewButton title="New Message" href="/dashboard/user/inbox/new" />
        </div>
      </div>
      {/* <HomeDisplayCard
        title="Message"
        newAppointmentLink="/dashboard/user/inbox/new"
        count={messages.length}
      /> */}
    </div>
  );
}