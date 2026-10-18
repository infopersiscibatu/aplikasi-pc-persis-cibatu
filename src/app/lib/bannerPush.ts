export type PesanBannerPush = { judul: string; isi: string; url: string };

/** Baca pesan dari service worker; tautan luar diganti ke beranda demi keamanan. */
export function bacaBannerPush(data: unknown, asal: string): PesanBannerPush | null {
  if (!data || typeof data !== "object") return null;
  const d = data as { type?: unknown; payload?: Record<string, unknown> };
  if (d.type !== "PERSIS_PUSH" || !d.payload) return null;
  const judul = typeof d.payload.title === "string" ? d.payload.title.trim() : "";
  if (!judul) return null;
  const isi = typeof d.payload.body === "string" ? d.payload.body : "";
  let url = "/#/beranda";
  if (typeof d.payload.url === "string") {
    try {
      const u = new URL(d.payload.url, asal);
      if (u.origin === asal) url = u.pathname + u.search + u.hash;
    } catch {
      /* abaikan */
    }
  }
  return { judul, isi, url };
}
