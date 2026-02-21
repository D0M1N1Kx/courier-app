export function LoginPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-3/4 max-w-xl bg-[#161616] border border-[#2A2A2A] rounded-lg px-10 pt-8 pb-8 flex flex-col items-center gap-6">
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
              className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-4 py-3 text-[#E8E0D0] text-sm outline-none focus:border-[#C8A96E]"
            />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-4 py-3 text-[#E8E0D0] text-sm outline-none focus:border-[#C8A96E]"
            />
            <button className="w-full bg-[#C8A96E] text-[#0E0E0E] font-black tracking-widest py-3 rounded hover:bg-[#b8996e] transition-colors">
              SIGN IN
            </button>
            <p className="text-sm text-[#555555] text-center">
              Don't have an account?{" "}
              <span className="text-[#C8A96E] cursor-pointer hover:underline">
                Create account
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
