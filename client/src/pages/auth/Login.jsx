import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { loginUser } from "../../services/api";

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const err = {};

    if (!emailOk(form.email)) {
      err.email = "Enter a valid email";
    }

    if (!form.password) {
      err.password = "Enter your password";
    }

    setErrors(err);

    if (Object.keys(err).length) {
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard";
    } catch (error) {
      setErrors({
        general: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-semibold">Welcome back</h2>

      <p className="mt-1 text-sm text-slate-500">
        Log in to continue building your profile.
      </p>

      {errors.general && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {errors.general}
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-2">
        <InputField
          label="Email"
          name="email"
          icon="mail"
          value={form.email}
          onChange={onChange}
          placeholder="name@company.com"
          error={errors.email}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          icon="lock"
          value={form.password}
          onChange={onChange}
          placeholder="Your password"
          error={errors.password}
        />

        <div className="mt-2 text-right">
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-teal-700"
          >
            Forgot password?
          </Link>
        </div>

        <PrimaryButton loading={loading} loadingText="Signing in">
          Login
        </PrimaryButton>
      </form>

      <p className="mt-4 text-center text-xs text-slate-500">
        New here?{" "}
        <Link
          to="/signup"
          className="font-medium text-teal-700"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}