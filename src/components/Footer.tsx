import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20">
      {/* Collaboration Section */}
      <div className="py-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="glass-card p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-fuchsia-500"></div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight drop-shadow-md">Ingin Berkolaborasi<br/>Dengan Kami?</h2>
              <div className="border-l-4 border-white/30 pl-4 mb-6">
                <p className="text-sm md:text-base font-normal text-white/80">
                  Kami membuka pintu lebar-lebar bagi siapapun yang memiliki visi yang sama untuk memajukan potensi desa.
                </p>
              </div>
            </div>
            <a href="https://wa.me/628123456789" className="w-full md:w-auto px-8 py-4 glass-button text-sm md:text-base whitespace-nowrap">
              Hubungi Kami via WA
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="glass-panel py-12 px-4 border-t border-white/10 mt-8 rounded-t-3xl">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 relative bg-white/20 rounded-full p-2 backdrop-blur-md shadow-lg">
              <Image src="/images/logo/LOGO KKN SISDAMAS 55(1).png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="font-bold text-xl tracking-wide">Lentera Sukahaji</span>
          </div>
          <p className="text-sm font-normal mb-8 max-w-sm text-white/80 leading-relaxed">
            Membangun desa melalui digitalisasi & pemberdayaan masyarakat bersama KKN 55 Sukahaji.
          </p>
          <div className="flex gap-6 mb-8 text-sm font-semibold tracking-wide">
            <a href="/" className="hover:text-secondary transition-colors">Beranda</a>
            <a href="/timeline" className="hover:text-secondary transition-colors">Timeline</a>
            <a href="/absensi" className="hover:text-secondary transition-colors">Absensi</a>
          </div>
          
          {/* Social Media Links */}
          <div className="flex gap-4 mb-8">
            <a href="https://www.instagram.com/lenterasukahaji?igsh=MXVwaHZiYXJhNmo2Yw==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 shadow-sm">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@lenterasukahaji?_r=1&_t=ZS-98GbVf0pzq1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 shadow-sm">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          </div>

          <div className="w-full max-w-md h-px bg-white/10 mb-8"></div>
          <p className="text-xs font-semibold tracking-widest text-white/60">
            &copy; {new Date().getFullYear()} KKN 55 Sukahaji. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
