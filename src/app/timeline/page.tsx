import { timelineData } from "@/data/timeline";
import { CalendarCheck } from "lucide-react";

export default function TimelinePage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-transparent pt-24 pb-20 px-4">
      <div className="max-w-lg mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 text-glow text-white">
            Timeline Pengabdian<br />Berbasis Siklus
          </h1>
          <div className="glass-panel text-white p-5 rounded-2xl font-medium text-sm">
            Langkah-langkah strategis <span className="font-bold text-secondary">pemberdayaan</span> masyarakat di Desa Sukahaji.
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12 mb-16 pl-6">
          {/* Glowing Vertical Line */}
          <div className="absolute left-[1.125rem] top-2 bottom-0 w-0.5 bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>

          <div className="flex flex-col gap-12">
            {timelineData.map((cycle) => {
              const Icon = cycle.icon;
              return (
                <div key={cycle.id} className="relative group">
                  {/* Glowing Icon Node */}
                  <div className="absolute -left-10 top-0 w-10 h-10 glass-panel border border-white/50 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(250,204,21,0.5)] group-hover:scale-110 group-hover:bg-white/20 transition-all">
                    <Icon className="w-5 h-5 text-secondary drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
                  </div>

                  <div className="pl-6 flex flex-col gap-4">
                    {/* Date Badge */}
                    <div className="self-start glass-button text-black text-xs font-bold px-4 py-1.5 uppercase">
                      {cycle.dateRange}
                    </div>
                    
                    {/* Cycle Name */}
                    <h2 className="font-bold uppercase text-xl text-white text-glow">
                      {cycle.cycleName}
                    </h2>

                    {/* Content Glass Card */}
                    <div className="glass-card p-6 mt-2">
                      <h3 className="font-bold uppercase text-lg mb-6 pr-4 text-white">
                        {cycle.title}
                      </h3>
                      
                      <div className="flex flex-col gap-6">
                        {cycle.events.map((event, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                            <CalendarCheck className="w-6 h-6 mt-0.5 text-secondary shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.6)]" />
                            <div>
                              <div className="bg-white/10 text-white backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full inline-block mb-2 border border-white/20">
                                {event.date}
                              </div>
                              <p className="text-sm md:text-base font-medium leading-relaxed text-white/90">
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
