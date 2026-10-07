'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Регистрация — футуристический терминальный экран создания аккаунта.
 */
export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка при регистрации');
        setLoading(false);
        return;
      }

      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Registration error:', err);
      setError('Ошибка сети. Попробуйте позже.');
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
            Создайте
            <br />
            <span className="gradient-text">аккаунт аналитика</span>
          </h1>
          <p className="rise-in rise-in-d2 page-subheading mt-5 max-w-md">
            Полный доступ к юнит-экономике, отчётам по продажам и кластерному
            анализу на Ozon и Wildberries. Регистрация занимает 30 секунд.
          </p>
          <div className="rise-in rise-in-d3 mt-8 grid max-w-md grid-cols-3 gap-4">
            {[
              { v: '30 сек', l: 'регистрация' },
              { v: '0 ₽', l: 'демо-режим' },
              { v: '∞', l: 'отчётов' },
            ].map((m) => (
              <div key={m.l} className="metric-tile">
                <div className="metric-value">{m.v}</div>
                <div className="metric-label mt-1">{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Панель регистрации */}
        <div className="rise-in glass-panel w-full max-w-md p-8">
          <div className="mb-7 text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center gap-2 lg:hidden">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--neon-a),var(--neon-b))] text-[var(--ink-950)] shadow-[0_0_16px_-2px_rgba(0,229,255,0.7)]">◮</span>
              <span className="font-display font-bold text-[var(--text-hi)]">NEBULA</span>
            </div>
            <h2 className="page-heading text-2xl">Регистрация</h2>
            <p className="mt-1.5 text-sm text-[var(--text-dim)]">
              Новый терминальный доступ
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="badge badge-neg !w-full !justify-center !py-2.5 text-[0.8rem]">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.ru"
                className="input-neo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="field-label">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Минимум 6 символов"
                className="input-neo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="field-label">
                Подтвердите пароль
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                className="input-neo"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base"
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[rgba(4,18,29,0.3)] border-t-[#04121d]" />
                  Создание аккаунта…
                </>
              ) : (
                <>
                  Зарегистрироваться <span aria-hidden>→</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-[var(--text-dim)]">Уже есть аккаунт?</span>
            <Link
              href="/login"
              className="font-semibold text-[var(--neon-a)] hover:underline"
            >
              Войти →
            </Link>
          </div>

          <div className="laser-line mt-6" />
          <p className="mt-4 text-center font-mono-tech text-[0.68rem] tracking-wider text-[var(--text-faint)]">
            пароль ≥ 6 символов · bcrypt
          </p>
        </div>
      </div>
    </main>
  );
}