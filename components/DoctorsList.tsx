import React from "react";
// import SectionHeading from "./SectionHeading";
// import ToggleButton from "./ToggleButton";
import Link from "next/link";
// import DoctorCard from "./DoctorCard";
import { ArrowUpRight } from "lucide-react";
import DoctorsListCarousel from "./DoctorsListCarousel";
import { Button } from "./ui/button";
// import { User } from "@prisma/client";
import { Doctor } from "@/types/types";
import SectionHeading from "./frontend/SectionHeading";
// import CustomCard from './CustomCard';

export default function DoctorsList({
  title = "top Carers",
  isInPerson,
  className = "bg-pink-100 dark:bg-blue-800 py-8 lg:py-24",
  doctors,
}: {
  title?: string;
  isInPerson?: boolean;
  className?: string;
  doctors: Doctor[];
}) {
  return (
    <div className={className}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
        <SectionHeading title={title} />
        <div className="py-4 flex items-center justify-between">
          
          <Button asChild>
          <Link className=" " href={`/category?mode=${title}`}>
              See All
              <ArrowUpRight className="h-4 w-4 ms-2" />
            </Link>
          </Button>
        </div>
        </div>
        
        <div className="py-6">
          {/* <CustomCard /> */}
          <DoctorsListCarousel doctors={doctors} isInPerson={isInPerson} />
        </div>
      </div>
    </div>
  );
}
