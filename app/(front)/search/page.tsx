// This is a server component (no need for "use client" here)

import { getDoctorsBySearch } from "@/actions/doctors";
import DoctorsListWithPagination from "@/components/DoctorsListWithPagination";
import { separateAndCapitalise } from "@/lib/utils";
import { Doctor } from "@/types/types";
import Adverts from "@/components/frontend/Adverts";
import  SearchBarSP  from '@/components/frontend/SearchBarSP';

export default async function SearchPage(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Extract search parameters from props and await them
  const searchParams = await props.searchParams || {};
  
  // Ensure city and profession have default values to prevent errors
  const city = searchParams.city || "";
  const profession = searchParams.profession || "";
    
  try {
    // Fetch doctor data based on city and profession
    const data = await getDoctorsBySearch(city, profession);
    
    // Safely handle potential null/undefined response
    const doctors: Doctor[] = data?.doctors?.map(doc => ({
      id: doc.id || "",
      name: `${doc.firstName || ""} ${doc.lastName || ""}`.trim(),
      email: doc.email || '',
      phone: doc.phone || '',
      slug: doc.slug || "",
      doctorProfile: {
        firstName: doc.firstName || "",
        lastName: doc.lastName || "",
        // Add other relevant fields from doc with non-null fallbacks
        gender: doc.doctorProfile?.gender || null,
        profession: doc.doctorProfile?.profession || null,
        bio: doc.doctorProfile?.bio || null,
        profilePicture: doc.doctorProfile?.profilePicture || null,
        hourlyWage: doc.doctorProfile?.hourlyWage || 0,
        availability: doc.doctorProfile?.availability || null
      }
    })) || [];

    // Format search parameters for display
    const formattedProfession = profession ? separateAndCapitalise(profession) : "";
    const formattedCity = city ? separateAndCapitalise(city) : "";
        
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <SearchBarSP />
        </div>
          
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar - Left Column on Desktop */}
          <div className="lg:col-span-1 order-1">
            {/* Advertisements - Only visible on desktop */}
            <div className="hidden lg:block">
              <Adverts />
            </div>
          </div>
            
          {/* Main Content - Right Column on Desktop, Middle on Mobile */}
          <div className="lg:col-span-4 order-2">
            {/* Doctor Results with pagination */}
            <div className="bg-white rounded-lg shadow p-4">
              {doctors && doctors.length > 0 ? (
                <>
                  <h1 className="text-2xl font-bold mb-6">
                    {formattedCity && formattedProfession
                      ? `Results for ${formattedProfession}s in ${formattedCity}`
                      : formattedCity
                      ? `Professionals in ${formattedCity}`
                      : formattedProfession
                      ? `${formattedProfession}s`
                      : "All professionals"}
                  </h1>
                  {/* Pass fetched doctors data to client-side pagination component */}
                  <DoctorsListWithPagination doctors={doctors} />
                </>
              ) : (
                <div className="text-center py-10">
                  <h2 className="text-xl font-semibold mb-4">
                    {formattedCity && formattedProfession
                      ? `No results found for ${formattedProfession}s in ${formattedCity}.`
                      : formattedCity
                      ? `No professionals found in ${formattedCity}.`
                      : formattedProfession
                      ? `No ${formattedProfession} professionals found.`
                      : "No professionals found."}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Advertisements - Only visible on mobile, at the bottom */}
        <div className="mt-8 lg:hidden">
          <Adverts />
        </div>
      </div>
    );
  } catch (error) {
    // Handle any errors during fetch or data processing
    console.error("Error fetching doctors:", error);
    
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <SearchBarSP />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-4">
              Unable to load results. Please try your search again.
            </h2>
          </div>
        </div>
        
        {/* Advertisements - Mobile view */}
        <div className="mt-8">
          <Adverts />
        </div>
      </div>
    );
  }
}