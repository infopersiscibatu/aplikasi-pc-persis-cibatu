import { navTampil, useBeranda } from "../lib/beranda";
import { Icon } from "./Icons";

export type TabId = "beranda" | "berita" | "ppdb" | "artikel" | "info";

export default function BottomNav({ active, onChange }: { active: string | null; onChange: (t: string) => void }) {
  const tab = navTampil(useBeranda());

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 px-4" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <ul
        className="mx-auto grid w-full max-w-[460px] gap-1 rounded-full bg-white p-1.5 shadow-[0_12px_32px_-12px_rgba(14,75,43,0.45)]"
        style={{
          gridTemplateColumns: `repeat(${Math.max(tab.length, 1)}, minmax(0, 1fr))`,
        }}
      >
        {tab.map((t) => {
          const ini = active === t.halaman;
          return (
            <li key={t.halaman}>
              <button
                type="button"
                onClick={() => onChange(t.halaman)}
                aria-current={ini ? "page" : undefined}
                data-testid={`nav-${t.halaman}`}
                className={`flex h-11 w-full items-center justify-center gap-1.5 rounded-full transition active:scale-95 ${
                  ini ? "bg-persis-900 text-white" : "text-ink-400"
                }`}
              >
                <Icon name={t.ikon} className="h-[20px] w-[20px] shrink-0" />
                <span className={ini ? "text-[11px] font-bold" : "sr-only"}>{t.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Menu bawah khusus portal wali santri. */
export const tabWali = [
  { id: "beranda", label: "Beranda", icon: "home" },
  { id: "nilai", label: "Nilai", icon: "clipboard" },
  { id: "tagihan", label: "Tagihan", icon: "wallet" },
  { id: "tahfidz", label: "Tahfidz", icon: "book-open" },
  { id: "profil", label: "Profil", icon: "user" },
] as const;

export type TabWali = (typeof tabWali)[number]["id"];
export type TabWaliIsi = Exclude<TabWali, "beranda">;

/**
 * Portal wali santri punya menunya sendiri: Beranda kembali ke situs utama,
 * sedangkan Nilai, Tagihan, Tahfidz, dan Profil pindah bagian di portal.
 */
export function BottomNavWali({
  active,
  onPilih,
  onBeranda,
}: {
  active: TabWali;
  onPilih: (t: TabWaliIsi) => void;
  onBeranda: () => void;
}) {
  return (
    <nav
      aria-label="Navigasi portal wali"
      className="fixed inset-x-0 bottom-0 z-40 px-4" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <ul
        className="mx-auto grid w-full max-w-[460px] grid-cols-5 gap-1 rounded-full bg-white p-1.5 shadow-[0_12px_32px_-12px_rgba(14,75,43,0.45)]"
      >
        {tabWali.map((t) => {
          const ini = active === t.id;
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => (t.id === "beranda" ? onBeranda() : onPilih(t.id))}
                aria-current={ini ? "page" : undefined}
                data-testid={`nav-wali-${t.id}`}
                className={`flex h-11 w-full items-center justify-center gap-1.5 rounded-full transition active:scale-95 ${
                  ini ? "bg-persis-900 text-white" : "text-ink-400"
                }`}
              >
                <Icon name={t.icon} className="h-[20px] w-[20px] shrink-0" />
                <span className={ini ? "text-[11px] font-bold" : "sr-only"}>{t.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
