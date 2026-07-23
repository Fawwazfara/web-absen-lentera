import { members } from "@/data/members";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin, Users, Target, CheckCircle2, ChevronRight, Video, Map, Sparkles, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 px-4">
        {/* Landscape Image Background */}
        <div className="absolute inset-0 bg-[url('/images/logo/a_soft_warm_and_inviting_landscape_of_a_beautiful_indonesian_village_at.png')] bg-cover bg-center"></div>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
        
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center mt-10">
          <div className="bg-secondary text-black font-bold uppercase px-4 py-1 border-2 border-black mb-6 text-sm brutalist-shadow-sm">
            KKN 55 Sukahaji
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-6 leading-tight tracking-tight drop-shadow-[0_4px_0_rgba(0,0,0,1)] uppercase relative inline-block">
            <Sparkles className="absolute -top-6 -left-6 w-8 h-8 text-yellow-300 animate-pulse drop-shadow-md" />
            Lentera Sukahaji
            <Heart className="absolute -bottom-4 -right-6 w-8 h-8 text-pink-400 animate-bounce drop-shadow-md" />
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm border-2 border-black p-4 mb-10 w-full brutalist-shadow">
            <p className="text-center text-white font-medium">
              Membangun desa melalui digitalisasi & pemberdayaan.
            </p>
          </div>
          
          <div className="flex flex-col w-full gap-4 mt-4">
            <Link href="/timeline" className="bg-primary text-white border-2 border-black font-bold uppercase py-4 text-center text-sm brutalist-shadow transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
              PROGRAM KERJA KAMI
            </Link>
            <a href="#tentang" className="bg-white text-black border-2 border-black font-bold uppercase py-4 text-center text-sm brutalist-shadow transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2">
              TENTANG DESA <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-16 w-12 h-12 bg-secondary border-2 border-black rounded-full flex items-center justify-center brutalist-shadow-sm animate-bounce">
            <ArrowDown className="w-6 h-6 text-black" />
          </div>
        </div>
      </section>

      {/* Tentang Sukahaji Section */}
      <section id="tentang" className="py-16 px-4 bg-white border-b-4 border-black">
        <div className="max-w-lg mx-auto w-full">
          <div className="border-2 border-black bg-white brutalist-shadow mb-8 relative aspect-square md:aspect-video overflow-hidden group">
            <iframe 
              src="https://maps.google.com/maps?q=Desa+Sukahaji,+Kec.+Sukahaji,+Kabupaten+Majalengka,+Jawa+Barat&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              className="absolute inset-0 w-full h-full border-0" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* Overlay to allow clicking through to the actual maps app by clicking the bottom button instead, but keeping iframe interactive */}
            <a href="https://maps.app.goo.gl/MC1epgc7P6ssuWPu8?g_st=ac" target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 bg-white text-black border-2 border-black font-bold uppercase py-1 px-3 text-xs brutalist-shadow-sm hover:scale-105 transition-transform z-20">
              Buka di Aplikasi
            </a>
          </div>
          
          <h2 className="text-3xl font-black uppercase tracking-tight mb-6 border-b-4 border-black inline-block pb-1">
            TENTANG SUKAHAJI
          </h2>
          
          <div className="border-l-4 border-primary pl-4 mb-8">
            <p className="font-medium text-black/80 leading-relaxed">
              Desa Sukahaji adalah sebuah desa yang terletak di kecamatan Sukahaji, Kabupaten Majalengka, Jawa Barat. Desa ini memiliki potensi sumber daya alam, pertanian, dan UMKM yang luar biasa yang terus berkembang mengikuti zaman.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a href="https://maps.app.goo.gl/MC1epgc7P6ssuWPu8?g_st=ac" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black border-2 border-black font-bold uppercase py-3 px-4 text-left text-sm brutalist-shadow transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none flex justify-between items-center">
              LOKASI (GOOGLE MAPS) <Map className="w-5 h-5" />
            </a>
            <button className="w-full bg-white text-black border-2 border-black font-bold uppercase py-3 px-4 text-left text-sm brutalist-shadow transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none flex justify-between items-center">
              DATA PENDUDUK (2024) <Users className="w-5 h-5" />
            </button>
            <button className="w-full bg-secondary text-black border-2 border-black font-bold uppercase py-3 px-4 text-left text-sm brutalist-shadow transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none flex justify-between items-center">
              POTENSI DESA (UMKM) <Target className="w-5 h-5" />
            </button>
            <button className="w-full bg-primary text-white border-2 border-black font-bold uppercase py-3 px-4 text-left text-sm brutalist-shadow mt-2 transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none flex justify-between items-center">
              PROFIL DESA (VIDEO) <Video className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-16 px-4 bg-secondary border-b-4 border-black">
        <div className="max-w-lg mx-auto w-full">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8 text-center drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-white">
            VISI & MISI
          </h2>
          
          <div className="flex flex-col gap-6">
            <div className="bg-primary text-white p-6 border-2 border-black brutalist-shadow">
              <div className="bg-black text-white text-xs font-bold px-2 py-1 inline-block mb-4 uppercase border border-white/20">Visi</div>
              <h3 className="font-bold text-lg mb-2">Terwujudnya Desa Digital</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Menciptakan ekosistem masyarakat yang melek teknologi, mandiri secara ekonomi, dan kolaboratif dalam membangun potensi lokal desa.
              </p>
            </div>
            
            <div className="bg-white text-black p-6 border-2 border-black brutalist-shadow relative">
              <div className="absolute -top-4 right-4 w-12 h-12 bg-secondary border-2 border-black rounded-full flex items-center justify-center brutalist-shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <div className="bg-black text-white text-xs font-bold px-2 py-1 inline-block mb-4 uppercase">Misi</div>
              <ul className="space-y-3 text-sm font-medium">
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Pendampingan UMKM lokal untuk go digital.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Optimalisasi sistem informasi dan pelayanan desa.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Peningkatan literasi digital bagi pemuda dan masyarakat.</span>
                </li>
              </ul>
              <button className="w-full mt-6 bg-secondary text-black border-2 border-black font-bold uppercase py-3 text-xs brutalist-shadow-sm transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2">
                LIHAT PROGRAM <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Anggota KKN Section */}
      <section className="py-16 px-4 bg-white border-b-4 border-black">
        <div className="max-w-lg mx-auto w-full">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-6 border-b-4 border-black inline-block pb-1">
            ANGGOTA KKN
          </h2>
          
          <button className="w-full bg-black text-white border-2 border-black font-bold uppercase py-3 px-4 text-sm brutalist-shadow-sm mb-10 transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none flex justify-between items-center">
            PENGURUS INTI (KORDES, SEKRET) <ChevronRight className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col gap-6">
            {members.map((member) => (
              <div key={member.id} className="bg-white border-2 border-black brutalist-shadow flex flex-col overflow-hidden">
                <div className="relative aspect-square w-full bg-gray-200 border-b-2 border-black">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <h3 className="font-bold text-lg uppercase">{member.name}</h3>
                  <div className="mt-2 bg-primary text-white text-xs font-bold uppercase px-3 py-1 border border-black">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
