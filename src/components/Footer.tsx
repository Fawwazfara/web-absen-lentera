import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      {/* Collaboration Section */}
      <div className="bg-primary text-white py-12 px-4 border-b-2 border-black">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-white text-black p-6 brutalist-border brutalist-shadow">
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-tight">Ingin Berkolaborasi<br/>Dengan Kami?</h2>
            <div className="border-l-4 border-black pl-4 mb-6">
              <p className="text-sm font-medium">
                Kami membuka pintu lebar-lebar bagi siapapun yang memiliki visi yang sama untuk memajukan potensi desa.
              </p>
            </div>
            <a href="https://wa.me/628123456789" className="block w-full bg-secondary text-center py-3 brutalist-button text-sm">
              Hubungi Kami via WA
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-white text-black py-8 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 relative">
              <Image src="/images/logo/placeholder.png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="font-bold uppercase tracking-tight text-primary">Lentera Sukahaji</span>
          </div>
          <p className="text-xs font-medium mb-6 max-w-xs">
            Membangun desa melalui digitalisasi & pemberdayaan masyarakat bersama KKN 55 Sukahaji.
          </p>
          <div className="flex gap-4 mb-6 text-sm font-bold uppercase">
            <a href="/" className="hover:underline">Beranda</a>
            <a href="/timeline" className="hover:underline">Timeline</a>
            <a href="/absensi" className="hover:underline">Absensi</a>
          </div>
          
          {/* Social Media Links */}
          <div className="flex gap-4 mb-6">
            <a href="https://www.instagram.com/lenterasukahaji?igsh=MXVwaHZiYXJhNmo2Yw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary border-2 border-black flex items-center justify-center brutalist-shadow-sm hover:bg-white transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@lenterasukahaji?_r=1&_t=ZS-98GbVf0pzq1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary border-2 border-black flex items-center justify-center brutalist-shadow-sm hover:bg-white transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          </div>

          <div className="w-full h-0.5 bg-black mb-6"></div>
          <p className="text-xs font-bold uppercase bg-secondary px-4 py-2 brutalist-border">
            &copy; {new Date().getFullYear()} KKN 55 Sukahaji. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
