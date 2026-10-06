// Shared page shell for Signup / Login / Forgot password.
// "hero" = left text (optional). children = the white card.
export default function AuthLayout({ hero, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 font-['Plus_Jakarta_Sans'] text-slate-900">
      {/* soft colour blobs */}
      <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-teal-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-10 h-48 w-48 rounded-full bg-amber-500/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-5xl items-center gap-10 px-6 py-10 md:grid-cols-[1fr_380px]">
        <div className={hero ? "" : "hidden md:block"}>
          <Logo />
          {hero}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-teal-600/5">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em]">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-sky-500 text-white">
        <i className="ti ti-sparkles" />
      </span>
      ELEVORA
    </div>
  );
}
