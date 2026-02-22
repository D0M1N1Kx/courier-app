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

            {/* Sidebar tabs*/}
            <div
              onClick={() => setActiveTab("dashboard")}
              className={`px-5 py-3 text-[11px] tracking-widest uppercase cursor-pointer border-l-2 transition-all ${
                activeTab === "dashboard"
                  ? "text-[#C8A96E] border-[#C8A96E] bg-[#1A1600]"
                  : "text-[#555555] border-transparent hover:text-[#E8E0D0] hover:bg-[#1A1A1A]"
              }`}
            >
              Dashboard
            </div>

            <div
              onClick={() => setActiveTab("new-delivery")}
              className={`px-5 py-3 text-[11px] tracking-widest uppercase cursor-pointer border-l-2 transition-all ${
                activeTab === "new-delivery"
                  ? "text-[#C8A96E] border-[#C8A96E] bg-[#1A1600]"
                  : "text-[#555555] border-transparent hover:text-[#E8E0D0] hover:bg-[#1A1A1A]"
              }`}
            >
              New Delivery
            </div>

            <div
              onClick={() => setActiveTab("history")}
              className={`px-5 py-3 text-[11px] tracking-widest uppercase cursor-pointer border-l-2 transition-all ${
                activeTab === "history"
                  ? "text-[#C8A96E] border-[#C8A96E] bg-[#1A1600]"
                  : "text-[#555555] border-transparent hover:text-[#E8E0D0] hover:bg-[#1A1A1A]"
              }`}
            >
              History
            </div>

            {/* User + logout */}
            <div className="mt-auto px-5 pt-5 border-t border-[#2A2A2A]">
              <p className="text-[13px] font-semibold text-[#E8E0D0]">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[9px] tracking-widest text-[#C8A96E] uppercase mb-3">
                {user?.isAdmin ? "Admin" : "Courier"}
              </p>
              <button
                onClick={handleLogout}
                className="w-full border border-[#2A2A2A] text-[#555555] text-[10px] tracking-widest uppercase py-2 rounded hover: border-[#C8A96E] hover:text-[#C8A96E] transition-all bg-transparent cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {activeTab === "dashboard" && <DashboardTab />}
            {activeTab === "new-delivery" && <NewDeliveryTab />}
            {activeTab === "history" && <HistoryTab />}
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardTab() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <p className="text-[14px] tracking-widest uppercase text-[#555555]">
          Overview
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Earned", value: "$0", sub: "all time", gold: true },
            { label: "Deliveries", value: "0", sub: "completed", gold: false },
            {
              label: "Packages",
              value: "0",
              sub: "delivered total",
              gold: false,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#0E0E0E] border border-[#2A2A2A] rounded-lg p-5"
            >
              <p className="text-[12px] tracking-widest uppercase text-[#555555] mb-2">
                {s.label}
              </p>
              <p
                className={`text-3xl font-black ${s.gold ? "text-[#C8A96E]" : "text-[#E8E0D0]"}`}
              >
                {s.value}
              </p>
              <p className="text-[12px] text-[#333333] mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function NewDeliveryTab() {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <p className="text-[#555555] text-sm tracking-widest uppercase">
          New Delivery - coming soon
        </p>
      </div>
    </>
  );
}

function HistoryTab() {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <p className="text-[#555555] text-sm tracking-widest uppercase">
          History — coming soon
        </p>
      </div>
    </>
  );
}
