import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, X, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface Attendee {
  id: string;
  name: string;
  role: string;
}

interface ActionItem {
  id: string;
  description: string;
  assignedTo: string;
  completed: boolean;
}

export function MeetingReport() {
  const navigate = useNavigate();
  const [meetingTitle, setMeetingTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [nextMeetingDate, setNextMeetingDate] = useState("");

  const [attendees, setAttendees] = useState<Attendee[]>([
    { id: "1", name: "John Doe", role: "Project Manager" },
  ]);

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { id: "1", description: "", assignedTo: "", completed: false },
  ]);

  const addAttendee = () =>
    setAttendees([...attendees, { id: Date.now().toString(), name: "", role: "" }]);

  const removeAttendee = (id: string) =>
    setAttendees(attendees.filter((a) => a.id !== id));

  const updateAttendee = (id: string, field: keyof Attendee, value: string) =>
    setAttendees(attendees.map((a) => (a.id === id ? { ...a, [field]: value } : a)));

  const addActionItem = () =>
    setActionItems([...actionItems, { id: Date.now().toString(), description: "", assignedTo: "", completed: false }]);

  const removeActionItem = (id: string) =>
    setActionItems(actionItems.filter((a) => a.id !== id));

  const updateActionItem = (id: string, field: keyof ActionItem, value: string | boolean) =>
    setActionItems(actionItems.map((a) => (a.id === id ? { ...a, [field]: value } : a)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Meeting report saved!");
    navigate("/dashboard");
  };

  const fieldClass = "h-11 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500";
  const sectionClass = "bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4";

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
          <h1 className="text-lg font-bold text-slate-900">Meeting Report</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        <form onSubmit={handleSubmit} className="space-y-4 pb-6">
          {/* Meeting Details */}
          <div className={sectionClass}>
            <h2 className="font-bold text-slate-900 text-sm">Meeting Details</h2>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Meeting Title</Label>
              <Input
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="e.g., Weekly MEP Coordination"
                required
                className={fieldClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">Date</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">Time</Label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Conference Room A / Site Office"
                className={fieldClass}
              />
            </div>
          </div>

          {/* Attendees */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-sm">Attendees</h2>
              <button
                type="button"
                onClick={addAttendee}
                className="flex items-center gap-1 text-blue-600 text-xs font-semibold hover:text-blue-700"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {attendees.map((a) => (
                <div key={a.id} className="flex gap-2 items-center">
                  <Input
                    placeholder="Name"
                    value={a.name}
                    onChange={(e) => updateAttendee(a.id, "name", e.target.value)}
                    className="flex-1 h-10 bg-slate-50 border-slate-200 rounded-xl text-sm"
                  />
                  <Input
                    placeholder="Role"
                    value={a.role}
                    onChange={(e) => updateAttendee(a.id, "role", e.target.value)}
                    className="flex-1 h-10 bg-slate-50 border-slate-200 rounded-xl text-sm"
                  />
                  {attendees.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAttendee(a.id)}
                      className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div className={sectionClass}>
            <h2 className="font-bold text-slate-900 text-sm">Agenda</h2>
            <Textarea
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder="List the meeting agenda items..."
              rows={3}
              className="bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 resize-none text-sm"
            />
          </div>

          {/* Discussion */}
          <div className={sectionClass}>
            <h2 className="font-bold text-slate-900 text-sm">Discussion Summary</h2>
            <Textarea
              value={discussion}
              onChange={(e) => setDiscussion(e.target.value)}
              placeholder="Summarize key discussion points..."
              rows={4}
              className="bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 resize-none text-sm"
            />
          </div>

          {/* Action Items */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-sm">Action Items</h2>
              <button
                type="button"
                onClick={addActionItem}
                className="flex items-center gap-1 text-blue-600 text-xs font-semibold hover:text-blue-700"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
            <div className="space-y-3">
              {actionItems.map((item) => (
                <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Action item description"
                      value={item.description}
                      onChange={(e) => updateActionItem(item.id, "description", e.target.value)}
                      rows={2}
                      className="flex-1 bg-white border-slate-200 rounded-lg text-sm resize-none"
                    />
                    {actionItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeActionItem(item.id)}
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 flex-shrink-0 self-start"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="Assigned to"
                      value={item.assignedTo}
                      onChange={(e) => updateActionItem(item.id, "assignedTo", e.target.value)}
                      className="flex-1 h-9 bg-white border-slate-200 rounded-lg text-sm"
                    />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Checkbox
                        id={`action-${item.id}`}
                        checked={item.completed}
                        onCheckedChange={(v) => updateActionItem(item.id, "completed", v as boolean)}
                      />
                      <label htmlFor={`action-${item.id}`} className="text-xs text-slate-600 font-medium">Done</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Meeting */}
          <div className={sectionClass}>
            <h2 className="font-bold text-slate-900 text-sm">Next Meeting</h2>
            <Input
              type="datetime-local"
              value={nextMeetingDate}
              onChange={(e) => setNextMeetingDate(e.target.value)}
              className={fieldClass}
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="h-12 rounded-xl border-slate-200 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 gap-2 font-medium shadow-sm shadow-blue-200"
            >
              <Save className="w-4 h-4" />
              Save Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
