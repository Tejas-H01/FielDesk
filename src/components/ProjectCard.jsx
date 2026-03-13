import { Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";

const ProjectCard = ({ project, onClick, isActive }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layoutId={`project-card-${project.id}`}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`group flex h-full cursor-pointer flex-col rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-soft transition duration-200 hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-card active:scale-[0.99] dark:border-ink-800 dark:bg-ink-900 ${
        isActive ? "scale-[0.98] shadow-card" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight text-ink-900 dark:text-white">
            {project.name}
          </h3>
          <p className="text-sm text-slate-300">
            {project.location}
          </p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="mt-5 flex-1 space-y-4 text-sm text-slate-300">
        <div className="flex items-center justify-between">
          <span>Start Date</span>
          <span className="font-semibold text-ink-900 dark:text-white">
            {project.startDate}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Progress</span>
            <span className="font-semibold text-ink-900 dark:text-white">
              {project.progress}%
            </span>
          </div>
          <div className="transition duration-200 group-hover:scale-[1.01] group-hover:brightness-110">
            <ProgressBar value={project.progress} status={project.status} />
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              Last report: {project.lastReportDays}{" "}
              {project.lastReportDays === 1 ? "day" : "days"} ago
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{project.workers} workers</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>View report</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink-200 text-slate-400 transition group-hover:translate-x-1 group-hover:border-brand-300 group-hover:text-brand-500 dark:border-ink-700">
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M7.5 5.5L12.5 10l-5 4.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </motion.button>
  );
};

export default ProjectCard;
