import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { backend_url } from "../../config";

type DashboardPageParams = {
  onNavigateToLogin: () => void;
};

export function DashboardPage({ onNavigateToLogin }: DashboardPageParams) {
  const { logout, user } = useAuth();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-[#161616] border border-[#2A2A2A] rounded-xl overflow-hidden flex min-h-[620px]">
            <h1 className="text-white">asd</h1>
        </div>
      </div>
    </>
  );
}
