// import Head from "next/head";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <div>
     
      <Navbar 
      session={session}
       />
      {children}
      <Footer />
    </div>
  );
}
