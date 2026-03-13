import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, HardHat, ShieldCheck, Users } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const statusOptions = ["All", "Active", "Pending", "Completed"];

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [activeId, setActiveId] = useState(null);
  const stats = useMemo(() => {
    const activeCount = projects.filter(
      (project) => project.status.toLowerCase() === "active"
    ).length;
    const completedCount = projects.filter(
      (project) => project.status.toLowerCase() === "completed"
    ).length;
    const workersToday = projects.reduce(
      (sum, project) => sum + (project.workersToday || 0),
      0
    );
    return {
      activeCount,
      completedCount,
      workersToday,
      reportsToday: 7,
    };
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return projects.filter((project) => {
      const matchesName = project.name.toLowerCase().includes(term);
      const matchesStatus =
        status === "All" ? true : project.status === status;
      return matchesName && matchesStatus;
    });
  }, [search, status]);

  return (
    <div
      className={`page-shell transition-opacity duration-200 ${
        activeId ? "opacity-70" : "opacity-100"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-steel-400">
              Projects
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink-900 dark:text-white sm:text-5xl">
              Your Projects
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Review active construction sites and submit daily progress reports.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-ink-800 dark:bg-ink-900/90 dark:shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-steel-300">
                Active Projects
              </p>
              <ShieldCheck className="h-4 w-4 text-steel-300" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-white">
              {stats.activeCount}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-ink-800 dark:bg-ink-900/90 dark:shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-steel-300">
                Workers On Site
              </p>
              <Users className="h-4 w-4 text-steel-300" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-white">
              {stats.workersToday}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-ink-800 dark:bg-ink-900/90 dark:shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-steel-300">
                Reports Today
              </p>
              <ClipboardCheck className="h-4 w-4 text-steel-300" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-white">
              {stats.reportsToday}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-ink-800 dark:bg-ink-900/90 dark:shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-steel-300">
                Completed Projects
              </p>
              <HardHat className="h-4 w-4 text-steel-300" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-white">
              {stats.completedCount}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-ink-800 bg-ink-900/90 p-4 shadow-soft">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-ink-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-white dark:focus:ring-brand-500/30 sm:w-64"
          />
          <div className="flex flex-wrap gap-3">
            {statusOptions.map((option) => {
              const isActive = status === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatus(option)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-brand-500 text-white shadow-sm"
                      : "bg-white text-slate-400 shadow-sm hover:text-ink-900 dark:bg-ink-900 dark:text-ink-200 border border-slate-200 dark:border-ink-800"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={activeId === project.id}
              onClick={() => {
                if (activeId) return;
                setActiveId(project.id);
                navigate(`/dpr/${project.id}`);
              }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-ink-200 p-6 text-center text-sm text-slate-300 dark:border-ink-700">
            No projects match your search. Try adjusting the filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
