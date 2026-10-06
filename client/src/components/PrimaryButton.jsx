// Gradient button with hover, pressed (active) and loading states.
export default function PrimaryButton({ children, loading, loadingText = "Please wait", ...props }) {
  return (
    <button
      disabled={loading}
      className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-teal-600 to-sky-500 text-sm font-medium text-white shadow-lg shadow-teal-600/25 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
      {...props}
    >
      {loading ? (<><i className="ti ti-loader-2 animate-spin" />{loadingText}</>) : children}
    </button>
  );
}
