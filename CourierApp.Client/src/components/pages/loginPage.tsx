import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { backend_url } from "../../config";

type LoginPageParams = {
  onNavigateToRegister: () => void;
};

export function LoginPage({ onNavigateToRegister }: LoginPageParams) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch(`${backend_url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Invalid email or password.");
        return;
      }

      const user = await res.json();
      if (!user.isApproved)
        setError("Your account is not approved yet!");
      
      login(user);
    } catch {
      setError("Could not connect to server.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full sm:w-3/4 sm:max-w-xl bg-[#161616] border border-[#2A2A2A] rounded-lg px-10 pt-8 pb-8 flex flex-col items-center gap-6 mx-4">
          <h1
            className="text-center text-2xl md:text-3xl lg:text-4xl"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
            Wyatt Co. Logistics
          </h1>
          <p className="text-xs tracking-widest text-[#555555] uppercase">
            Sign in to your account
          </p>

          <div className="w-full flex flex-col gap-4 mt-2">
            <input
              type="email"
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-4 py-3 text-[#E8E0D0] text-sm outline-none focus:border-[#C8A96E]"
            />
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-4 py-3 text-[#E8E0D0] text-sm outline-none focus:border-[#C8A96E]"
            />

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              className="w-full bg-[#C8A96E] text-[#0E0E0E] font-black tracking-widest py-3 rounded hover:bg-[#b8996e] transition-colors"
              onClick={handleLogin}
            >
              SIGN IN
            </button>
            <p className="text-sm text-[#555555] text-center">
              Don't have an account?{" "}
              <span
                className="text-[#C8A96E] cursor-pointer hover:underline"
                onClick={onNavigateToRegister}
              >
                Create account
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
