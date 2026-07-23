const FOLDER_ID = "1bOuf3CBw29_zB7Ud-B72jUfn-3t7I2Pe"; // ID Folder Google Drive Anda
const SPREADSHEET_ID = "1Cml929FG8rhEIkyPLRPL2-SlskZXdfE0IEwVpPbt9xg"; // ID Spreadsheet Anda

function setupIzin() {
  DriveApp.getFiles();
  SpreadsheetApp.openById(SPREADSHEET_ID);
}

function doPost(e) {
  try {
    // 1. Parsing data dari frontend
    const data = JSON.parse(e.postData.contents);
    
    const nama = data.nama;
    const role = data.role;
    const status = data.status; // "HADIR" atau "TIDAK HADIR"
    const alasan = data.alasan || "-";
    const fotoBase64 = data.fotoBase64; 
    
    let fileUrl = "-";

    // 2. Jika ada foto, proses dan simpan ke Google Drive
    if (fotoBase64) {
      // Memisahkan header "data:image/jpeg;base64," dari isi base64
      const splitBase = fotoBase64.split(',');
      const type = splitBase[0].split(';')[0].replace('data:', '');
      const byteCharacters = Utilities.base64Decode(splitBase[1]);
      
      const blob = Utilities.newBlob(byteCharacters, type, `Absen_${nama}_${new Date().getTime()}.jpg`);
      
      const folder = DriveApp.getFolderById(FOLDER_ID);
      const file = folder.createFile(blob);
      
      fileUrl = file.getUrl();
    }
    
    // 3. Masukkan data ke Spreadsheet (Tembak Langsung via ID)
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];

    // Waktu saat ini
    const timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");

    // Format urutan kolom: [Timestamp, Nama, Role, Status, Alasan, Link Foto]
    sheet.appendRow([timestamp, nama, role, status, alasan, fileUrl]);
    
    // 4. Kirim respon berhasil ke frontend
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Absen berhasil dicatat!" 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Jika ada error, kirim pesan error
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle preflight request (CORS) dari browser
function doOptions(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  return ContentService.createTextOutput("").setHeaders(headers);
}
