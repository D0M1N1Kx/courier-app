import { useState } from "react";
import { backend_url } from "../../config";

type RegisterPageParams = {
  onNavigateToLogin: () => void;
};

export function RegisterPage({ onNavigateToLogin }: RegisterPageParams) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (firstName == "" || lastName == "") {
        setError("First and last name must be filled.")
        return;
    }

    if (password.length < 6) {
      setError("Password length must be longer!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${backend_url}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (res.status === 409) {
        setError("This email is already registered.");
        return;
      }

      if (!res.ok) {
        setError("Registration failed. Please try again.");
        return;
      }

      setSuccess("Account created! You can now sign in.");
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
            Create your account
          </p>
          <div className="w-full flex flex-col gap-4 mt-2">
            {/* First + Last name egymás mellett */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 bg-[#0E0E0E] border border-[#2A2A2A] rounded px-4 py-3 text-[#E8E0D0] text-sm outline-none focus:border-[#C8A96E]"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 bg-[#0E0E0E] border border-[#2A2A2A] rounded px-4 py-3 text-[#E8E0D0] text-sm outline-none focus:border-[#C8A96E]"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-4 py-3 text-[#E8E0D0] text-sm outline-none focus:border-[#C8A96E]"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-4 py-3 text-[#E8E0D0] text-sm outline-none focus:border-[#C8A96E]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-4 py-3 text-[#E8E0D0] text-sm outline-none focus:border-[#C8A96E]"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="text-sm text-red-400">{error}</p>}
            {success && <p className="text-sm text-green-400">{success}</p>}

            <button
              className="w-full bg-[#C8A96E] text-[#0E0E0E] font-black tracking-widest py-3 rounded hover:bg-[#b8996e] transition-colors"
              onClick={handleRegister}
            >
              CREATE ACCOUNT
            </button>
            <p className="text-sm text-[#555555] text-center">
              Already have an account?{" "}
              <span
                className="text-[#C8A96E] cursor-pointer hover:underline"
                onClick={onNavigateToLogin}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
