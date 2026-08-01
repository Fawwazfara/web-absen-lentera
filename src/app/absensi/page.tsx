"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Check, Trash2 } from "lucide-react";
import { members } from "@/data/members";
import { submitAbsen } from "@/lib/submitAbsen";
import Image from "next/image";

export default function AbsensiPage() {
  const [countdown, setCountdown] = useState<string>("00.00.00");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("MENGHITUNG...");
  
  const [isHadir, setIsHadir] = useState<boolean>(true);
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [reason, setReason] = useState<string>("");
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: "error"|"success", text: string} | null>(null);

  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update clock/countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = now.getHours();
      
      const target = new Date(now);
      target.setSeconds(0);
      target.setMilliseconds(0);

      let currentlyOpen = false;
      let text = "";
      
      // Override to keep open for development/testing if needed, but per logic:
      if (h >= 9 && h < 12) {
        currentlyOpen = true;
        target.setHours(12, 0, 0);
        text = "ABSENSI DIBUKA (09:00 - 12:00)";
      } else if (h < 9) { 
        currentlyOpen = false;
        target.setHours(9, 0, 0);
        text = "ABSENSI DIBUKA HARI INI JAM 09:00";
      } else {
        currentlyOpen = false;
        target.setDate(target.getDate() + 1);
        target.setHours(9, 0, 0);
        text = "ABSENSI TUTUP. DIBUKA BESOK JAM 09:00";
      }

      setIsOpen(currentlyOpen);
      setStatusText(text);

      const diffMs = target.getTime() - now.getTime();
      const diffHrs = Math.floor(diffMs / 3600000);
      const diffMins = Math.floor((diffMs % 3600000) / 60000);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);

      setCountdown(
        `${diffHrs.toString().padStart(2, '0')}.${diffMins.toString().padStart(2, '0')}.${diffSecs.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePinChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setSubmitMessage(null); // Clear errors on typing

    // Auto focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSubmitMessage(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitMessage(null);
      
      const pinJoined = pin.join("");
      if (pinJoined.length !== 4) {
        throw new Error("Mohon lengkapi 4 digit PIN Anda.");
      }
      
      if (!isHadir && !reason.trim()) {
        throw new Error("Mohon isi alasan ketidakhadiran.");
      }

      if (isHadir && !photoBase64) {
        throw new Error("Mohon ambil foto/selfie kehadiran.");
      }

      // Find member
      const member = members.find(m => m.pin === pinJoined);
      if (!member) {
        throw new Error("PIN tidak dikenali. Silakan periksa kembali.");
      }

      await submitAbsen({
        nama: member.name,
        role: member.role,
        status: isHadir ? "HADIR" : "TIDAK HADIR",
        alasan: reason,
        fotoBase64: photoBase64
      });

      setSubmitMessage({ type: "success", text: `Terima kasih ${member.name}, absen berhasil!` });
      
      // Reset form
      setPin(["", "", "", ""]);
      setPhotoBase64(null);
      setReason("");

    } catch (err: any) {
      setSubmitMessage({ type: "error", text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-transparent pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Decorative blur blobs */}
      <div className="absolute top-20 left-4 w-40 h-40 bg-secondary/20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-20 right-4 w-60 h-60 bg-primary/40 rounded-full blur-[100px]"></div>

      <div className="max-w-md mx-auto w-full relative z-10">
        
        {/* Clock & Status Header */}
        <div className="glass-card p-8 mb-8 text-center border-t border-l border-white/20">
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg mb-4">
            {countdown}
          </h1>
          <div className="glass-panel p-3 rounded-2xl flex items-center justify-center gap-3 w-fit mx-auto">
            <div className={`w-3 h-3 rounded-full shrink-0 ${isOpen ? 'bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></div>
            <span className="font-semibold text-xs md:text-sm tracking-wide text-white/90">
              {statusText}
            </span>
          </div>
        </div>

        {/* Form Section (Hidden if Closed) */}
        {!isOpen ? (
          <div className="glass-card p-10 flex flex-col items-center text-center mt-8">
            <div className="glass-panel p-6 rounded-full mb-6">
              <Image 
                src="/images/members/absen-tutup.png" 
                alt="Absen Tutup" 
                width={96} 
                height={96} 
                className="object-contain drop-shadow-xl"
              />
            </div>
            <h2 className="font-bold text-2xl mb-3 text-white tracking-wide">Form Dikunci</h2>
            <p className="font-normal text-sm text-white/80 leading-relaxed">
              Formulir absensi hanya dapat diakses pada pukul 09:00 hingga 12:00 setiap harinya. Silakan kembali lagi besok.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 glass-card p-6 sm:p-8 mt-8">
            <div className="flex justify-center w-full mb-2">
              <div className="glass-panel p-4 rounded-full">
                <Image 
                  src="/images/members/absen-buka.png" 
                  alt="Absen Buka" 
                  width={96} 
                  height={96} 
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                />
              </div>
            </div>
            
            {/* Status Toggle */}
            <div className="flex w-full bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
              <button 
                onClick={() => setIsHadir(true)}
                className={`flex-1 py-3 font-semibold text-sm rounded-xl transition-all ${isHadir ? 'glass-panel shadow-lg text-white font-bold' : 'text-white/60 hover:text-white'}`}
              >
                Hadir
              </button>
              <button 
                onClick={() => setIsHadir(false)}
                className={`flex-1 py-3 font-semibold text-sm rounded-xl transition-all ${!isHadir ? 'glass-panel shadow-lg text-white font-bold' : 'text-white/60 hover:text-white'}`}
              >
                Tidak Hadir
              </button>
            </div>

            {/* Reason Field (if Tidak Hadir) */}
            {!isHadir && (
              <div className="flex flex-col items-center">
                <label className="font-bold text-sm uppercase tracking-widest mb-3 text-white/90">ALASAN KETIDAKHADIRAN</label>
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full h-24 glass-panel p-4 rounded-xl outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 font-medium text-center text-white placeholder-white/40 transition-all"
                  placeholder="Tuliskan alasan Anda..."
                />
              </div>
            )}

            {/* PIN Input */}
            <div className="flex flex-col items-center">
              <label className="font-bold text-sm uppercase tracking-widest mb-3 text-white/90">PIN KEHADIRAN</label>
              <div className="flex gap-4">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="password"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(index, e)}
                    className="w-14 h-16 glass-panel rounded-xl text-center text-3xl font-black text-white outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all shadow-inner"
                    maxLength={1}
                  />
                ))}
              </div>
              <span className="text-xs font-medium uppercase tracking-widest mt-4 text-white/60">
                GUNAKAN PIN UNIK ANDA
              </span>
            </div>

            {/* Camera Button */}
            <div className="flex flex-col gap-2">
              <input 
                type="file" 
                accept="image/*" 
                capture="user" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handlePhotoCapture}
              />
              
              {!photoBase64 ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full glass-panel hover:bg-white/20 py-8 rounded-xl flex flex-col items-center justify-center gap-3 transition-all group border-dashed border-2 border-white/40 hover:border-secondary"
                >
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Camera className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wider text-white">AMBIL FOTO / SELFIE</span>
                </button>
              ) : (
                <div className="w-full glass-panel p-2 rounded-xl relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoBase64} alt="Preview" className="w-full h-56 object-cover rounded-lg" />
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => setPhotoBase64(null)}
                      className="bg-red-500/80 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="bg-green-500/80 backdrop-blur-md text-white p-2 rounded-full shadow-lg">
                      <Check className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notification / Alert */}
            {submitMessage && (
              <div className={`p-4 rounded-xl font-bold text-center text-sm shadow-lg backdrop-blur-md ${submitMessage.type === 'error' ? 'bg-red-500/20 text-red-200 border border-red-500/50' : 'bg-green-500/20 text-green-200 border border-green-500/50'}`}>
                {submitMessage.text}
              </div>
            )}

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full glass-button py-4 font-black text-lg uppercase tracking-widest mt-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(250,204,21,0.3)]"
            >
              {isSubmitting ? "MENGIRIM..." : "KIRIM ABSEN"}
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
