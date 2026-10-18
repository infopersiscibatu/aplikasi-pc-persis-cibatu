import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Berita } from "../data/content";
import { terbitSaja, useBerita } from "../lib/berita";
import { pengumumanTerbaru, usePengumuman } from "../lib/pengumuman";
import { agendaTerdekat, useAgenda } from "../lib/agenda";
import { gridTampil, useBeranda } from "../lib/beranda";

type Hasil = { kunci: string; jenis: string; judul: string; buka: () => void };

export default function PencarianBeranda({
  onPilihMenu,
  onBukaBerita,
}: {
  onPilihMenu: (halaman: string) => void;
  onBukaBerita: (b: Berita) => void;
}) {
  const [q, setQ] = useState("");
  const berita = useBerita();
  const pengumuman = usePengumuman();
  const agenda = useAgenda();
  const menu = gridTampil(useBeranda());

  const hasil = useMemo<Hasil[]>(() => {
    const kata = q.trim().toLowerCase();
    if (kata.length < 2) return [];
    const cocok = (t: string) => t.toLowerCase().includes(kata);
    return [
      ...menu.filter((m) => cocok(m.label)).map((m) => ({ kunci: `m-${m.id}`, jenis: "Menu", judul: m.label, buka: () => onPilihMenu(m.halaman) })),
      ...terbitSaja(berita).filter((b) => cocok(b.title)).map((b) => ({ kunci: `b-${b.id}`, jenis: "Berita", judul: b.title, buka: () => onBukaBerita(b) })),
      ...pengumumanTerbaru(pengumuman, 50).filter((p) => cocok(p.title)).map((p) => ({ kunci: `p-${p.id}`, jenis: "Pengumuman", judul: p.title, buka: () => { window.location.hash = `#/beranda/pengumuman/${p.id}`; } })),
      ...agendaTerdekat(agenda, 50).filter((a) => cocok(a.title)).map((a) => ({ kunci: `a-${a.id}`, jenis: "Agenda", judul: a.title, buka: () => { window.location.hash = `#/beranda/agenda/${a.id}`; } })),
    ].slice(0, 8);
  }, [q, berita, pengumuman, agenda, menu, onPilihMenu, onBukaBerita]);

  return (
    <div className="bg-persis-900 px-5 pt-1 pb-6 rounded-b-[28px]">
      <div className="relative mx-auto w-full max-w-[620px]">
        <label className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.5)]">
          <Search aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-persis-700" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari berita, pengumuman, agenda…"
            aria-label="Cari"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink-900 outline-none placeholder:text-ink-400"
          />
          {q ? (
            <button type="button" aria-label="Hapus pencarian" onClick={() => setQ("")} className="text-ink-400">
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </label>
        {q.trim().length >= 2 ? (
          <ul className="absolute inset-x-0 top-full z-30 mt-2 max-h-[60vh] overflow-y-auto rounded-2xl bg-white p-1.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.45)]">
            {hasil.length === 0 ? (
              <li className="px-3 py-4 text-center text-[12px] text-ink-600">Tidak ada hasil untuk “{q.trim()}”</li>
            ) : (
              hasil.map((h) => (
                <li key={h.kunci}>
                  <button type="button" onClick={() => { setQ(""); h.buka(); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left active:bg-mint-100">
                    <span className="shrink-0 rounded-full bg-mint-100 px-2 py-0.5 text-[9.5px] font-bold text-persis-800">{h.jenis}</span>
                    <span className="line-clamp-1 text-[12.5px] font-medium text-ink-900">{h.judul}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
