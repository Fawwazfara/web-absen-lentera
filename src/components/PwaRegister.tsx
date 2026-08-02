"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    const registerPwa = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered");

        if ("PushManager" in window) {
          // Check if already subscribed
          let subscription = await registration.pushManager.getSubscription();
          
          if (!subscription) {
            // Ask for permission and subscribe
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
              if (publicVapidKey) {
                subscription = await registration.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                });
              }
            }
          }

          // Always sync the subscription to our server (in case previous attempts failed)
          if (subscription) {
            await fetch("/api/subscribe", {
              method: "POST",
              body: JSON.stringify(subscription),
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log("Push subscription sync'd with server");
          }
        }
      } catch (err) {
        console.error("SW Registration or Push failed:", err);
      }
    };

    if ("serviceWorker" in navigator) {
      if (document.readyState === "complete") {
        registerPwa();
      } else {
        window.addEventListener("load", registerPwa);
      }
    }
  }, []);

  return null;
}
