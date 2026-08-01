"use client";

import Link from "next/link";
import { Menu, X, Home, Clock, CalendarCheck } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    // Start page transition effect
    setIsTransitioning(true);
    // Close menu gracefully
    setIsOpen(false);
    
    // Wait for transition animation to cover screen before pushing router
    setTimeout(() => {
      router.push(path);
      // Remove transition overlay after navigation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 600);
  };

  return (
    <>
      {/* Page Transition Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-gradient-to-br from-[#020617] to-primary flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] pointer-events-none ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
        style={{
          clipPath: isTransitioning ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)'
        }}
      >
        <div className="w-20 h-20 relative bg-white/10 rounded-full p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-pulse border border-white/20">
           <Image src="/images/logo/LOGO KKN SISDAMAS 55(1).png" alt="Logo" width={64} height={64} className="object-contain" />
        </div>
      </div>

      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-none bg-black/10">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative bg-white/10 rounded-full p-1.5 backdrop-blur-md shadow-inner group-hover:bg-white/20 transition-all border border-white/10">
              <Image src="/images/logo/LOGO KKN SISDAMAS 55(1).png" alt="Logo" width={36} height={36} className="object-contain" />
            </div>
            <span className="font-bold text-lg tracking-wide text-white drop-shadow-md group-hover:text-primary transition-colors">Lentera Sukahaji</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 font-semibold text-sm text-white/90">
            <button onClick={() => handleNavigate('/')} className="hover:text-primary hover:scale-105 transition-all">Beranda</button>
            <button onClick={() => handleNavigate('/timeline')} className="hover:text-primary hover:scale-105 transition-all">Timeline</button>
            <button onClick={() => handleNavigate('/absensi')} className="hover:text-primary hover:scale-105 transition-all">Absensi</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20 shadow-lg relative z-[60]"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu with Circular Clip-Path Animation */}
      <div 
        className="fixed inset-0 z-40 bg-[#020617]/90 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
        style={{
          clipPath: isOpen ? 'circle(150% at 90% 10%)' : 'circle(0% at 90% 10%)',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        {/* Background decorative orbs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-secondary/20 rounded-full blur-[100px]"></div>

        <div className="flex flex-col gap-5 w-full max-w-sm px-6 relative z-10">
          <button onClick={() => handleNavigate('/')} className="glass-card p-5 rounded-2xl flex items-center gap-5 text-left group hover:bg-white/10 transition-all border border-white/10">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all shadow-inner border border-white/5">
              <Home className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors tracking-wide">Beranda</h3>
              <p className="text-xs text-white/50 font-medium mt-1">Halaman utama portal desa</p>
            </div>
          </button>

          <button onClick={() => handleNavigate('/timeline')} className="glass-card p-5 rounded-2xl flex items-center gap-5 text-left group hover:bg-white/10 transition-all border border-white/10">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-secondary/20 transition-all shadow-inner border border-white/5">
              <Clock className="w-6 h-6 text-white group-hover:text-secondary transition-colors" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white group-hover:text-secondary transition-colors tracking-wide">Timeline</h3>
              <p className="text-xs text-white/50 font-medium mt-1">Jadwal program kerja siklus</p>
            </div>
          </button>

          <button onClick={() => handleNavigate('/absensi')} className="glass-card p-5 rounded-2xl flex items-center gap-5 text-left group hover:bg-white/10 transition-all border border-white/10">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all shadow-inner border border-white/5">
              <CalendarCheck className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors tracking-wide">Absensi</h3>
              <p className="text-xs text-white/50 font-medium mt-1">Isi kehadiran harian KKN</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
