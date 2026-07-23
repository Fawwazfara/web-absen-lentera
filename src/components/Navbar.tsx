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
      <nav className="fixed top-0 w-full bg-white border-b-2 border-black z-50 brutalist-shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image src="/images/logo/LOGO KKN SISDAMAS 55(1).png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight uppercase text-primary">Lentera Sukahaji</span>
          </Link>
          
          {/* Desktop Nav (Hidden on Mobile) */}
          <div className="hidden md:flex gap-6 font-bold uppercase text-sm">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <Link href="/timeline" className="hover:text-primary transition-colors">Timeline</Link>
            <Link href="/absensi" className="hover:text-primary transition-colors">Absensi</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 brutalist-border rounded-none hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="fixed top-16 left-0 w-full bg-white border-b-4 border-black z-40 brutalist-shadow md:hidden flex flex-col font-bold uppercase text-lg">
          <Link href="/" onClick={() => setIsOpen(false)} className="border-b-2 border-black py-4 px-6 hover:bg-secondary transition-colors">Beranda</Link>
          <Link href="/timeline" onClick={() => setIsOpen(false)} className="border-b-2 border-black py-4 px-6 hover:bg-secondary transition-colors">Timeline</Link>
          <Link href="/absensi" onClick={() => setIsOpen(false)} className="py-4 px-6 hover:bg-secondary transition-colors">Absensi</Link>
        </div>
      )}
    </>
  );
}
