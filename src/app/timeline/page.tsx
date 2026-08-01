import { timelineData } from "@/data/timeline";
import { CalendarCheck } from "lucide-react";

export default function TimelinePage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-transparent pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Decorative blur blobs */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-[120px]"></div>

      <div className="max-w-lg mx-auto w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 drop-shadow-md text-white">
            Timeline Pengabdian<br />Berbasis Siklus
          </h1>
          <div className="glass-panel text-white p-5 rounded-2xl font-medium text-sm">
            Langkah-langkah strategis <span className="font-semibold text-secondary">pemberdayaan</span> masyarakat di Desa Sukahaji.
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12 mb-16 pl-6">
          {/* Glowing Vertical Line */}
          <div className="absolute left-[1.125rem] top-2 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/20 to-transparent"></div>

          <div className="flex flex-col gap-12">
            {timelineData.map((cycle) => {
              const Icon = cycle.icon;
              return (
                <div key={cycle.id} className="relative group">
                  {/* Glowing Icon Node */}
                  <div className="absolute -left-10 top-0 w-10 h-10 glass-panel border border-white/30 rounded-full flex items-center justify-center z-10 shadow-lg group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                    <Icon className="w-5 h-5 text-secondary drop-shadow-md" />
                  </div>

                  <div className="pl-6 flex flex-col gap-4">
                    {/* Date Badge */}
                    <div className="self-start glass-panel text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                      {cycle.dateRange}
                    </div>
                    
                    {/* Cycle Name */}
                    <h2 className="font-bold text-xl text-white tracking-wide">
                      {cycle.cycleName}
                    </h2>

                    {/* Content Glass Card */}
                    <div className="glass-card p-6 mt-2 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-purple-500 opacity-70"></div>
                      <h3 className="font-semibold text-lg mb-6 pr-4 text-white">
                        {cycle.title}
                      </h3>
                      
                      <div className="flex flex-col gap-6">
                        {cycle.events.map((event, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                            <CalendarCheck className="w-6 h-6 mt-0.5 text-secondary shrink-0 drop-shadow-sm opacity-90" />
                            <div>
                              <div className="bg-white/10 text-white backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2 border border-white/10">
                                {event.date}
                              </div>
                              <p className="text-sm md:text-base font-normal leading-relaxed text-white/80">
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
