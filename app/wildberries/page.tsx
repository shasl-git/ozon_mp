"use client";

import { useRouter } from "next/navigation";
import TopNav from "../../components/TopNav";

/**
 * Wildberries — командный центр выбора инструмента аналитики.
 */
export default function WildberriesPage() {
  const router = useRouter();

  const features = [
    {
      title: "Калькулятор юнит-экономики",
      description: "Расчет прибыльности с учетом специфики WB",
      path: "/wildberries/unit-economics",
      icon: "◈",
      code: "UNIT-ECON",
      hue: "violet" as const,
    },
    {
      title: "Информация по продажам",
      description: "Анализ продаж и маркетинговых показателей",
      path: "/wildberries/sales",
      icon: "⤴",
      code: "SALES",
      hue: "pink" as const,
    },
    {
      title: "Информация по кластерам",
      description: "Кластерный анализ товаров Wildberries",
      path: "/wildberries/clusters",
      icon: "⌗",
      code: "CLUSTERS",
      hue: "indigo" as const,
    },
  ];

  const hueStyles = {
    violet: {
      text: "text-[var(--neon-b)]",
      bg: "bg-[rgba(124,92,255,0.14)]",
      border: "border-[rgba(124,92,255,0.32)]",
      shadow: "hover:shadow-[0_0_44px_-8px_rgba(124,92,255,0.5)]",
    },
    pink: {
      text: "text-[var(--neon-c)]",
      bg: "bg-[rgba(255,61,129,0.12)]",
      border: "border-[rgba(255,61,129,0.3)]",
      shadow: "hover:shadow-[0_0_44px_-8px_rgba(255,61,129,0.45)]",
    },
    indigo: {
      text: "text-[#8c83ff]",
      bg: "bg-[rgba(124,141,255,0.14)]",
      border: "border-[rgba(124,141,255,0.32)]",
      shadow: "hover:shadow-[0_0_44px_-8px_rgba(124,141,255,0.5)]",
    },
  };

  return (
    <div className="min-h-screen">
      <TopNav back="/" backLabel="Главная" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10">
        {/* Хедер */}
        <div className="rise-in text-center">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[var(--line-strong)] bg-[var(--glass)] px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-dim)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[var(--pos)] shadow-[0_0_10px_var(--pos)]" />
            платформа · wildberries supplier
          </div>
          <h1 className="page-heading text-4xl sm:text-5xl">
            Wildberries{" "}
            <span className="gradient-text text-glow-soft">Analytics</span>
          </h1>
          <p className="page-subheading mx-auto mt-4 max-w-xl">
            Инструменты для анализа и оптимизации бизнеса на Wildberries
          </p>
        </div>

        <div className="rise-in rise-in-d1 laser-line mt-8" />

        {/* Кнопки функционала */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const hue = hueStyles[feature.hue];
            return (
              <button
                key={index}
                onClick={() => router.push(feature.path)}
                className={`group relative overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--glass)] p-6 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--line-strong)] ${hue.shadow} rise-in rise-in-d${index + 1}`}
              >
                <div className="absolute right-3 top-3 font-mono-tech text-[0.6rem] tracking-[0.25em] text-[var(--text-faint)]">
                  {feature.code}
                </div>

                <span
                  className={`mb-4 grid h-12 w-12 place-items-center rounded-xl border text-xl transition-transform duration-300 group-hover:scale-110 ${hue.bg} ${hue.border} ${hue.text}`}
                >
                  {feature.icon}
                </span>

                <h3 className="font-display text-lg font-bold text-[var(--text-hi)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">
                  {feature.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3.5"
                  style={{ color: feature.hue === "pink" ? "var(--neon-c)" : feature.hue === "violet" ? "var(--neon-b)" : "#8c83ff" }}
                >
                  Запустить <span aria-hidden>→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Дополнительная информация */}
        <div className="rise-in rise-in-d3 glass-panel mt-12 p-7">
          <div className="panel-heading mb-4">
            <span className="panel-icon">❖</span>
            О аналитике Wildberries
          </div>
          <p className="text-sm leading-relaxed text-[var(--text-dim)]">
            Специализированные инструменты для работы с маркетплейсом
            Wildberries, учитывающие особенности его бизнес-модели и требований.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-[var(--text)] sm:grid-cols-2">
            {[
              "Учет комиссий и штрафов WB",
              "Анализ рейтинга продавца",
              "Мониторинг остатков и поставок",
              "Анализ промо-акций и скидок",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] px-3.5 py-2.5"
              >
                <span className="mt-0.5 text-[var(--pos)]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}