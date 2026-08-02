"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing, Info } from "lucide-react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PwaRegister() {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setPermission("unsupported");
      return;
    }
    
    setPermission(Notification.permission);

    // Initial background sync if already granted
    if (Notification.permission === "granted") {
      syncSubscription();
    }
  }, []);

  const syncSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      if ("PushManager" in window) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await fetch("/api/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: { "Content-Type": "application/json" },
          });
          console.log("Background sync successful");
        }
      }
    } catch (err) {
      console.error("Background sync failed", err);
    }
  };

  const handleSubscribe = async () => {
    if (permission === "denied") {
      alert("Anda telah memblokir notifikasi. Silakan tekan ikon gembok 🔒 di atas browser Anda dan pilih 'Izinkan Notifikasi'.");
      return;
    }

    setIsSubscribing(true);
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm === "granted") {
        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
          const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
          if (publicVapidKey) {
            subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });
          }
        }

        if (subscription) {
          await fetch("/api/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: { "Content-Type": "application/json" },
          });
          alert("Yeay! Notifikasi berhasil diaktifkan. Anda akan menerima pengingat absen setiap hari.");
        }
      }
    } catch (err) {
      console.error("Failed to subscribe:", err);
      alert("Gagal mengaktifkan notifikasi. Pastikan Anda tidak membukanya lewat browser bawaan WA/IG.");
    } finally {
      setIsSubscribing(false);
    }
  };

  if (permission === "granted" || permission === "unsupported") {
    return null; // Sembunyikan jika sudah diizinkan atau tidak didukung
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <button 
        onClick={handleSubscribe}
        disabled={isSubscribing}
        className="glass-card px-4 py-3 flex items-center gap-3 bg-primary/20 hover:bg-primary/40 transition-all shadow-xl group border-primary/30"
      >
        <div className="bg-primary p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
          {isSubscribing ? (
            <BellRing className="w-5 h-5 text-white animate-ping" />
          ) : (
            <Bell className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="flex flex-col text-left">
          <span className="font-bold text-sm text-white drop-shadow-md">Aktifkan Notifikasi</span>
          <span className="text-[10px] text-white/80 font-medium">Klik agar tidak lupa absen</span>
        </div>
      </button>
    </div>
  );
}
