"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import TopNav from "../../components/TopNav";

/**
 * Ozon — командный центр выбора инструмента аналитики.
 */
export default function OzonPage() {
  const router = useRouter();
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [clientId, setClientId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Загружаем сохраненные ключи при монтировании
  useEffect(() => {
    const savedClientId = localStorage.getItem("ozon_client_id");
    const savedApiKey = localStorage.getItem("ozon_api_key");
    if (savedClientId && savedApiKey) {
      setClientId(savedClientId);
      setApiKey(savedApiKey);
      setIsSaved(true);
    }
  }, []);

  const handleSaveKeys = () => {
    if (!clientId || !apiKey) {
      alert("Заполните оба поля");
      return;
    }
    localStorage.setItem("ozon_client_id", clientId);
    localStorage.setItem("ozon_api_key", apiKey);
    setIsSaved(true);
    setShowApiSettings(false);
    alert("Ключи API сохранены");
  };

  const features = [
    {
      title: "Калькулятор юнит-экономики",
      description: "Расчет прибыльности товаров с учетом всех затрат Ozon",
      path: "/ozon/unit-economics",
      icon: "◈",
      code: "UNIT-ECON",
      hue: "cyan" as const,
      needsApi: true, // Нужны API ключи
    },
    {
      title: "Информация по продажам",
      description: "Детальная аналитика продаж и трендов",
      path: "/ozon/sales",
      icon: "⤴",
      code: "SALES",
      hue: "emerald" as const,
      needsApi: true, // Нужны API ключи
    },
    {
      title: "Информация по кластерам",
      description: "Анализ товарных кластеров и категорий",
      path: "/ozon/cluster-analysis",
      icon: "⌗",
      code: "CLUSTERS",
      hue: "amber" as const,
      needsApi: false, // НЕ нужны API ключи!
    },
  ];

  const hueStyles = {
    cyan: {
      text: "text-[var(--neon-a)]",
      bg: "bg-[rgba(0,229,255,0.12)]",
      border: "border-[rgba(0,229,255,0.3)]",
      shadow: "hover:shadow-[0_0_44px_-8px_rgba(0,229,255,0.5)]",
    },
    emerald: {
      text: "text-[var(--pos)]",
      bg: "bg-[rgba(56,245,192,0.1)]",
      border: "border-[rgba(56,245,192,0.3)]",
      shadow: "hover:shadow-[0_0_44px_-8px_rgba(56,245,192,0.45)]",
    },
    amber: {
      text: "text-[var(--warn)]",
      bg: "bg-[rgba(255,209,102,0.1)]",
      border: "border-[rgba(255,209,102,0.3)]",
      shadow: "hover:shadow-[0_0_44px_-8px_rgba(255,209,102,0.45)]",
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
            платформа · ozon seller
          </div>
          <h1 className="page-heading text-4xl sm:text-5xl">
            Ozon <span className="gradient-text text-glow-cyan">Analytics</span>
          </h1>
          <p className="page-subheading mx-auto mt-4 max-w-xl">
            Выберите нужный инструмент для анализа вашего бизнеса на Ozon
          </p>

          {/* Кнопка настроек API */}
          <div className="mt-6">
            <button
              onClick={() => setShowApiSettings(!showApiSettings)}
              className={`badge ${isSaved ? "badge-pos" : "badge-warn"} cursor-pointer px-5 py-2.5 text-[0.8rem]`}
            >
              {isSaved ? "✓ Ключи API настроены" : "⚙ Настроить API ключи"}
            </button>
          </div>
        </div>

        <div className="rise-in rise-in-d1 laser-line mt-8" />

        {/* Модальное окно настроек API */}
        {showApiSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(2,4,10,0.8)] p-4 backdrop-blur-sm">
            <div className="glass-panel w-full max-w-md p-7">
              <div className="panel-heading mb-5">
                <span className="panel-icon">⚙</span>
                Настройки API Ozon
              </div>

              <div className="space-y-4">
                <div>
                  <label className="field-label">Client ID</label>
                  <input
                    type="text"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="input-neo font-mono-tech"
                    placeholder="3011776"
                  />
                </div>

                <div>
                  <label className="field-label">API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="input-neo font-mono-tech"
                    placeholder="e25b2c04-..."
                  />
                </div>

                <div className="text-xs leading-relaxed text-[var(--text-dim)]">
                  🔒 Ключи хранятся только в вашем браузере (localStorage) и не
                  передаются третьим лицам.
                </div>

                <div className="flex gap-3 pt-3">
                  <button onClick={handleSaveKeys} className="btn-primary flex-1 py-3">
                    Сохранить
                  </button>
                  <button
                    onClick={() => setShowApiSettings(false)}
                    className="btn-secondary flex-1 py-3"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Кнопки функционала */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const hue = hueStyles[feature.hue];
            return (
              <button
                key={index}
                onClick={() => {
                  // Проверяем только если нужны API ключи
                  if (feature.needsApi && !isSaved) {
                    alert("Для этого раздела нужны API ключи");
                    setShowApiSettings(true);
                    return;
                  }
                  router.push(feature.path);
                }}
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

                {/* Индикатор нужны ли ключи */}
                {feature.needsApi && !isSaved && (
                  <span className="badge badge-warn mt-4">
                    🔑 Требуются API ключи
                  </span>
                )}

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--neon-a)] transition-all duration-300 group-hover:gap-3.5">
                  Запустить <span aria-hidden>→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Дополнительная информация */}
        <div className="rise-in rise-in-d3 glass-panel mt-12 p-7">
          <div className="panel-heading mb-4">
            <span className="panel-icon">◈</span>
            О аналитике Ozon
          </div>
          <p className="text-sm leading-relaxed text-[var(--text-dim)]">
            Специализированные инструменты для анализа маркетплейса Ozon,
            учитывающие особенности его комиссий, логистики и маркетинговых
            возможностей.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-[var(--text)] sm:grid-cols-2">
            {[
              "Учет специфических комиссий Ozon",
              "Анализ программ продвижения Ozon",
              "Интеграция с логистикой Ozon FBS/FBO",
              "Мониторинг рейтингов и отзывов",
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