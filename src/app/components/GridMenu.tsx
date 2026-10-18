import { gridTampil, useBeranda } from "../lib/beranda";
import { Icon } from "./Icons";

/* Nuansa hijau-emas lembut bergantian, gaya kartu modern. */
const nada = [
  "bg-persis-800 text-white",
  "bg-mint-deep text-persis-900",
  "bg-gold-400 text-persis-950",
  "bg-persis-700 text-white",
];

export default function GridMenu({ onSelect }: { onSelect: (halaman: string) => void }) {
  const menu = gridTampil(useBeranda());

  return (
    <section aria-label="Menu utama" id="menu" className="w-full">
      <h2 className="font-header mb-3 text-[15px] font-bold text-ink-900">Layanan</h2>
      <div className="grid grid-cols-4 gap-2.5">
        {menu.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.halaman)}
            aria-label={m.label}
            data-testid={`menu-${m.halaman}`}
            data-menu-id={m.id}
            className="flex w-full flex-col items-center gap-1.5 rounded-2xl bg-white p-2.5 shadow-[0_4px_14px_-8px_rgba(14,75,43,0.35)] transition active:scale-95"
          >
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${nada[i % nada.length]}`}>
              <Icon name={m.ikon} className="h-[20px] w-[20px]" />
            </span>
            <span className="w-full truncate text-center text-[10px] leading-3 font-semibold text-ink-700">
              {m.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
