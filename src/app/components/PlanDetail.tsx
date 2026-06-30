import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, Clock, Circle, Calendar, Camera, FileText } from "lucide-react";
import { Button } from "./ui/button";

interface Task {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  date: string;
  phase: string;
}

const planData: Record<string, { title: string; color: string; tasks: Task[] }> = {
  master: {
    title: "Master Plan", color: "bg-blue-500",
    tasks: [
      { id: "1", title: "Site survey and analysis", status: "completed", date: "2026-03-01", phase: "Phase 1" },
      { id: "2", title: "Initial design approval", status: "completed", date: "2026-03-05", phase: "Phase 1" },
      { id: "3", title: "MEP system integration", status: "in-progress", date: "2026-03-12", phase: "Phase 2" },
      { id: "4", title: "Coordination with structural", status: "pending", date: "2026-03-20", phase: "Phase 2" },
      { id: "5", title: "Final documentation", status: "pending", date: "2026-03-30", phase: "Phase 3" },
    ],
  },
  plumbing: {
    title: "Plumbing", color: "bg-cyan-500",
    tasks: [
      { id: "1", title: "Water supply system design", status: "completed", date: "2026-02-20", phase: "Design" },
      { id: "2", title: "Drainage layout approval", status: "completed", date: "2026-03-01", phase: "Design" },
      { id: "3", title: "Pipe installation - Floor 1", status: "in-progress", date: "2026-03-12", phase: "Installation" },
      { id: "4", title: "Fixture installation", status: "pending", date: "2026-03-18", phase: "Installation" },
      { id: "5", title: "Pressure testing", status: "pending", date: "2026-03-25", phase: "Testing" },
    ],
  },
  electrical: {
    title: "Electrical & Communication", color: "bg-amber-500",
    tasks: [
      { id: "1", title: "Power distribution design", status: "completed", date: "2026-02-18", phase: "Design" },
      { id: "2", title: "Cable routing plan", status: "completed", date: "2026-03-01", phase: "Design" },
      { id: "3", title: "Panel installation", status: "in-progress", date: "2026-03-12", phase: "Installation" },
      { id: "4", title: "Network cabling", status: "pending", date: "2026-03-20", phase: "Installation" },
      { id: "5", title: "System commissioning", status: "pending", date: "2026-03-28", phase: "Testing" },
    ],
  },
  pool: {
    title: "Swimming Pool", color: "bg-teal-500",
    tasks: [
      { id: "1", title: "Pool equipment selection", status: "completed", date: "2026-02-25", phase: "Design" },
      { id: "2", title: "Filtration system design", status: "completed", date: "2026-03-05", phase: "Design" },
      { id: "3", title: "Pump installation", status: "in-progress", date: "2026-03-12", phase: "Installation" },
      { id: "4", title: "Chemical dosing system", status: "pending", date: "2026-03-22", phase: "Installation" },
      { id: "5", title: "Water quality testing", status: "pending", date: "2026-03-30", phase: "Testing" },
    ],
  },
  hvac: {
    title: "HVAC", color: "bg-indigo-500",
    tasks: [
      { id: "1", title: "Load calculation", status: "completed", date: "2026-02-22", phase: "Design" },
      { id: "2", title: "Equipment specification", status: "completed", date: "2026-03-03", phase: "Design" },
      { id: "3", title: "Ductwork installation", status: "in-progress", date: "2026-03-12", phase: "Installation" },
      { id: "4", title: "Unit installation", status: "pending", date: "2026-03-19", phase: "Installation" },
      { id: "5", title: "Air balancing", status: "pending", date: "2026-03-27", phase: "Testing" },
    ],
  },
  infrastructure: {
    title: "Infrastructure", color: "bg-orange-500",
    tasks: [
      { id: "1", title: "Underground utility survey", status: "completed", date: "2026-02-10", phase: "Survey" },
      { id: "2", title: "Road and pathway design", status: "completed", date: "2026-03-01", phase: "Design" },
      { id: "3", title: "Storm drainage installation", status: "in-progress", date: "2026-03-12", phase: "Installation" },
      { id: "4", title: "Landscape irrigation", status: "pending", date: "2026-03-20", phase: "Installation" },
      { id: "5", title: "Final site inspection", status: "pending", date: "2026-04-05", phase: "Inspection" },
    ],
  },
};

export function PlanDetail() {
  const navigate = useNavigate();
  const { planType } = useParams<{ planType: string }>();
  const plan = planData[planType || "master"];

  if (!plan) return <div>Plan not found</div>;

  const completed = plan.tasks.filter((t) => t.status === "completed").length;
  const inProgress = plan.tasks.filter((t) => t.status === "in-progress").length;
  const pending = plan.tasks.filter((t) => t.status === "pending").length;
  const progressPct = Math.round((completed / plan.tasks.length) * 100);

  return (
    <div className="size-full bg-slate-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 pt-5 pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">{plan.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5 space-y-4">
        {/* Progress summary */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-900 text-sm">Progress Overview</h2>
            <span className="text-blue-600 font-bold text-lg">{progressPct}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
            <div
              className={`h-2 rounded-full ${plan.color} transition-all duration-700`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-emerald-600">{completed}</p>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">Completed</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
              <p className="text-xs text-blue-700 font-medium mt-0.5">In Progress</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-slate-500">{pending}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Pending</p>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div>
          <h2 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Tasks</h2>
          <div className="space-y-2">
            {plan.tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                <div className="flex items-start gap-3">
                  {task.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : task.status === "in-progress" ? (
                    <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{task.phase}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {task.date}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
                      task.status === "completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : task.status === "in-progress"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {task.status === "in-progress" ? "Active" : task.status === "completed" ? "Done" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/camera")}
            className="h-12 rounded-xl border-slate-200 gap-2 font-medium"
          >
            <Camera className="w-4 h-4" />
            Add Photos
          </Button>
          <Button
            onClick={() => navigate("/meeting-report")}
            className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 gap-2 font-medium shadow-sm shadow-blue-200"
          >
            <FileText className="w-4 h-4" />
            Create Report
          </Button>
        </div>
      </div>
    </div>
  );
}
