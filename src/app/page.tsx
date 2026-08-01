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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#064e3b]/80"></div>
        
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center mt-10">
          <div className="glass-panel text-white font-bold uppercase px-6 py-2 mb-8 text-sm rounded-full inline-block backdrop-blur-xl border border-white/30">
            KKN 55 Sukahaji
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white text-center mb-6 leading-tight tracking-tight text-glow uppercase relative inline-block">
            <Sparkles className="absolute -top-8 -left-8 w-10 h-10 text-yellow-300 animate-pulse drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]" />
            Lentera Sukahaji
            <Heart className="absolute -bottom-6 -right-8 w-10 h-10 text-pink-400 animate-bounce drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]" />
          </h1>
          
          <div className="glass-card p-6 mb-12 w-full text-center">
            <p className="text-white text-lg font-medium leading-relaxed">
              Membangun desa melalui digitalisasi & pemberdayaan masyarakat dengan pendekatan teknologi modern.
            </p>
          </div>
          
          <div className="flex flex-col w-full gap-5 mt-4">
            <Link href="/timeline" className="glass-button py-4 text-center text-sm w-full shadow-xl">
              PROGRAM KERJA KAMI
            </Link>
            <a href="#tentang" className="glass-panel text-white hover:bg-white/20 font-bold uppercase py-4 text-center text-sm rounded-full transition-all flex items-center justify-center gap-2 border border-white/40 backdrop-blur-xl">
              TENTANG DESA <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-20 w-14 h-14 glass-panel rounded-full flex items-center justify-center animate-bounce border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <ArrowDown className="w-7 h-7 text-white" />
          </div>
        </div>
      </section>

      {/* Tentang Sukahaji Section */}
      <section id="tentang" className="py-24 px-4 bg-white/5 backdrop-blur-sm border-t border-b border-white/10">
        <div className="max-w-lg mx-auto w-full">
          <div className="glass-card mb-12 relative aspect-square md:aspect-video overflow-hidden group p-2">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <iframe 
                src="https://maps.google.com/maps?q=Desa+Sukahaji,+Cipeundeuy&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                className="absolute inset-0 w-full h-full border-0" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              {/* Overlay to allow clicking through to the actual maps app by clicking the bottom button instead, but keeping iframe interactive */}
              <a href="https://maps.app.goo.gl/MC1epgc7P6ssuWPu8?g_st=ac" target="_blank" rel="noopener noreferrer" className="absolute top-3 right-3 glass-button py-2 px-4 text-xs z-20 shadow-lg">
                Buka di Aplikasi
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <MapPin className="w-8 h-8 text-secondary drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
            <h2 className="text-3xl font-black uppercase tracking-tight text-glow">
              TENTANG SUKAHAJI
            </h2>
          </div>
          
          <div className="glass-card p-6 mb-10">
            <p className="font-medium text-white/90 leading-relaxed text-lg">
              Desa Sukahaji adalah sebuah desa yang terletak di kecamatan Sukahaji, Kabupaten Majalengka, Jawa Barat. Desa ini memiliki potensi sumber daya alam, pertanian, dan UMKM yang luar biasa yang terus berkembang mengikuti zaman.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a href="https://maps.app.goo.gl/MC1epgc7P6ssuWPu8?g_st=ac" target="_blank" rel="noopener noreferrer" className="w-full glass-panel hover:bg-white/10 text-white font-bold uppercase py-4 px-6 text-left text-sm rounded-xl transition-all flex justify-between items-center group">
              LOKASI (GOOGLE MAPS) <Map className="w-5 h-5 group-hover:text-secondary transition-colors" />
            </a>
            <button className="w-full glass-panel hover:bg-white/10 text-white font-bold uppercase py-4 px-6 text-left text-sm rounded-xl transition-all flex justify-between items-center group">
              DATA PENDUDUK (2024) <Users className="w-5 h-5 group-hover:text-secondary transition-colors" />
            </button>
            <button className="w-full glass-button hover:bg-yellow-400 text-black font-bold uppercase py-4 px-6 text-left text-sm rounded-xl transition-all flex justify-between items-center">
              POTENSI DESA (UMKM) <Target className="w-5 h-5" />
            </button>
            <button className="w-full bg-primary/80 backdrop-blur-md hover:bg-primary text-white border border-white/20 font-bold uppercase py-4 px-6 text-left text-sm rounded-xl mt-2 transition-all shadow-lg flex justify-between items-center group">
              PROFIL DESA (VIDEO) <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Decorative blur blobs */}
        <div className="absolute top-0 left-10 w-64 h-64 bg-secondary/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-primary/40 rounded-full blur-[120px]"></div>

        <div className="max-w-lg mx-auto w-full relative z-10">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-12 text-center text-glow">
            VISI & MISI
          </h2>
          
          <div className="flex flex-col gap-8">
            <div className="glass-card p-8 border-l-4 border-l-secondary">
              <div className="glass-panel text-white text-xs font-bold px-3 py-1.5 inline-block mb-6 uppercase rounded-full">Visi</div>
              <h3 className="font-black text-2xl mb-4 text-glow">Terwujudnya Desa Digital</h3>
              <p className="text-base text-white/90 leading-relaxed font-medium">
                Menciptakan ekosistem masyarakat yang melek teknologi, mandiri secara ekonomi, dan kolaboratif dalam membangun potensi lokal desa.
              </p>
            </div>
            
            <div className="glass-card p-8 relative">
              <div className="absolute -top-6 right-6 w-14 h-14 glass-button rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                <Target className="w-7 h-7 text-black" />
              </div>
              <div className="glass-panel text-white text-xs font-bold px-3 py-1.5 inline-block mb-6 uppercase rounded-full">Misi</div>
              <ul className="space-y-5 text-base font-medium text-white/90">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
                  <span>Pendampingan UMKM lokal untuk go digital secara terpadu.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
                  <span>Optimalisasi sistem informasi dan pelayanan publik desa berbasis web.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
                  <span>Peningkatan literasi digital bagi pemuda dan masyarakat umum.</span>
                </li>
              </ul>
              <button className="w-full mt-10 glass-panel hover:bg-white/20 text-white font-bold uppercase py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
                LIHAT PROGRAM <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Anggota KKN Section */}
      <section className="py-24 px-4 bg-black/20 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-lg mx-auto w-full">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Users className="w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            <h2 className="text-3xl font-black uppercase tracking-tight text-center text-glow">
              ANGGOTA KKN
            </h2>
          </div>
          
          <button className="w-full glass-panel hover:bg-white/20 text-white font-bold uppercase py-4 px-6 text-sm rounded-xl mb-12 transition-all flex justify-between items-center group">
            PENGURUS INTI (KORDES, SEKRET) <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex flex-col gap-8">
            {members.map((member) => (
              <div key={member.id} className="glass-card flex flex-col overflow-hidden group">
                <div className="relative aspect-square w-full bg-black/40 overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  {/* Subtle vignette for glass effect */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-t-xl"></div>
                </div>
                <div className="p-6 flex flex-col items-center text-center relative">
                  {/* Floating badge */}
                  <div className="absolute -top-5 bg-gradient-to-r from-secondary to-yellow-400 text-black text-xs font-bold uppercase px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                    {member.role}
                  </div>
                  <h3 className="font-bold text-xl uppercase mt-2 text-glow">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
