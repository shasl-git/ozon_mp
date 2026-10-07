'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="btn-danger fixed top-4 right-4 z-50 rounded-full px-4 py-2.5 backdrop-blur group"
      aria-label="Выйти из аккаунта"
    >
      <span className="text-lg group-hover:scale-110 transition-transform">⏻</span>
      <span className="text-sm font-semibold hidden sm:inline">Выйти</span>
    </button>
  );
}