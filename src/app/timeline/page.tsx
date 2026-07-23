import { timelineData } from "@/data/timeline";
import { CalendarCheck } from "lucide-react";

export default function TimelinePage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#fbf9f1] pt-24 pb-20 px-4">
      <div className="max-w-lg mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
            Timeline Pengabdian<br />Berbasis Siklus
          </h1>
          <div className="bg-secondary text-black p-4 border-2 border-black font-medium text-sm brutalist-shadow-sm">
            Langkah-langkah strategis <span className="font-bold">pemberdayaan</span> masyarakat di Desa Sukahaji.
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12 mb-16 pl-6">
          {/* Vertical Line */}
          <div className="absolute left-[1.125rem] top-2 bottom-0 w-0.5 bg-black"></div>

          <div className="flex flex-col gap-12">
            {timelineData.map((cycle) => {
              const Icon = cycle.icon;
              return (
                <div key={cycle.id} className="relative">
                  {/* Icon Node */}
                  <div className="absolute -left-10 top-0 w-10 h-10 bg-secondary border-2 border-black flex items-center justify-center brutalist-shadow-sm z-10">
                    <Icon className="w-5 h-5 text-black" />
                  </div>

                  <div className="pl-6 flex flex-col gap-3">
                    {/* Date Badge */}
                    <div className="self-start bg-primary text-white text-xs font-bold px-3 py-1 border-2 border-black uppercase">
                      {cycle.dateRange}
                    </div>
                    
                    {/* Cycle Name */}
                    <h2 className="font-bold uppercase text-lg">
                      {cycle.cycleName}
                    </h2>

                    {/* Content Card */}
                    <div className="bg-white border-2 border-black p-5 mt-1 brutalist-shadow">
                      <h3 className="font-bold uppercase text-base mb-6 pr-4">
                        {cycle.title}
                      </h3>
                      
                      <div className="flex flex-col gap-5">
                        {cycle.events.map((event, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <CalendarCheck className="w-5 h-5 mt-0.5 text-black/70 shrink-0" />
                            <div>
                              <div className="bg-[#ffe4e1] text-black text-xs font-bold px-2 py-0.5 inline-block mb-1 border border-black/10">
                                {event.date}
                              </div>
                              <p className="text-sm font-medium leading-snug">
                                {event.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
