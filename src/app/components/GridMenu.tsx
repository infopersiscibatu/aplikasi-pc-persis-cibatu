import { gridTampil, useBeranda } from "../lib/beranda";
import { Icon } from "./Icons";

/* Kartu warna-warni bernuansa hijau seperti kartu tugas pada referensi. */
const nada = [
  "bg-persis-700 text-white",
  "bg-gold-500 text-persis-950",
  "bg-persis-900 text-white",
  "bg-persis-800 text-white",
];

export default function GridMenu({ onSelect }: { onSelect: (halaman: string) => void }) {
  const menu = gridTampil(useBeranda());

  return (
    <section aria-label="Menu utama" id="menu" className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-header text-[16px] font-bold text-ink-900">Layanan</h2>
        <span className="text-[12px] font-medium text-ink-500">{menu.length} menu</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {menu.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.halaman)}
            aria-label={m.label}
            data-testid={`menu-${m.halaman}`}
            data-menu-id={m.id}
            className={`relative flex h-[92px] w-full flex-col justify-end rounded-2xl p-3.5 text-left transition active:scale-[0.97] ${nada[i % nada.length]}`}
          >
            <Icon name={m.ikon} className="absolute top-3 right-3 h-5 w-5 opacity-90" />
            <span className="font-header truncate text-[14px] font-bold">{m.label}</span>
            <span className="text-[10.5px] opacity-80">Ketuk untuk membuka</span>
          </button>
        ))}
      </div>
    </section>
  );
}
