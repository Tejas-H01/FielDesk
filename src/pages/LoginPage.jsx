import { useState } from "react";
import { Eye, EyeOff, HardHat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/validators";
import ThemeToggle from "../components/ThemeToggle";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateLogin(form);
    setErrors(nextErrors);
    setAuthError("");

    if (Object.keys(nextErrors).length > 0) return;

    if (form.email === "test@test.com" && form.password === "123456") {
      onLogin();
      navigate("/projects");
    } else {
      setAuthError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="page-shell">
      <div className="relative flex min-h-screen w-full flex-col lg:flex-row">
        <div className="absolute right-6 top-6 z-10">
          <ThemeToggle />
        </div>

        <section
          className="blueprint-bg flex w-full flex-col justify-center bg-gradient-to-br from-slate-100 to-brand-50 px-8 py-12 text-ink-900 dark:from-[#0f172a] dark:to-[#0b1220] dark:text-white sm:px-12 lg:w-[58%] lg:pr-16"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.18), transparent 55%)",
          }}
        >
          <div className="space-y-6">
            <div className="mb-12 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#0b1220] text-steel-300 shadow-soft">
                <HardHat className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[1.3rem] font-semibold text-white">
                  FieldDesk
                </p>
                <p className="text-[0.9rem] text-slate-300/80">
                  Operational visibility for every site
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-steel-300">
              Project Control
            </p>
            <div className="space-y-1 font-headline text-[4.6rem] font-semibold leading-[0.95] tracking-[0.02em] text-white">
              <p>BUILD.</p>
              <p>TRACK.</p>
              <p>DELIVER.</p>
            </div>
            <p className="max-w-[420px] text-[0.98rem] text-slate-300/80">
              Sign in to monitor crews, submit DPRs, and keep field execution
              aligned.
            </p>
          </div>
        </section>

        <section
          className="flex w-full items-center bg-[#050b17] px-8 py-12 text-ink-100 sm:px-12 lg:w-[42%]"
        >
          <div className="w-full max-w-md font-ui">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#0b1220] text-steel-300 shadow-soft">
                <HardHat className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[1.2rem] font-semibold text-white">
                  FieldDesk
                </p>
                <p className="text-[0.85rem] text-slate-300/80">
                  Operational visibility for every site
                </p>
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-steel-300">
              Secure Access
            </p>
            <h2 className="mt-3 text-[1.6rem] font-semibold leading-tight text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Access your dashboard and continue managing live sites.
            </p>
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="test@test.com"
                  className={`w-full rounded-2xl border bg-white px-4 py-3 text-[0.95rem] text-ink-800 outline-none transition focus:border-steel-500 focus:ring-2 focus:ring-steel-200 dark:bg-ink-900 dark:text-white dark:focus:ring-steel-500/30 ${
                    errors.email
                      ? "border-danger/60 focus:border-danger focus:ring-danger/20"
                      : "border-ink-200 dark:border-ink-700"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-danger">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="123456"
                    className={`w-full rounded-2xl border bg-white px-4 py-3 pr-12 text-[0.95rem] text-ink-800 outline-none transition focus:border-steel-500 focus:ring-2 focus:ring-steel-200 dark:bg-ink-900 dark:text-white dark:focus:ring-steel-500/30 ${
                      errors.password
                        ? "border-danger/60 focus:border-danger focus:ring-danger/20"
                        : "border-ink-200 dark:border-ink-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-brand-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-danger">{errors.password}</p>
                )}
              </div>

              {authError && <p className="text-xs text-danger">{authError}</p>}

              <button
                type="submit"
                className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold tracking-[0.02em] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 active:scale-[0.98]"
              >
                Login
              </button>
            </form>
            <p className="mt-5 text-xs text-slate-400">
              Demo credentials: test@test.com / 123456
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
