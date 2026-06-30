import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, FileText, Calendar, ChevronRight, Download, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Report {
  id: string;
  title: string;
  date: string;
  summary: string;
  status: "draft" | "submitted";
}

const dailyReports: Report[] = [
  { id: "d1", title: "Daily Report - March 12", date: "2026-03-12", summary: "Completed HVAC ductwork on Floor 2. Electrical panel testing in progress.", status: "submitted" },
  { id: "d2", title: "Daily Report - March 11", date: "2026-03-11", summary: "Plumbing rough-in completed. Started electrical conduit installation.", status: "submitted" },
  { id: "d3", title: "Daily Report - March 10", date: "2026-03-10", summary: "Site preparation and material delivery. MEP coordination meeting held.", status: "submitted" },
];

const weeklyReports: Report[] = [
  { id: "w1", title: "Weekly Report - Week 11", date: "2026-03-16", summary: "Overall progress: 65%. All MEP systems on schedule. Minor delays in electrical testing.", status: "draft" },
  { id: "w2", title: "Weekly Report - Week 10", date: "2026-03-09", summary: "HVAC system 80% complete. Plumbing fixtures installed. Communication cabling in progress.", status: "submitted" },
];

const monthlyReports: Report[] = [
  { id: "m1", title: "Monthly Report - March 2026", date: "2026-03-31", summary: "Project milestone: MEP rough-in 70% complete. Budget variance: -2%. Schedule: On track.", status: "draft" },
  { id: "m2", title: "Monthly Report - February 2026", date: "2026-02-28", summary: "Design phase completed. All MEP systems approved. Installation commenced.", status: "submitted" },
];

const dailyProgressData = [
  { date: "Mar 8", planned: 90, actual: 88 },
  { date: "Mar 9", planned: 91, actual: 89 },
  { date: "Mar 10", planned: 92, actual: 92 },
  { date: "Mar 11", planned: 93, actual: 93 },
  { date: "Mar 12", planned: 94, actual: 95 },
];

const weeklyProgressData = [
  { week: "Wk 7", planned: 70, actual: 68 },
  { week: "Wk 8", planned: 75, actual: 74 },
  { week: "Wk 9", planned: 80, actual: 82 },
  { week: "Wk 10", planned: 85, actual: 87 },
  { week: "Wk 11", planned: 90, actual: 88 },
];

const monthlyProgressData = [
  { month: "Nov", planned: 40, actual: 38 },
  { month: "Dec", planned: 50, actual: 48 },
  { month: "Jan", planned: 60, actual: 62 },
  { month: "Feb", planned: 70, actual: 72 },
  { month: "Mar", planned: 80, actual: 78 },
];

function ProgressChart({ data }: { data: Array<{ [key: string]: string | number }> }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <h3 className="font-bold text-slate-900 text-sm mb-4">Work Progress vs. Plan</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={10}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey={Object.keys(data[0])[0]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: 12, fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="planned" fill="#BFDBFE" name="Planned" radius={[4, 4, 0, 0]} />
          <Bar dataKey="actual" fill="#2563EB" name="Actual" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ActionButtons({ onGeneratePDF, onShare }: { onGeneratePDF: () => void; onShare: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onGeneratePDF}
        className="h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center gap-2 text-slate-700 text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-colors"
      >
        <Download className="w-4 h-4 text-blue-600" />
        Generate PDF
      </button>
      <button
        onClick={onShare}
        className="h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center gap-2 text-slate-700 text-sm font-medium hover:border-purple-300 hover:bg-purple-50 transition-colors"
      >
        <Share2 className="w-4 h-4 text-purple-600" />
        Share
      </button>
    </div>
  );
}

function ReportCard({ report }: { report: Report }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer active:scale-98">
      <div className="flex items-start gap-3">
        <div className={`rounded-xl p-2.5 flex-shrink-0 ${report.status === "submitted" ? "bg-blue-50" : "bg-amber-50"}`}>
          <FileText className={`w-5 h-5 ${report.status === "submitted" ? "text-blue-600" : "text-amber-600"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-800 text-sm">{report.title}</h3>
            <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">{report.date}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                report.status === "submitted" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
              }`}
            >
              {report.status === "submitted" ? "Submitted" : "Draft"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{report.summary}</p>
        </div>
      </div>
    </div>
  );
}

export function ReportsHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("daily");

  const handleGeneratePDF = () => alert("PDF generated!");
  const handleShareReport = () => alert("Sharing report...");

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
          <h1 className="text-lg font-bold text-slate-900">Reports</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5 space-y-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100 rounded-xl p-1 h-11">
            <TabsTrigger value="daily" className="rounded-lg text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="rounded-lg text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="rounded-lg text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4 mt-4">
            <ProgressChart data={dailyProgressData} />
            <ActionButtons onGeneratePDF={handleGeneratePDF} onShare={handleShareReport} />
            <div className="space-y-3">
              {dailyReports.map((r) => <ReportCard key={r.id} report={r} />)}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4 mt-4">
            <ProgressChart data={weeklyProgressData} />
            <ActionButtons onGeneratePDF={handleGeneratePDF} onShare={handleShareReport} />
            <div className="space-y-3">
              {weeklyReports.map((r) => <ReportCard key={r.id} report={r} />)}
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4 mt-4">
            <ProgressChart data={monthlyProgressData} />
            <ActionButtons onGeneratePDF={handleGeneratePDF} onShare={handleShareReport} />
            <div className="space-y-3">
              {monthlyReports.map((r) => <ReportCard key={r.id} report={r} />)}
            </div>
          </TabsContent>
        </Tabs>

        <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 gap-2 font-semibold shadow-sm shadow-blue-200">
          <Plus className="w-4 h-4" />
          Create New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report
        </Button>
      </div>
    </div>
  );
}
