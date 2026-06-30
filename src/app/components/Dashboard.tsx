import { useNavigate } from "react-router";
import {
  Wrench,
  Droplets,
  Zap,
  Waves,
  Wind,
  Network,
  ClipboardCheck,
  FileText,
  Camera,
  CalendarDays,
  Bell,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Circle,
} from "lucide-react";
import { MepLogo } from "./MepLogo";

interface PlanCard {
  id: string;
  title: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  route: string;
  progress: number;
  status: "on-track" | "delayed" | "completed";
}

const plans: PlanCard[] = [
  { id: "plumbing", title: "Plumbing", icon: Droplets, iconBg: "bg-cyan-50", iconColor: "text-cyan-600", route: "/plan/plumbing", progress: 75, status: "on-track" },
  { id: "electrical", title: "Electrical", icon: Zap, iconBg: "bg-amber-50", iconColor: "text-amber-600", route: "/plan/electrical", progress: 60, status: "on-track" },
  { id: "pool", title: "Swimming Pool", icon: Waves, iconBg: "bg-teal-50", iconColor: "text-teal-600", route: "/plan/pool", progress: 45, status: "delayed" },
  { id: "hvac", title: "HVAC", icon: Wind, iconBg: "bg-indigo-50", iconColor: "text-indigo-600", route: "/plan/hvac", progress: 70, status: "on-track" },
  { id: "infrastructure", title: "Infrastructure", icon: Network, iconBg: "bg-orange-50", iconColor: "text-orange-600", route: "/plan/infrastructure", progress: 55, status: "on-track" },
];

const milestones = [
  { id: "1", title: "Design Phase", status: "completed", date: "Mar 1" },
  { id: "2", title: "MEP Installation", status: "in-progress", date: "Mar 12" },
  { id: "3", title: "System Testing", status: "upcoming", date: "Mar 25" },
  { id: "4", title: "Project Handover", status: "upcoming", date: "Apr 10" },
];

const quickActions = [
  { id: "inspection", title: "Inspection", icon: ClipboardCheck, color: "text-blue-600", bg: "bg-blue-50", route: "/inspection/design" },
  { id: "meeting", title: "Meeting", icon: FileText, color: "text-purple-600", bg: "bg-purple-50", route: "/meeting-report" },
  { id: "camera", title: "Camera", icon: Camera, color: "text-emerald-600", bg: "bg-emerald-50", route: "/camera" },
  { id: "reports", title: "Reports", icon: CalendarDays, color: "text-orange-600", bg: "bg-orange-50", route: "/reports" },
];

const progressBarColors: Record<string, string> = {
  plumbing: "bg-cyan-500",
  electrical: "bg-amber-500",
  pool: "bg-teal-500",
  hvac: "bg-indigo-500",
  infrastructure: "bg-orange-500",
};

export function Dashboard() {
  const navigate = useNavigate();

  const getMasterPlanProgress = () => {
    const total = plans.reduce((acc, p) => acc + p.progress, 0);
    return Math.round(total / plans.length);
  };

  const progress = getMasterPlanProgress();

  return (
    <div className="size-full bg-slate-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 pt-5 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <MepLogo size="sm" />
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">MEP ENGINEER</h1>
              <p className="text-xs text-slate-500">Project Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              JD
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5 space-y-5">
        {/* Master Progress Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Overall Progress</p>
              <h2 className="text-slate-900 font-bold text-base">Master Plan</h2>
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-2xl font-bold">{progress}%</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #2563EB, #3B82F6)",
              }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">All MEP systems combined</p>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 mb-3 text-sm">Key Milestones</h2>
          <div className="space-y-2">
            {milestones.map((m) => (
              <div key={m.id} className="flex items-center gap-3 py-1.5">
                {m.status === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : m.status === "in-progress" ? (
                  <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{m.title}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-slate-400">{m.date}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      m.status === "completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : m.status === "in-progress"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {m.status === "in-progress" ? "Active" : m.status === "completed" ? "Done" : "Soon"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MEP Systems */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">MEP Systems</h2>
          <div className="grid grid-cols-2 gap-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <button
                  key={plan.id}
                  onClick={() => navigate(plan.route)}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col hover:shadow-md hover:border-blue-100 transition-all active:scale-95 text-left"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`${plan.iconBg} rounded-xl p-2.5`}>
                      <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                    </div>
                    {plan.status === "delayed" ? (
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">Delayed</span>
                    ) : (
                      <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">On Track</span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">{plan.title}</h3>
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Progress</span>
                      <span className="font-bold text-slate-700">{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${progressBarColors[plan.id]}`}
                        style={{ width: `${plan.progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3 pb-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => navigate(action.route)}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex flex-col items-center gap-2 hover:shadow-md hover:border-blue-100 transition-all active:scale-95"
                >
                  <div className={`${action.bg} rounded-xl p-2.5`}>
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{action.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
