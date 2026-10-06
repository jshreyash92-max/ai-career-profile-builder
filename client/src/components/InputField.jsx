import { useState } from "react";

// One input for every form. Shows the states from your design:
// default, focus (Tailwind focus-within), error (red + message), success (green).
export default function InputField({
  label, name, type = "text", icon, value, onChange,
  placeholder, error, success, successText = "Looks good",
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  const border = error
    ? "border-red-400 focus-within:ring-red-100"
    : success
    ? "border-green-300 focus-within:ring-green-100"
    : "border-slate-200 focus-within:border-teal-600 focus-within:ring-teal-600/15";

  return (
    <div className="mt-3">
      <label htmlFor={name} className="mb-1 block text-xs font-medium">{label}</label>
      <div className={`flex h-10 items-center gap-2 rounded-xl border bg-white px-3 text-sm focus-within:ring-4 ${border}`}>
        <i className={`ti ti-${icon} text-lg text-slate-400`} />
        <input
          id={name} name={name} value={value} onChange={onChange}
          type={isPassword && show ? "text" : type} placeholder={placeholder}
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} aria-label="Show password">
            <i className={`ti ti-${show ? "eye-off" : "eye"} text-lg text-slate-400`} />
          </button>
        )}
        {success && !error && <i className="ti ti-circle-check text-lg text-green-500" />}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {success && !error && <p className="mt-1 text-xs text-green-700">{successText}</p>}
    </div>
  );
}
