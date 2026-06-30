import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Camera as CameraIcon, RotateCcw, Image, Zap, ZapOff, X, Check, MapPin } from "lucide-react";
import { Button } from "./ui/button";

export function Camera() {
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">("environment");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [lastCapturedThumb, setLastCapturedThumb] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setGpsCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setGpsCoordinates({ lat: 13.7563, lng: 100.5018 })
      );
    } else {
      setGpsCoordinates({ lat: 13.7563, lng: 100.5018 });
    }
    return () => clearInterval(timer);
  }, []);

  const handleCapture = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result as string;
        setCapturedImage(data);
        setLastCapturedThumb(data);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  if (capturedImage) {
    return (
      <div className="size-full bg-black flex flex-col">
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <button onClick={() => setCapturedImage(null)} className="p-2 hover:bg-white/10 rounded-full">
              <X className="w-6 h-6" />
            </button>
            <h1 className="font-semibold text-sm">Photo Preview</h1>
            <div className="w-10" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src={capturedImage} alt="Captured" className="max-w-full max-h-full object-contain" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex gap-3 max-w-7xl mx-auto">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl bg-white/10 text-white border-white/20 hover:bg-white/20 font-semibold"
              onClick={() => setCapturedImage(null)}
            >
              Retake
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 gap-2 font-semibold"
              onClick={() => { alert("Photo saved!"); navigate("/dashboard"); }}
            >
              <Check className="w-4 h-4" />
              Use Photo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-black flex flex-col">
      {/* Camera Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <button onClick={() => navigate("/dashboard")} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-sm">Site Camera</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 flex items-center justify-center bg-slate-900 relative">
        {/* Corner guides */}
        <div className="absolute inset-8 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/60 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/60 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/60 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/60 rounded-br-lg" />
        </div>

        <div className="text-center space-y-3">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
            <CameraIcon className="w-12 h-12 text-white/30" />
          </div>
          <p className="text-white/40 text-sm">Tap capture to take photo</p>
        </div>

        {/* GPS Watermark */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 text-white text-xs space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-white/80">
              {gpsCoordinates
                ? `${gpsCoordinates.lat.toFixed(5)}, ${gpsCoordinates.lng.toFixed(5)}`
                : "Locating..."}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-white/60">{formatDate(currentTime)}</span>
            <span className="font-mono text-white/60">{formatTime(currentTime)}</span>
          </div>
          <div className="border-t border-white/10 pt-1">
            <span className="text-blue-400 font-semibold text-xs">Phase: MEP Installation</span>
          </div>
        </div>

        {/* Last photo thumbnail */}
        {lastCapturedThumb && (
          <div className="absolute top-16 right-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/40 shadow-lg">
              <img src={lastCapturedThumb} alt="Last" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setFlashEnabled(!flashEnabled)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors ${flashEnabled ? "bg-amber-500/20 text-amber-400" : "text-white/60 hover:bg-white/10"}`}
            >
              {flashEnabled ? <Zap className="w-6 h-6" fill="currentColor" /> : <ZapOff className="w-6 h-6" />}
              <span className="text-xs font-medium">Flash</span>
            </button>

            {/* Shutter */}
            <button
              onClick={handleCapture}
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 rounded-full border-4 border-slate-300" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-1 text-white/60 hover:bg-white/10 p-3 rounded-xl transition-colors"
            >
              <Image className="w-6 h-6" />
              <span className="text-xs font-medium">Gallery</span>
            </button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
