"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Авторизация — футуристический терминальный экран входа.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка авторизации");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Сервер недоступен");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12">
        {/* Левый брендинг-блок (на широких экранах) */}
        <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:pr-16">
          <div className="rise-in flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-[var(--text-dim)]">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--neon-a),var(--neon-b))] text-[var(--ink-950)] shadow-[0_0_18px_-2px_rgba(0,229,255,0.7)] text-lg">
              ◮
            </span>
            NEBULA terminal
          </div>
          <h1 className="rise-in rise-in-d1 page-heading mt-6 text-5xl">
            Добро пожаловать
            <br />
            <span className="gradient-text">в аналитику будущего</span>
          </h1>
          <p className="rise-in rise-in-d2 page-subheading mt-5 max-w-md">
            Единый терминал для данных о продажах, юнит-экономике и кластерах на
            Ozon и Wildberries. Синхронизация, отчёты и прогнозы — в одном месте.
          </p>
          <div className="rise-in rise-in-d3 mt-8 grid max-w-md grid-cols-3 gap-4">
            {[
              { v: "12k+", l: "запросов/час" },
              { v: "99.9%", l: "аптайм" },
              { v: "AES-256", l: "шифрование" },
            ].map((m) => (
              <div key={m.l} className="metric-tile">
                <div className="metric-value">{m.v}</div>
                <div className="metric-label mt-1">{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Панель входа */}
        <div className="rise-in glass-panel w-full max-w-md p-8">
          <div className="mb-7 text-center lg:text-left">
            <div className="flex items-center justify-center gap-2 lg:justify-start lg:hidden mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--neon-a),var(--neon-b))] text-[var(--ink-950)] shadow-[0_0_16px_-2px_rgba(0,229,255,0.7)]">◮</span>
              <span className="font-display font-bold text-[var(--text-hi)]">NEBULA</span>
            </div>
            <h2 className="page-heading text-2xl">Авторизация</h2>
            <p className="text-sm text-[var(--text-dim)] mt-1.5">
              Введите данные доступа к терминалу
            </p>
          </div>

          <div className="mb-5 flex items-center gap-2 rounded-lg border border-[rgba(0,229,255,0.25)] bg-[rgba(0,229,255,0.06)] px-3 py-2 text-[0.78rem] text-[var(--neon-a)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--pos)] shadow-[0_0_8px_var(--pos)]" />
            <span className="font-semibold tracking-wide">
              Демо-режим · данные не покидают ваш ноутбук
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.ru"
                className="input-neo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="password">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="input-neo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="badge badge-neg !w-full !justify-center !py-2.5 text-[0.8rem]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base"
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[rgba(4,18,29,0.3)] border-t-[#04121d]" />
                  Подключение…
                </>
              ) : (
                <>
                  Войти в терминал <span aria-hidden>→</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-[var(--text-dim)]">Нет аккаунта?</span>
            <Link
              href="/register"
              className="font-semibold text-[var(--neon-a)] hover:underline"
            >
              Регистрация →
            </Link>
          </div>

          <div className="laser-line mt-6" />
          <p className="mt-4 text-center font-mono-tech text-[0.68rem] tracking-wider text-[var(--text-faint)]">
            JWT · httpOnly · sameSite=lax · 7d
          </p>
        </div>
      </div>
    </main>
  );
}