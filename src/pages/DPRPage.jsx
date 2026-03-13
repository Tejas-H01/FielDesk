import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ChevronDown, Cloud, CloudRain, Sun } from "lucide-react";
import ImageUploader from "../components/ImageUploader";
import { projects } from "../data/projects";
import { validateDpr } from "../utils/validators";

const defaultForm = (projectId) => ({
  projectId: projectId || "",
  date: "",
  weather: "",
  description: "",
  workers: "",
  photos: [],
});

const WeatherSelect = ({ value, onChange, options, hasError }) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <div
      className="relative"
      tabIndex={0}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-3 text-sm text-ink-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:bg-ink-900 dark:text-white dark:focus:ring-brand-500/30 ${
          hasError
            ? "border-danger/60 focus:border-danger focus:ring-danger/20"
            : "border-ink-200 dark:border-ink-700"
        }`}
      >
        {selected ? (
          <span className="flex items-center gap-2">
            <selected.Icon className="h-4 w-4 text-slate-400" />
            {selected.label}
          </span>
        ) : (
          <span className="text-ink-400">Select weather</span>
        )}
        <ChevronDown className="h-4 w-4 text-ink-400" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-ink-100 bg-white p-2 shadow-card dark:border-ink-800 dark:bg-ink-900">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              tabIndex={0}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink-700 transition hover:bg-ink-50 dark:text-ink-100 dark:hover:bg-ink-800"
            >
              <option.Icon className="h-4 w-4 text-slate-400" />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DPRPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const activeProject = useMemo(
    () => projects.find((project) => project.id === projectId),
    [projectId]
  );
  const storageKey = `fielddesk_dpr_draft_${projectId || "global"}`;

  const [form, setForm] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        return defaultForm(projectId);
      }
    }
    return {
      ...defaultForm(projectId),
      date: new Date().toISOString().split("T")[0],
    };
  });
  const [errors, setErrors] = useState({});
  const [draftSaved, setDraftSaved] = useState(false);
  const weatherOptions = [
    { value: "Sunny", label: "Sunny", Icon: Sun },
    { value: "Cloudy", label: "Cloudy", Icon: Cloud },
    { value: "Rainy", label: "Rainy", Icon: CloudRain },
  ];
  const updatePhotos = (updater) => {
    setForm((prev) => ({
      ...prev,
      photos: typeof updater === "function" ? updater(prev.photos) : updater,
    }));
  };

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setForm({ ...parsed, projectId });
        return;
      } catch (error) {
        setForm(defaultForm(projectId));
        return;
      }
    }

    setForm({
      ...defaultForm(projectId),
      date: new Date().toISOString().split("T")[0],
    });
  }, [projectId, storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(form));
    setDraftSaved(true);
    const timeoutId = setTimeout(() => setDraftSaved(false), 1400);
    return () => clearTimeout(timeoutId);
  }, [form, storageKey]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateDpr(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    toast.success("DPR submitted successfully.");
    localStorage.removeItem(storageKey);
    setForm({
      ...defaultForm(projectId),
      date: new Date().toISOString().split("T")[0],
    });
    navigate("/projects");
  };

  return (
    <div className="page-shell">
      <motion.div
        layoutId={`project-card-${projectId}`}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-steel-400">
              Daily Progress Report
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink-900 dark:text-white sm:text-5xl">
              {activeProject?.name || "Select a Project"}
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Log on-site work details, conditions, and manpower for the day.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="rounded-full border border-ink-200 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-500 active:translate-y-0 dark:border-ink-700"
          >
            Back to Projects
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-ink-800 dark:bg-ink-900"
        >
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              Project
            </label>
            <input
              type="text"
              readOnly
              value={activeProject?.name || "Unknown Project"}
              className="w-full rounded-2xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm font-semibold text-ink-800 outline-none dark:border-ink-700 dark:bg-ink-800/60 dark:text-white"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              Report Date
            </label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:bg-ink-900 dark:text-white dark:focus:ring-brand-500/30 ${
                  errors.date
                    ? "border-danger/60 focus:border-danger focus:ring-danger/20"
                    : "border-ink-200 dark:border-ink-700"
                }`}
              />
              {errors.date && (
                <p className="text-xs text-danger">{errors.date}</p>
              )}
            </div>

            <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              Weather
            </label>
              <WeatherSelect
                value={form.weather}
                onChange={(value) => setForm((prev) => ({ ...prev, weather: value }))}
                options={weatherOptions}
                hasError={Boolean(errors.weather)}
              />
              {errors.weather && (
                <p className="text-xs text-danger">{errors.weather}</p>
              )}
            </div>

            <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              Worker Count
            </label>
              <input
                name="workers"
                type="number"
                min="0"
                value={form.workers}
                onChange={handleChange}
                placeholder="e.g. 35"
                className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:bg-ink-900 dark:text-white dark:focus:ring-brand-500/30 ${
                  errors.workers
                    ? "border-danger/60 focus:border-danger focus:ring-danger/20"
                    : "border-ink-200 dark:border-ink-700"
                }`}
              />
              <p className="text-xs text-slate-400">
                Include subcontractors and on-site laborers.
              </p>
              {errors.workers && (
                <p className="text-xs text-danger">{errors.workers}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              Work Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Summarize the work completed today."
              className={`w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm text-ink-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:bg-ink-900 dark:text-white dark:focus:ring-brand-500/30 ${
                errors.description
                  ? "border-danger/60 focus:border-danger focus:ring-danger/20"
                  : "border-ink-200 dark:border-ink-700"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-danger">{errors.description}</p>
            )}
          </div>

          <ImageUploader
            photos={form.photos}
            setPhotos={updatePhotos}
            error={errors.photos}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-400">
              Draft auto-saves as you type.
              {draftSaved && (
                <span className="ml-2 font-semibold text-success">
                  Draft saved {"\u2713"}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 active:translate-y-0"
            >
              Submit DPR
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default DPRPage;
