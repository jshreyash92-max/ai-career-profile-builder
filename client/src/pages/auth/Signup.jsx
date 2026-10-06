import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { signupUser } from "../../services/api";

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

const strength = (p) =>
  [
    p.length >= 8,
    /[A-Z]/.test(p),
    /\d/.test(p),
    /[^A-Za-z0-9]/.test(p),
  ].filter(Boolean).length;

const hero = (
  <>
    <h1 className="mt-7 text-3xl font-semibold leading-tight">
      A career profile that speaks your profession.
    </h1>

    <p className="mt-2 max-w-xs text-sm text-slate-500">
      Role-aware AI guidance, shaped around how your field actually hires.
    </p>

    <ul className="mt-5 space-y-2 text-sm text-slate-700">
      {[
        "Profession-specific profile prompts",
        "Resume and CV from one source of truth",
        "Your data stays private by default",
      ].map((t) => (
        <li key={t} className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-700">
            <i className="ti ti-check" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  </>
);

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const score = strength(form.password);

  const barColor = [
    "bg-slate-200",
    "bg-red-400",
    "bg-amber-400",
    "bg-lime-500",
    "bg-green-500",
  ][score];

  const onSubmit = async (e) => {
    e.preventDefault();

    const err = {};

    if (!form.name.trim()) {
      err.name = "Enter your full name";
    }

    if (!emailOk(form.email)) {
      err.email = "Enter a valid email";
    }

    if (form.password.length < 8) {
      err.password = "Use at least 8 characters";
    }

    if (form.password !== form.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    setErrors(err);

    if (Object.keys(err).length) {
      return;
    }

    try {
      setLoading(true);

      await signupUser(form);

      alert("Account created successfully!");

      window.location.href = "/login";
    } catch (error) {
      setErrors({
        general: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout hero={hero}>
      <h2 className="text-xl font-semibold">Create your account</h2>

      <p className="mt-1 text-sm text-slate-500">
        Build a stronger professional profile with AI.
      </p>

      {errors.general && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {errors.general}
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-2">
        <InputField
          label="Full name"
          name="name"
          icon="user"
          value={form.name}
          onChange={onChange}
          placeholder="Alex Morgan"
          error={errors.name}
        />

        <InputField
          label="Email"
          name="email"
          icon="mail"
          value={form.email}
          onChange={onChange}
          placeholder="name@company.com"
          error={errors.email}
          success={emailOk(form.email)}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          icon="lock"
          value={form.password}
          onChange={onChange}
          placeholder="At least 8 characters"
          error={errors.password}
        />

        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className={`h-1.5 flex-1 rounded-full ${
                n <= score ? barColor : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <InputField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          icon="lock"
          value={form.confirmPassword}
          onChange={onChange}
          placeholder="Re-enter your password"
          error={errors.confirmPassword}
        />

        <PrimaryButton
          loading={loading}
          loadingText="Creating account"
        >
          Create account
        </PrimaryButton>
      </form>

      <p className="mt-4 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-teal-700"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}