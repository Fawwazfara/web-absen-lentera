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
    <div className="flex flex-col min-h-screen font-sans bg-[#fbf9f1] pt-24 pb-20 px-4">
      <div className="max-w-md mx-auto w-full relative">
        
        {/* Clock & Status Header */}
        <div className="bg-primary p-6 border-2 border-black brutalist-shadow mb-8 relative">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black text-[#a3e635] tracking-tighter drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
              {countdown}
            </h1>
          </div>
          <div className="mt-6 bg-secondary border-2 border-black p-3 flex items-center gap-3 brutalist-shadow-sm">
            <div className={`w-4 h-4 border-2 border-black shrink-0 ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="font-bold text-xs md:text-sm uppercase tracking-tight">
              {statusText}
            </span>
          </div>
        </div>

        {/* Form Section (Hidden if Closed) */}
        {!isOpen ? (
          <div className="bg-white border-2 border-black p-8 flex flex-col items-center text-center brutalist-shadow mt-8">
            <Image 
              src="/images/members/absen-tutup.png" 
              alt="Absen Tutup" 
              width={128} 
              height={128} 
              className="object-contain w-32 h-32 mb-4 drop-shadow-md"
            />
            <h2 className="font-black text-2xl uppercase mb-2">FORM DIKUNCI</h2>
            <p className="font-medium text-sm">
              Formulir absensi hanya dapat diakses pada pukul 09:00 hingga 12:00 setiap harinya. Silakan kembali lagi besok.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 bg-white border-2 border-black p-6 sm:p-8 brutalist-shadow mt-8">
            <div className="flex justify-center w-full mb-2">
              <Image 
                src="/images/members/absen-buka.png" 
                alt="Absen Buka" 
                width={128} 
                height={128} 
                className="object-contain w-32 h-32 drop-shadow-md"
              />
            </div>
            
            {/* Status Toggle */}
            <div className="flex w-full">
              <button 
                onClick={() => setIsHadir(true)}
                className={`flex-1 py-3 font-bold uppercase text-sm border-2 border-black border-r-0 brutalist-shadow-sm transition-colors ${isHadir ? 'bg-primary text-white' : 'bg-white text-black'}`}
              >
                HADIR
              </button>
              <button 
                onClick={() => setIsHadir(false)}
                className={`flex-1 py-3 font-bold uppercase text-sm border-2 border-black brutalist-shadow-sm transition-colors ${!isHadir ? 'bg-primary text-white' : 'bg-white text-black'}`}
              >
                TIDAK HADIR
              </button>
            </div>

            {/* Reason Field (if Tidak Hadir) */}
            {!isHadir && (
              <div className="flex flex-col items-center">
                <label className="font-bold text-sm uppercase tracking-widest mb-3">ALASAN KETIDAKHADIRAN</label>
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full h-24 border-2 border-black p-3 outline-none focus:ring-4 focus:ring-secondary/50 font-medium text-center"
                  placeholder="Tuliskan alasan Anda..."
                />
              </div>
            )}

            {/* PIN Input */}
            <div className="flex flex-col items-center">
              <label className="font-bold text-sm uppercase tracking-widest mb-3">PIN KEHADIRAN</label>
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
                    className="w-14 h-16 border-2 border-black text-center text-3xl font-black outline-none focus:bg-secondary/20 focus:border-black transition-colors"
                    maxLength={1}
                  />
                ))}
              </div>
              <span className="text-xs font-medium uppercase tracking-widest mt-4 opacity-70">
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
                  className="w-full bg-secondary border-2 border-black py-8 flex flex-col items-center justify-center gap-2 brutalist-shadow transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-secondary/90"
                >
                  <Camera className="w-8 h-8 text-black" />
                  <span className="font-bold text-sm uppercase tracking-wider">AMBIL FOTO / SELFIE</span>
                </button>
              ) : (
                <div className="w-full bg-white border-2 border-black p-2 relative brutalist-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoBase64} alt="Preview" className="w-full h-48 object-cover border-2 border-black" />
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => setPhotoBase64(null)}
                      className="bg-red-500 text-white p-2 border-2 border-black hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="bg-green-500 text-white p-2 border-2 border-black">
                      <Check className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notification / Alert */}
            {submitMessage && (
              <div className={`p-4 border-2 border-black font-bold text-center text-sm brutalist-shadow-sm ${submitMessage.type === 'error' ? 'bg-red-200 text-red-900' : 'bg-[#a3e635] text-black'}`}>
                {submitMessage.text}
              </div>
            )}

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-primary text-white border-2 border-black py-4 font-black text-lg uppercase tracking-widest brutalist-shadow transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "MENGIRIM..." : "KIRIM ABSEN"}
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
