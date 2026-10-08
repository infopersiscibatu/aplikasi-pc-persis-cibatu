// @ts-nocheck
/**
 * Pengganti sementara pustaka "web-push" (tidak bisa berjalan di server Lovable).
 * Langganan perangkat tetap tersimpan; pengiriman ke layar HP menyusul.
 */
function acakB64(n) {
  const b = new Uint8Array(n);
  crypto.getRandomValues(b);
  return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export default {
  generateVAPIDKeys() {
    return { publicKey: acakB64(65), privateKey: acakB64(32) };
  },
  setVapidDetails() {},
  async sendNotification() {
    const e = new Error("Pengiriman notifikasi HP belum aktif.");
    e.statusCode = 501;
    throw e;
  },
};
