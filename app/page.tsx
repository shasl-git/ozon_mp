import Link from "next/link";
import { getServerSession } from "../lib/auth";
import { redirect } from "next/navigation";

/**
 * Главная — премиальный хаб выбора маркетплейса (трейдинг-терминал).
 * Редирект на /login делает proxy в middleware; здесь — страховка.
 */
export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const platforms = [
    {
      code: "OZN",
      title: "Ozon",
      tagline: "Аналитика рынка Ozon",
      description:
        "Юнит-экономика, анализ продаж по FBO/FBS и кластерный анализ товаров.",
      href: "/ozon",
      hue: "cyan",
      stat: "96%",
      statLabel: "покрытие отчётов",
    },
    {
      code: "WB",
      title: "Wildberries",
      tagline: "Аналитика рынка WB",
      description:
        "Калькулятор юнит-экономики, анализ продаж и кластеров с учётом специфики WB.",
      href: "/wildberries",
      hue: "violet",
      stat: "×2.4",
      statLabel: "рост выкупов",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Слой-обёртка поверх body-сетки, чтобы контент был выше body::before */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-16">
        {/* Бейдж системы */}
        <div className="rise-in mb-8 flex items-center gap-3 rounded-full border border-[var(--line-strong)] bg-[var(--glass)] px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-dim)] backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-[var(--pos)] shadow-[0_0_10px_var(--pos)]" />
          Платформа аналитики · v2.0
        </div>

        {/* Заголовок */}
        <h1 className="rise-in rise-in-d1 page-heading max-w-4xl text-center text-4xl sm:text-6xl lg:text-7xl">
          Терминал
          <br />
          <span className="gradient-text text-glow-cyan">маркетплейс-данных</span>
        </h1>

        <p className="rise-in rise-in-d2 page-subheading mt-6 max-w-2xl text-center">
          Профессиональная платформа для анализа и оптимизации бизнеса на
          маркетплейсах <strong className="text-[var(--text-hi)]">Ozon</strong> и{" "}
          <strong className="text-[var(--text-hi)]">Wildberries</strong>: юнит-экономика,
          динамика продаж, кластеры и эффективность.
        </p>

        <div className="rise-in rise-in-d2 mt-4 flex items-center gap-2 text-xs font-medium text-[var(--text-faint)]">
          <span>Для кого:</span>
          <span className="badge badge-neutral">продавцы</span>
          <span className="badge badge-neutral">маркетологи</span>
          <span className="badge badge-neutral">аналитики</span>
          <span className="badge badge-neutral">владельцы бизнеса</span>
        </div>

        {/* Лазерный лайнер */}
        <div className="rise-in rise-in-d3 mt-10 w-full max-w-md">
          <div className="laser-line" />
        </div>

        {/* Карточки платформ */}
        <div className="rise-in rise-in-d4 mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {platforms.map((p) => (
            <Link
              key={p.code}
              href={p.href}
              className={`group relative overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--glass)] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_44px_-8px_rgba(0,229,255,0.5)] hover:border-[var(--line-strong)] ${
                p.hue === "violet"
                  ? "hover:shadow-[0_0_44px_-8px_rgba(124,92,255,0.55)]"
                  : ""
              }`}
            >
              {/* Угловой код-тег */}
              <div className="pointer-events-none absolute right-4 top-3 font-mono-tech text-[0.62rem] tracking-[0.3em] text-[var(--text-faint)]">
                {p.code}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl text-lg shadow-[0_0_18px_-2px] ${
                    p.hue === "cyan"
                      ? "bg-[rgba(0,229,255,0.14)] text-[var(--neon-a)] shadow-[rgba(0,229,255,0.55)] border border-[rgba(0,229,255,0.3)]"
                      : "bg-[rgba(124,92,255,0.16)] text-[var(--neon-b)] shadow-[rgba(124,92,255,0.6)] border border-[rgba(124,92,255,0.32)]"
                  }`}
                >
                  {p.code === "OZN" ? "◈" : "❖"}
                </span>
                <div>
                  <div className="font-display text-2xl font-bold text-[var(--text-hi)]">
                    {p.title}
                  </div>
                  <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-dim)]">
                    {p.tagline}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--text-dim)]">
                {p.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <div className="font-mono-tech text-sm text-[var(--text)]">
                  <span
                    className={`text-lg font-bold ${
                      p.hue === "cyan" ? "text-[var(--neon-a)]" : "text-[var(--neon-b)]"
                    }`}
                  >
                    {p.stat}
                  </span>{" "}
                  <span className="text-[var(--text-faint)]">{p.statLabel}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--neon-a)] transition-all duration-300 group-hover:gap-3">
                  Открыть терминал
                  <span aria-hidden>→</span>
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,229,255,0.06),transparent_45%)]" />
              </div>
            </Link>
          ))}
        </div>

        {/* Возможности */}
        <div className="rise-in rise-in-d4 mt-14 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: "◈", title: "Юнит-экономика", text: "Расчёт прибыльности товаров со всеми затратами." },
            { icon: "⤴", title: "Анализ продаж", text: "Динамика и тренды продаж в реальном времени." },
            { icon: "⌗", title: "Кластерный анализ", text: "Группировка товаров для управления остатками." },
          ].map((f, i) => (
            <div
              key={f.title}
              className="glass-card p-5"
              style={{ animation: i ? undefined : undefined }}
            >
              <div className="panel-heading mb-2">
                <span className="panel-icon">{f.icon}</span>
                <span className="text-sm">{f.title}</span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-dim)]">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-2 text-xs text-[var(--text-faint)]">
          <span className="font-mono-tech">NEBULA.OS v2.0</span>
          <span className="h-px w-10 bg-[var(--line-strong)]" />
          <span>данные защищены шифрованием · сессия 7 дней</span>
        </div>
      </div>
    </main>
  );
}