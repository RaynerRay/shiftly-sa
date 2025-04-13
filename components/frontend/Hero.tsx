import React from "react";
import {

  HeartPulse,
  Users,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import TransitionalText from "./TransitionalText";
import SearchBar from './SearchBar';

const Hero = () => {
  const TEXTS = ["Nurses", "Carers", "Social Workers"];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white text-gray-200 md:h-screen">
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-20">
        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <div className="flex flex-col justify-center">
              <h1 className="text-sm sm:text-4xl md:text-5xl font-bold leading-tight md:mb-6 mb-2 ">
                <div className="flex  md:flex-row items-center justify-center md:justify-start">
                  <span className="text-sky-600 md:mr-2 ">Find</span>
                  <TransitionalText
                    className="text-[#FF6847] mx-2"
                    TEXTS={TEXTS}
                  />
                </div>

                <span className="md:block hidden  text-sky-600 mt-2">across the UK</span>
              </h1>

              <p className="text-xs text-sky-800  md:text-lg md:mb-8 mb-2 ">
                Find and book appointments with top healthcare workers across
                the UK.
              </p>

              {/* Feature Icons */}
              {/* Feature Icons */}
              <div className="hidden md:flex justify-center md:justify-start space-x-8 mb-2 ">
                <div className="flex flex-col items-center ">
                  <div className="bg-sky-100 p-3 rounded-full mb-2">
                    <HeartPulse className="text-sky-500 md:w-8 md:h-8 w-4 h-4" />
                  </div>
                  <span className="text-sm text-[#0F3B5C] font-medium">
                    Caring
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-sky-100 p-3 rounded-full mb-2">
                    <Users className="text-sky-500 md:w-8 md:h-8 w-4 h-4" />
                  </div>
                  <span className="text-sm text-[#0F3B5C] font-medium">
                    Professional
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-sky-100 p-3 rounded-full mb-2">
                    <Stethoscope className="text-sky-500 md:w-8 md:h-8 w-4 h-4" />
                  </div>
                  <span className="text-sm text-[#0F3B5C] font-medium">
                    Trusted
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Content */}
          {/* <div className="md:w-1/2 relative">
                        <div className="rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-105">
                            <Image
                                className="w-full h-96 "
                                height={500}
                                width={500}
                                src="/hero.jpg"
                                alt="Healthcare professionals"
                            />
                            
                        </div>
                    </div> */}
          <div className="md:w-1/2 relative">
            <div className="rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-105">
              <div className="relative aspect-w-1 aspect-h-1">
                <Image
                  className="w-full h-full object-cover"
                  height={500}
                  width={500}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="/hero.jpg"
                  alt="Healthcare professionals"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-12">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;

// Claude.....
// import { HeartPulse, Users, Stethoscope, Search } from "lucide-react";
// import Image from "next/image";
// import TransitionalText from "./TransitionalText";
// import SearchBar from './SearchBar';

// const Hero = () => {
//     const TEXTS = ["Nurses", "Carers", "Social Workers"];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#FFE4E0] to-white">
//

//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
//                 <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
//                     {/* Text Content */}
//                     <div className="md:w-1/2 text-center md:text-left">
//                         <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
//                             <span className="text-[#0F3B5C]">Find</span>{" "}
//                             <TransitionalText
//                                 className="text-[#FF6847]"
//                                 TEXTS={TEXTS}
//                             />
//                             <span className="block text-[#0F3B5C] mt-2">across the UK</span>
//                         </h1>

//                         <p className="text-gray-600 text-lg mb-8">
//                             Your health, simplified. Find and book appointments with top healthcare workers across the UK.
//                         </p>

//                         {/* Feature Icons */}
//                         <div className="flex justify-center md:justify-start space-x-8 mb-12">
//                             <div className="flex flex-col items-center">
//                                 <div className="bg-[#FFE4E0] p-3 rounded-full mb-2">
//                                     <HeartPulse className="text-[#FF6847] w-8 h-8" />
//                                 </div>
//                                 <span className="text-sm text-[#0F3B5C] font-medium">Caring</span>
//                             </div>
//                             <div className="flex flex-col items-center">
//                                 <div className="bg-[#FFE4E0] p-3 rounded-full mb-2">
//                                     <Users className="text-[#FF6847] w-8 h-8" />
//                                 </div>
//                                 <span className="text-sm text-[#0F3B5C] font-medium">Professional</span>
//                             </div>
//                             <div className="flex flex-col items-center">
//                                 <div className="bg-[#FFE4E0] p-3 rounded-full mb-2">
//                                     <Stethoscope className="text-[#FF6847] w-8 h-8" />
//                                 </div>
//                                 <span className="text-sm text-[#0F3B5C] font-medium">Trusted</span>
//                             </div>
//                         </div>

//                         {/* Search Bar */}
//                         <div className="bg-white p-4 rounded-xl shadow-lg">
//                             <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//                                 <div className="flex-1">
//                                     <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6847]/20">
//                                         <option>Select location...</option>
//                                     </select>
//                                 </div>
//                                 <div className="flex-1">
//                                     <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6847]/20">
//                                         <option>Care Worker</option>
//                                     </select>
//                                 </div>
//                                 <button className="bg-[#FF6847] text-white px-6 py-2 rounded-lg hover:bg-[#FF6847]/90 transition-colors flex items-center justify-center">
//                                     <Search className="w-5 h-5 mr-2" />
//                                     Search
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Image Content */}
//                     <div className="md:w-1/2">
//                         <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//                             <Image
//                                 className="w-full h-[500px] object-cover"
//                                 height={500}
//                                 width={500}
//                                 src="/hero.jpg"
//                                 alt="Healthcare professional with patient"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-[#0F3B5C]/20 to-transparent" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Hero;
