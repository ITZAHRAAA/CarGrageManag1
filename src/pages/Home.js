import React from "react";
import { 
  CalendarIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  TruckIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ChatBubbleLeftIcon
} from "@heroicons/react/24/outline";

// Mock Link component since react-router-dom is not available
const Link = ({ to, children }) => (
  <a href={to} className="inline-block">
    {children}
  </a>
);

export default function Home({ cars = [] }) {
  const total = cars.length;
  const ready = cars.filter(c => c.status === "Ready" || c.status === "جاهزة").length;
  const inRepair = cars.filter(c => c.status === "In Repair" || c.status === "صيانة").length;
  const upcoming = cars.filter(c => {
    if (!c.nextService) return false;
    const diff = (new Date(c.nextService) - new Date()) / (1000*60*60*24);
    return diff >=0 && diff <= 7;
  });

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400;700&display=swap');
        `}
      </style>
      <main className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-800">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="relative mb-16 min-h-[600px]">
          {/* Centered Main Heading */}
          <div className="text-center mb-12">
            {/* Button above the heading */}
            <div className="mb-6">
              <div className="flex justify-center mt-10">
  <div className="w-40 h-2 bg-yealw-600 rounded-full"></div>
</div>



            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Orbitron, monospace'}}>The Best Place</h1>
            <h2 className="text-1x1 font-light text-blue-800 font-kode">your car deserves</h2>
          </div>

          {/* Centered Car Image */}
          <div className="flex justify-center items-center">
            <img 
              src="/car.webp" 
              alt="Car" 
              className="max-w-md h-auto object-contain rounded-lg"
            />
          </div>

          {/* Stats Cards - Moved to right side */}
          <div className="absolute top-8 right-0 space-y-2 w-30">
            {/* Total Cars Card */}
            <div className="bg-gray-100 border-2 border-gray-500 rounded-full py-1 px-2">
              <div className="flex items-center space-x-4">
                <TruckIcon className="w-6 h-6 text-black" />
                <div>
                  <div className="text-xs font-medium text-gray-900">Total Cars</div>
                  <div className="text-sm font-bold text-gray-900">{total}</div>
                </div>
              </div>
            </div>

            {/* Ready and In Repair Cards */}
            <div className="space-y-2">
              <div className="bg-gray-200 border-2 border-gray-500 rounded-full py-1 px-2">
                <div className="flex items-center space-x-4">
                  <CheckCircleIcon className="w-4 h-4 text-black" />
                  <div>
                    <div className="text-xs font-medium text-gray-900">Ready</div>
                    <div className="text-sm font-bold text-gray-900">{ready}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-300 border-2 border-gray-500 rounded-full py-1 px-4">
                <div className="flex items-center space-x-4">
                  <WrenchScrewdriverIcon className="w-4 h-4 text-black" />
                  <div>
                    <div className="text-xs font-medium text-gray-900">In Repair</div>
                    <div className="text-sm font-bold text-gray-900">{inRepair}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Us Section */}
        <section className="bg-transparent backdrop-blur-md border border-gray rounded-3xl p-12 mb-16 shadow-x4">
          <div className="flex justify-between items-start">
            {/* Left Side - Why Us Content */}
            <div className="w-2/3 pr-12">
              <h3 className="text-4xl font-bold text-black mb-6 ml-4 font-orbitron">Why Us</h3>
              <p className="text-700 text-lg leading-relaxed mb-12 ml-4 font-light">
                We combine expert mechanics, high-quality parts, and reliable service to keep your car at its best.
                Our focus is your safety, satisfaction, and a hassle-free garage experience.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-8">
                {/* Expert Engineers */}
                <div className="bg-transparent">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-200 p-3 rounded-full mr-4">
                      <UserGroupIcon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">Expert Engineers</h4>
                  </div>
                  <p className="text-gray-600 font-light">
                     



                  </p>
                </div>

                {/* Experience Skills */}
                <div className="bg-transparent">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-1000 p-3 rounded-full mr-4">
                      <ClockIcon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">Experience Skills</h4>
                  </div>
                  <p className="text-gray-600 font-light">






                  </p>
                </div>

                {/* Guarantee Service */}
                <div className="bg-transparent">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-1000 p-3 rounded-full mr-4">
                      <WrenchScrewdriverIcon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">Guarantee Service</h4>
                  </div>
                  <p className="text-gray-600 font-light">





                  </p>
                </div>

                {/* Trusted Work */}
                <div className="bg-transparent">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-1000 p-3 rounded-full mr-4">
                      <ShieldCheckIcon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">Trusted Work</h4>
                  </div>
                  <p className="text-gray-600 font-light">







                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Join Us Now */}
            <div className="w-1/3 pl-8 flex flex-col items-center justify-end text-center mt-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Join Us Now</h3>
              <Link to="/add">
                <button className="bg-gray-100 hover:bg-gray-200 border-2 border-white hover:border-gray-300 transition-all duration-300 px-8 py-4 rounded-full shadow-lg flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-800">Start</span>
                  <ArrowRightIcon className="w-6 h-6 text-gray-500" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Services Section */}
        <section className="bg-transparent backdrop-blur-sm border border-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CalendarIcon className="w-8 h-8 text-black mr-3" />
            Upcoming services (7 days)
          </h3>
          {upcoming.length === 0 ? (
            <p className="text-gray-900 text-lg">No upcoming services</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map(c => (
                <li key={c.id} className="bg-gray-50 p-4 rounded-lg text-gray-800">
                  {c.owner} - {c.model} on {c.nextService}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            

            {/* Center - Site Logo/Name with custom font */}
            <div className="text-center">
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <img 
                  src="/ie.png" 
                  alt="Logo" 
                  className="w-12 h-12 object-contain filter brightness-0 invert"
                />
                <div className="text-white">
                  <h3 className="text-lg font-bold" style={{fontFamily: 'Kode Mono, monospace'}}>Car Garage</h3>
                  <p className="text-sm text-white/70" style={{fontFamily: 'Kode Mono, monospace'}}>Management System</p>
                </div>
              </div>
            </div>

            {/* Right - Working Hours */}
            <div className="text-right text-white">

              <p className="text-right">
                Mon-Fri: 8:00AM - 9:00PM
                </p>
            </div>
          </div>

          {/* Social Media Icons - Bottom Left */}
          <div className="flex justify-start w-full mb-4 space-x-4">
            <GlobeAltIcon className="w-6 h-6 text-white hover:text-white/70 transition-colors cursor-pointer" />
            <EnvelopeIcon className="w-6 h-6 text-white hover:text-white/70 transition-colors cursor-pointer" />
            <ChatBubbleLeftIcon className="w-6 h-6 text-white hover:text-white/70 transition-colors cursor-pointer" />
            <PhoneIcon className="w-6 h-6 text-white hover:text-white/70 transition-colors cursor-pointer" />
          </div>

          {/* Copyright - Bottom */}
          <div className="border-t border-white/20 mt-6 pt-4 text-center">
            <p className="text-white/70 text-sm">© 2025 Car Garage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}