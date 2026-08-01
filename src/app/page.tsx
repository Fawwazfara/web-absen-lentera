import { members } from "@/data/members";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin, Users, Target, CheckCircle2, ChevronRight, Video, Map, Sparkles, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-transparent">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 px-4">
        {/* Landscape Image Background */}
        <div className="absolute inset-0 bg-[url('/images/logo/a_soft_warm_and_inviting_landscape_of_a_beautiful_indonesian_village_at.png')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        {/* Subtle gradient overlay to blend the image into the animated body gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1e1b4b]/90"></div>
        
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center mt-10">
          <div className="glass-panel text-white font-medium px-6 py-2 mb-8 text-sm rounded-full inline-block backdrop-blur-2xl">
            KKN 55 Sukahaji
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-6 leading-tight tracking-tight drop-shadow-2xl relative inline-block">
            <Sparkles className="absolute -top-8 -left-8 w-10 h-10 text-yellow-300 animate-pulse drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
            Lentera Sukahaji
            <Heart className="absolute -bottom-6 -right-8 w-10 h-10 text-pink-400 animate-bounce drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]" />
          </h1>
          
          <div className="glass-card p-6 mb-12 w-full text-center">
            <p className="text-white text-lg font-normal leading-relaxed opacity-90">
              Membangun desa melalui digitalisasi & pemberdayaan masyarakat dengan pendekatan teknologi modern.
            </p>
          </div>
          
          <div className="flex flex-col w-full gap-5 mt-4">
            <Link href="/timeline" className="glass-button py-4 text-center text-sm w-full shadow-2xl">
              Program Kerja Kami
            </Link>
            <a href="#tentang" className="glass-panel text-white hover:bg-white/10 font-medium py-4 text-center text-sm rounded-full transition-all flex items-center justify-center gap-2">
              Tentang Desa <ChevronRight className="w-5 h-5 opacity-70" />
            </a>
          </div>

          <div className="mt-20 w-14 h-14 glass-panel rounded-full flex items-center justify-center animate-bounce shadow-xl cursor-pointer">
            <ArrowDown className="w-7 h-7 text-white/80" />
          </div>
        </div>
      </section>

      {/* Tentang Sukahaji Section */}
      <section id="tentang" className="py-24 px-4 relative overflow-hidden border-t border-b border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="max-w-lg mx-auto w-full relative z-10">
          <div className="glass-card mb-12 relative aspect-square md:aspect-video overflow-hidden group p-2">
            <div className="w-full h-full rounded-[1.25rem] overflow-hidden relative">
              <iframe 
                src="https://maps.google.com/maps?q=Desa+Sukahaji,+Cipeundeuy&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                className="absolute inset-0 w-full h-full border-0" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a href="https://maps.app.goo.gl/MC1epgc7P6ssuWPu8?g_st=ac" target="_blank" rel="noopener noreferrer" className="absolute top-3 right-3 glass-button py-2 px-4 text-xs z-20 shadow-lg">
                Buka di Aplikasi
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <MapPin className="w-8 h-8 text-secondary drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
            <h2 className="text-3xl font-bold tracking-tight drop-shadow-md">
              Tentang Sukahaji
            </h2>
          </div>
          
          <div className="glass-card p-6 mb-10">
            <p className="font-normal text-white/80 leading-relaxed text-lg">
              Desa Sukahaji adalah sebuah desa yang terletak di kecamatan Sukahaji, Kabupaten Majalengka, Jawa Barat. Desa ini memiliki potensi sumber daya alam, pertanian, dan UMKM yang luar biasa yang terus berkembang mengikuti zaman.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a href="https://maps.app.goo.gl/MC1epgc7P6ssuWPu8?g_st=ac" target="_blank" rel="noopener noreferrer" className="w-full glass-panel hover:bg-white/10 text-white font-medium py-4 px-6 text-left text-sm rounded-2xl transition-all flex justify-between items-center group">
              Lokasi (Google Maps) <Map className="w-5 h-5 group-hover:text-secondary transition-colors" />
            </a>
            <button className="w-full glass-panel hover:bg-white/10 text-white font-medium py-4 px-6 text-left text-sm rounded-2xl transition-all flex justify-between items-center group">
              Data Penduduk (2024) <Users className="w-5 h-5 group-hover:text-secondary transition-colors" />
            </button>
            <button className="w-full glass-button hover:bg-white/20 text-white font-semibold py-4 px-6 text-left text-sm rounded-2xl transition-all flex justify-between items-center">
              Potensi Desa (UMKM) <Target className="w-5 h-5" />
            </button>
            <button className="w-full glass-panel hover:bg-white/10 text-white font-medium py-4 px-6 text-left text-sm rounded-2xl transition-all flex justify-between items-center group">
              Profil Desa (Video) <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Decorative blur blobs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/30 rounded-full blur-[120px]"></div>

        <div className="max-w-lg mx-auto w-full relative z-10">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-center drop-shadow-md">
            Visi & Misi
          </h2>
          
          <div className="flex flex-col gap-8">
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-fuchsia-500 to-orange-500"></div>
              <div className="glass-panel text-white/90 text-xs font-semibold px-4 py-1.5 inline-block mb-6 rounded-full">Visi</div>
              <h3 className="font-bold text-2xl mb-4 drop-shadow-sm">Terwujudnya Desa Digital</h3>
              <p className="text-base text-white/80 leading-relaxed font-normal">
                Menciptakan ekosistem masyarakat yang melek teknologi, mandiri secara ekonomi, dan kolaboratif dalam membangun potensi lokal desa.
              </p>
            </div>
            
            <div className="glass-card p-8 relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-500 to-yellow-500"></div>
              <div className="absolute -top-4 right-4 w-12 h-12 glass-panel rounded-full flex items-center justify-center shadow-xl">
                <Target className="w-6 h-6 text-white/80" />
              </div>
              <div className="glass-panel text-white/90 text-xs font-semibold px-4 py-1.5 inline-block mb-6 rounded-full">Misi</div>
              <ul className="space-y-6 text-base font-normal text-white/80">
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 drop-shadow-md" />
                  <span>Pendampingan UMKM lokal untuk go digital secara terpadu.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 drop-shadow-md" />
                  <span>Optimalisasi sistem informasi dan pelayanan publik desa berbasis web.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 drop-shadow-md" />
                  <span>Peningkatan literasi digital bagi pemuda dan masyarakat umum.</span>
                </li>
              </ul>
              <button className="w-full mt-10 glass-panel hover:bg-white/10 text-white font-medium py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group">
                Lihat Program <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Anggota KKN Section */}
      <section className="py-24 px-4 bg-black/10 backdrop-blur-2xl border-t border-white/5">
        <div className="max-w-lg mx-auto w-full">
          <div className="flex items-center justify-center gap-4 mb-10">
            <Users className="w-8 h-8 text-white/80" />
            <h2 className="text-3xl font-bold tracking-tight text-center drop-shadow-md">
              Tim Kami
            </h2>
          </div>
          
          <button className="w-full glass-panel hover:bg-white/10 text-white font-medium py-4 px-6 text-sm rounded-2xl mb-12 transition-all flex justify-between items-center group">
            Pengurus Inti <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-70" />
          </button>
          
          <div className="flex flex-col gap-8">
            {members.map((member) => (
              <div key={member.id} className="glass-card flex flex-col overflow-hidden group">
                <div className="relative aspect-square w-full bg-black/20 overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                     <div className="glass-panel text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-xl">
                      {member.role}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col items-center text-center">
                  <h3 className="font-semibold text-xl tracking-wide">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
