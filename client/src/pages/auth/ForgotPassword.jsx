import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email");
    setError("");
    // V1: UI only. A real reset email is not part of the first version.
    setSent(true);
  };

  return (
    <AuthLayout>
      {sent ? (
        <div className="py-4 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700"><i className="ti ti-mail-check" /></span>
          <h2 className="mt-3 text-xl font-semibold">Check your email</h2>
          <p className="mt-1 text-sm text-slate-500">If an account exists for {email}, we will send reset steps.</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Forgot password?</h2>
          <p className="mt-1 text-sm text-slate-500">Enter your email and we will help you reset it.</p>
          <form onSubmit={onSubmit} noValidate className="mt-2">
            <InputField label="Email" name="email" icon="mail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" error={error} />
            <PrimaryButton>Send reset link</PrimaryButton>
          </form>
        </>
      )}
      <p className="mt-4 text-center text-xs text-slate-500">
        <Link to="/login" className="font-medium text-teal-700">Back to login</Link>
      </p>
    </AuthLayout>
  );
}
