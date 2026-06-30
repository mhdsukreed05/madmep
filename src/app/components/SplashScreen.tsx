import { useEffect } from "react";
import { useNavigate } from "react-router";
import { MepLogo } from "./MepLogo";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="size-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div
        className="absolute"
        style={{
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, #EFF6FF 0%, transparent 70%)",
          top: "-120px",
          right: "-120px",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, #F0FDF4 0%, transparent 70%)",
          bottom: "-80px",
          left: "-80px",
        }}
      />

      {/* Content */}
      <div className="flex flex-col items-center gap-5 relative z-10">
        <MepLogo size="lg" />

        <div className="text-center mt-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">MEP ENGINEER</h1>
          <p className="text-slate-500 text-base mt-1">Professional Project Management</p>
        </div>

        {/* Discipline tags */}
        <div className="flex gap-2 mt-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">Mechanical</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">Electrical</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">Plumbing</span>
        </div>

        {/* Loading bar */}
        <div className="mt-6 w-40 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-1 rounded-full bg-blue-500"
            style={{ animation: "loadBar 2s linear forwards" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loadBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
