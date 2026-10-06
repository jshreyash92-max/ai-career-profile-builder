import { Link } from "react-router-dom";
import { Logo } from "../../components/AuthLayout";

// Static demo data. Later this will come from the backend / user's real answers.
const nav = [
  ["layout-dashboard", "Dashboard", true],
  ["user", "Profile"],
  ["sparkles", "AI suggestions"],
  ["settings", "Settings"],
];
const suggestions = [
  ["Quantify your impact", "Add a metric to your last two roles.", "Apply"],
  ["Sharpen your headline", "Match the language of your target roles.", "Apply"],
  ["Skill gap spotted", "Add a skill that appears in many target roles.", "Review"],
];
const actions = [
  ["file-import", "Import resume"],
  ["file-text", "Generate CV"],
  ["target", "Tailor to a role"],
  ["share", "Share profile"],
];

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>{children}</div>
);

export default function Dashboard() {
  const completion = 72; // demo value

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans'] text-slate-900">
      {/* Sidebar */}
      <aside className="hidden w-56 flex-col border-r border-slate-200 bg-white p-4 md:flex">
        <Logo />
        <nav className="mt-8 space-y-1">
          {nav.map(([icon, label, on]) => (
            <a key={label} href="#" className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${on ? "bg-teal-50 font-medium text-teal-700" : "text-slate-500 hover:bg-slate-50"}`}>
              <i className={`ti ti-${icon} text-lg`} />{label}
            </a>
          ))}
        </nav>
<button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
  className="mt-auto flex items-center gap-2 px-3 py-2 text-sm text-slate-500"
>
  <i className="ti ti-logout text-lg" />
  Logout
</button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Welcome back, Alex</h1>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-sky-500 text-xs font-medium text-white">AM</span>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Profile completion</span>
              <span className="text-2xl font-semibold text-teal-700">{completion}%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-600 to-sky-500" style={{ width: `${completion}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">4 of 6 sections done</p>
            <button className="mt-3 h-9 w-full rounded-xl bg-gradient-to-br from-teal-600 to-sky-500 text-sm font-medium text-white hover:brightness-110">Complete Profile</button>
          </Card>

          <Card>
            <div className="text-sm font-medium">Career profile</div>
            <div className="mt-2 text-lg font-semibold">Software Developer</div>
            <div className="text-xs text-slate-500">Engineering / IT</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Skills", "Projects", "Internships"].map((c) => (
                <span key={c} className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">{c}</span>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">AI suggestions</span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">3 new</span>
          </div>
          {suggestions.map(([title, text, btn]) => (
            <div key={title} className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><i className="ti ti-sparkles" /></span>
              <div className="flex-1">
                <div className="text-sm font-medium">{title}</div>
                <div className="text-xs text-slate-500">{text}</div>
              </div>
              <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium hover:bg-slate-50">{btn}</button>
            </div>
          ))}
        </Card>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {actions.map(([icon, label]) => (
            <button key={label} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm hover:border-teal-600">
              <i className={`ti ti-${icon} text-lg text-teal-700`} />{label}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
