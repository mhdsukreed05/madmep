import { useState } from "react";
import { useNavigate } from "react-router";
import { Fingerprint, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { MepLogo } from "./MepLogo";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleBiometricLogin = () => {
    setTimeout(() => navigate("/dashboard"), 500);
  };

  return (
    <div className="size-full flex flex-col bg-white overflow-auto">
      {/* Top blue accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-400" />

      {/* Top section — logo + branding */}
      <div className="flex flex-col items-center pt-14 pb-8 px-6">
        <MepLogo size="lg" />
        <h1 className="mt-5 text-2xl font-bold text-slate-900">MEP ENGINEER</h1>
        <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
      </div>

      {/* Form section */}
      <div className="flex-1 bg-slate-50 rounded-t-3xl px-6 pt-8 pb-10 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
              Corporate Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="engineer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 bg-white border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-700 font-medium text-sm">
                Password
              </Label>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-white border-slate-200 rounded-xl pr-12 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base gap-2 shadow-md shadow-blue-200"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Biometric */}
          <button
            type="button"
            onClick={handleBiometricLogin}
            className="w-full h-12 rounded-xl border-2 border-slate-200 bg-white flex items-center justify-center gap-2 text-slate-700 font-medium hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Fingerprint className="w-5 h-5 text-blue-600" />
            Face ID / Fingerprint
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>

        {/* Discipline indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>
    </div>
  );
}
