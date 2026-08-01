"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 relative bg-white/20 rounded-full p-1 backdrop-blur-md">
              <Image src="/images/logo/LOGO KKN SISDAMAS 55(1).png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight uppercase text-white text-glow">Lentera Sukahaji</span>
          </Link>
          
          {/* Desktop Nav (Hidden on Mobile) */}
          <div className="hidden md:flex gap-6 font-bold uppercase text-sm text-white">
            <Link href="/" className="hover:text-secondary transition-colors">Beranda</Link>
            <Link href="/timeline" className="hover:text-secondary transition-colors">Timeline</Link>
            <Link href="/absensi" className="hover:text-secondary transition-colors">Absensi</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#1e1b4b]/60 backdrop-blur-3xl flex flex-col items-center justify-center font-semibold text-2xl text-white transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-8">
          <a href="/" onClick={() => setIsOpen(false)} className="hover:text-secondary hover:scale-110 transition-all tracking-wider drop-shadow-lg">Beranda</a>
          <a href="/timeline" onClick={() => setIsOpen(false)} className="hover:text-secondary hover:scale-110 transition-all tracking-wider drop-shadow-lg">Timeline</a>
          <a href="/absensi" onClick={() => setIsOpen(false)} className="hover:text-secondary hover:scale-110 transition-all tracking-wider drop-shadow-lg">Absensi</a>
        </div>
      </div>
    </>
  );
}
