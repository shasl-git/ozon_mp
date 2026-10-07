"use client";

import { useRouter } from "next/navigation";

/**
 * Футуристичная топ-навигация трейдинг-терминала.
 * Бренд NEBULA, опциональная кнопка "назад", кнопка выхода.
 */
export default function TopNav({
  back,
  backLabel = "Назад",
  right,
}: {
  back?: string;
  backLabel?: string;
  right?: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="topnav">
      <button
        onClick={() => router.push("/")}
        className="topnav-brand"
        aria-label="На главную"
      >
        <span className="mark">◮</span>
        <span>NEBULA</span>
      </button>

      <div className="hidden sm:flex items-center gap-1 text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-[var(--text-faint)] ml-2">
        <span className="text-[var(--pos)]">●</span> marketplace analytics
      </div>

      <div className="ml-auto flex items-center gap-2">
        {back && (
          <button
            onClick={() => router.push(back)}
            className="btn-ghost px-3 py-2 text-sm"
          >
            <span aria-hidden>←</span> {backLabel}
          </button>
        )}
        {right}
        <button
          onClick={handleLogout}
          className="btn-danger px-4 py-2 text-sm"
          aria-label="Выйти из аккаунта"
        >
          <span aria-hidden>⏻</span>
          <span className="hidden sm:inline">Выйти</span>
        </button>
      </div>
    </nav>
  );
}