export interface AbsenData {
  nama: string;
  role: string;
  status: "HADIR" | "TIDAK HADIR";
  alasan?: string;
  fotoBase64?: string | null;
}

export async function submitAbsen(data: AbsenData) {
  const SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_SCRIPT_URL;

  if (!SCRIPT_URL) {
    throw new Error("Sistem belum dikonfigurasi dengan baik (URL Apps Script hilang).");
  }

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Handle opaque responses if we are using no-cors
    // BUT since we are setting CORS headers in GAS doOptions, we can read the JSON response.
    const result = await response.json();
    
    if (result.status === "success") {
      return { success: true };
    } else {
      throw new Error(result.message || "Gagal mengirim absen.");
    }
  } catch (error) {
    console.error("Error submitting absen:", error);
    throw new Error("Terjadi kesalahan jaringan atau server.");
  }
}
