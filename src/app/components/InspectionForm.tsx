import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface ChecklistItem {
  id: string;
  label: string;
  status: "pass" | "fail" | "na" | null;
}

const inspectionTypes = {
  design: {
    title: "Design Inspection",
    items: [
      "Verify design compliance with building codes",
      "Check MEP system integration",
      "Review structural coordination",
      "Validate load calculations",
      "Confirm material specifications",
      "Review design drawings and documentation",
    ],
  },
  mep: {
    title: "MEP Inspection",
    items: [
      "Inspect plumbing installation",
      "Check electrical panel installation",
      "Verify HVAC ductwork routing",
      "Test water pressure",
      "Check cable management",
      "Inspect fire protection systems",
    ],
  },
  site: {
    title: "Site Inspection",
    items: [
      "Review site safety measures",
      "Check material storage areas",
      "Verify worker safety equipment",
      "Inspect temporary facilities",
      "Check site access and egress",
      "Review environmental compliance",
    ],
  },
};

const tabs = [
  { key: "design", label: "Design" },
  { key: "mep", label: "MEP" },
  { key: "site", label: "Site" },
];

export function InspectionForm() {
  const navigate = useNavigate();
  const { inspectionType } = useParams<{ inspectionType: string }>();
  const inspection = inspectionTypes[inspectionType as keyof typeof inspectionTypes] || inspectionTypes.design;

  const [inspectorName, setInspectorName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [comments, setComments] = useState("");
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    inspection.items.map((item, index) => ({ id: `item-${index}`, label: item, status: null }))
  );

  const updateChecklistItem = (id: string, status: "pass" | "fail" | "na") => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: item.status === status ? null : status } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inspection submitted successfully!");
    navigate("/dashboard");
  };

  const passCount = checklist.filter((c) => c.status === "pass").length;
  const failCount = checklist.filter((c) => c.status === "fail").length;
  const naCount = checklist.filter((c) => c.status === "na").length;
  const doneCount = passCount + failCount + naCount;

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
          <div>
            <h1 className="text-lg font-bold text-slate-900">{inspection.title}</h1>
            <p className="text-xs text-slate-400">{doneCount}/{checklist.length} items reviewed</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        <form onSubmit={handleSubmit} className="space-y-4 pb-6">
          {/* Inspector Info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-slate-900 text-sm">Inspector Information</h2>
            <div className="space-y-1.5">
              <Label htmlFor="inspector" className="text-slate-700 text-sm font-medium">Inspector Name</Label>
              <Input
                id="inspector"
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                placeholder="Enter inspector name"
                required
                className="h-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-slate-700 text-sm font-medium">Inspection Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="h-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500"
              />
            </div>
          </div>

          {/* Inspection Type Tabs */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <h2 className="font-bold text-slate-900 text-sm mb-3">Inspection Type</h2>
            <div className="flex gap-2 bg-slate-100 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => navigate(`/inspection/${tab.key}`)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    inspectionType === tab.key
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 rounded-2xl p-3 text-center border border-emerald-100">
              <p className="text-2xl font-bold text-emerald-600">{passCount}</p>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">Pass</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-3 text-center border border-red-100">
              <p className="text-2xl font-bold text-red-500">{failCount}</p>
              <p className="text-xs font-semibold text-red-600 mt-0.5">Fail</p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-3 text-center border border-slate-200">
              <p className="text-2xl font-bold text-slate-500">{naCount}</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">N/A</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="font-bold text-slate-900 text-sm mb-4">Inspection Checklist</h2>
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm text-slate-700 mb-3">
                    <span className="font-bold text-slate-400 mr-2">{index + 1}.</span>
                    {item.label}
                  </p>
                  <div className="flex gap-2">
                    {(["pass", "fail", "na"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => updateChecklistItem(item.id, s)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                          item.status === s
                            ? s === "pass"
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                              : s === "fail"
                              ? "bg-red-500 border-red-500 text-white shadow-sm"
                              : "bg-slate-500 border-slate-500 text-white shadow-sm"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {s === "na" ? "N/A" : s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="font-bold text-slate-900 text-sm mb-3">Comments & Observations</h2>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter additional comments..."
              rows={4}
              className="bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 resize-none"
            />
          </div>

          {/* Signature */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="font-bold text-slate-900 text-sm mb-3">Signature</h2>
            <div className="border-2 border-dashed border-slate-200 rounded-xl h-24 flex items-center justify-center bg-slate-50">
              <p className="text-slate-400 text-sm">Tap to sign</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/camera")}
              className="h-12 rounded-xl border-slate-200 gap-2 font-medium"
            >
              <Camera className="w-4 h-4" />
              Add Photos
            </Button>
            <Button
              type="submit"
              className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 gap-2 font-medium shadow-sm shadow-blue-200"
            >
              <Save className="w-4 h-4" />
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
