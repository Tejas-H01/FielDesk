import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ isAuthed, onLogout }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/70 bg-white/80 backdrop-blur transition-colors duration-300 dark:border-ink-800/70 dark:bg-ink-900/75">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
            FD
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold leading-tight text-ink-900 dark:text-white">
              FieldDesk
            </p>
            <p className="text-xs text-slate-400">
              Track Projects. Report Progress.
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthed && (
            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive
                    ? "text-brand-500"
                    : "transition hover:text-ink-900 dark:hover:text-white"
                }
              >
                Projects
              </NavLink>
            </nav>
          )}

          <ThemeToggle />

          {isAuthed && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full bg-ink-900 px-3 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ink-700 active:translate-y-0 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
