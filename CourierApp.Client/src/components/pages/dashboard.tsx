import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { backend_url } from "../../config";

type DashboardPageParams = {
  onNavigateToLogin: () => void;
};

type Tab = "dashboard" | "new-delivery" | "history";

export function DashboardPage({ onNavigateToLogin }: DashboardPageParams) {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const handleLogout = () => {
    logout();
    onNavigateToLogin();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-[#161616] border border-[#2A2A2A] rounded-xl overflow-hidden flex min-h-[620px]">
          {/* Sidebar */}
          <div className="w-52 min-w-52 bg-[#111111] border-r border-[#2A2A2A] flex flex-col py-7">
            {/* Title */}
            <div className="px-5 pb-6 border-b border-[#2A2A2A] mb-5">
              <h1
                className="text-[#C8A96E] text-3xl leading-tight"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                Wyatt Co.
              </h1>
              <p className="text-[12px] tracking-widest text-[#444444] uppercase mt-3">
                Logistics
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
