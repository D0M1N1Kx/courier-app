import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { backend_url } from "../../config";
import type { UserResponseDto, VehicleDto, WorkResponseDto } from "../../types";

type DashboardPageParams = {
  onNavigateToLogin: () => void;
};

type Tab = "dashboard" | "new-delivery" | "history" | "workers";

export function DashboardPage({ onNavigateToLogin }: DashboardPageParams) {
  const { logout, user } = useAuth();
  const [works, setWorks] = useState<WorkResponseDto[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const handleLogout = () => {
    logout();
    onNavigateToLogin();
  };

  const getUserWorks = async (userId: number) => {
    try {
      var res = await fetch(`${backend_url}/work/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log("Failed request!");
        return;
      }

      const works: WorkResponseDto[] = await res.json();
      setWorks(works);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCompleteWork = async () => {
    const activeWork = works.find((w) => !w.isCompleted);
    if (!activeWork) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("proof", file);

      try {
        const res = await fetch(
          `${backend_url}/work/complete/${activeWork.id}`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!res.ok) {
          console.log("Failed to complete work!");
          return;
        }

        if (user?.id) getUserWorks(user.id);
      } catch (e) {
        console.log(e);
      }
    };

    input.click();
  };

  useEffect(() => {
    if (user?.id) {
      getUserWorks(user.id);
    }
  }, []);

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

            {/* ADMIN SECTION */}
            <div className="border border-[#2A2A2A] my-2"></div>
            {user?.isAdmin && (
              <div
                onClick={() => setActiveTab("workers")}
                className={`px-5 py-3 text-[11px] tracking-widest uppercase cursor-pointer border-l-2 transition-all ${
                  activeTab === "workers"
                    ? "text-[#C8A96E] border-[#C8A96E] bg-[#1A1600]"
                    : "text-[#555555] border-transparent hover:text-[#E8E0D0] hover:bg-[#1A1A1A]"
                }`}
              >
                Workers
              </div>
            )}
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
            {activeTab === "dashboard" && (
              <DashboardTab works={works} onCompleteWork={handleCompleteWork} />
            )}
            {activeTab === "new-delivery" && (
              <NewDeliveryTab
                userId={user!.id}
                onDeliveryStarted={() => {
                  getUserWorks(user!.id);
                  setActiveTab("dashboard");
                }}
              />
            )}
            {activeTab === "history" && <HistoryTab works={works} />}
            {activeTab === "workers" && <WorkersTab works={works}/>}
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardTab({
  works,
  onCompleteWork,
}: {
  works: WorkResponseDto[];
  onCompleteWork: () => void;
}) {
  const completedWorks = works.filter((w) => w.isCompleted);
  const totalEarned = completedWorks.reduce(
    (sum, w) => sum + w.packageCount * w.pricePerPackage,
    0,
  );
  const totalPackages = completedWorks.reduce(
    (sum, w) => sum + w.packageCount,
    0,
  );
  const activeWork = works.find((w) => !w.isCompleted);

  return (
    <>
      <div className="flex flex-col gap-6">
        <p className="text-[14px] tracking-widest uppercase text-[#555555]">
          Overview
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Total Earned",
              value: `$${totalEarned.toLocaleString()}`,
              sub: "all time",
              gold: true,
            },
            {
              label: "Deliveries",
              value: completedWorks.length.toString(),
              sub: "completed",
              gold: false,
            },
            {
              label: "Packages",
              value: totalPackages.toString(),
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

        {/* Active work banner */}
        {activeWork && (
          <div className="bg-[#1A1600] border border-[#C8A96E] rounded-lg p-4 flex items-center gap-4">
            <div className="w-2 h-2 bg-[#C8A96E] rounded-full" />
            <p className="text-[10px] tracking-widest uppercase text-[#C8A96E] font-bold">
              Active Delivery
            </p>
            <p className="text-[13px] text-[#E8E0D0] flex-1">
              Started at{" "}
              {new Date(activeWork.startTime).toLocaleTimeString("en", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              &nbsp;•&nbsp; {activeWork.packageCount} packages &nbsp;•&nbsp; $
              {activeWork.totalEarned.toLocaleString()}
            </p>
            <button
              className="bg-[#C8A96E] text-[#0E0E0E] font-black text-[11px] tracking-widest uppercase px-4 py-2 rounded hover:bg-[#b8996e] transition-colors cursor-pointer flex-shrink-0"
              onClick={onCompleteWork}
            >
              Complete
            </button>
          </div>
        )}

        {/* Recent Deliveries */}
        <div>
          <p className="text-[12px] tracking-widest uppercase text-[#555555] mb-3">
            Recent Deliveries
          </p>
          <div className="bg-[#0E0E0E] border border-[#2A2A2A] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  {[
                    "Date",
                    "Packages",
                    "Price/Pkg",
                    "Total",
                    "Duration",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[9px] tracking-widest uppercase text-[#444444] px-4 py-3 bg-[#0E0E0E]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {works
                  .sort(
                    (a, b) =>
                      new Date(b.startTime).getTime() -
                      new Date(a.startTime).getTime(),
                  )
                  .map((w) => {
                    const duration = w.endTime
                      ? Math.round(
                          (new Date(w.endTime).getTime() -
                            new Date(w.startTime).getTime()) /
                            60000,
                        )
                      : null;
                    return (
                      <tr
                        key={w.id}
                        className="border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors"
                      >
                        <td className="px-4 py-3 text-[#E8E0D0]">
                          {new Date(w.startTime).toLocaleDateString("en", {
                            month: "2-digit",
                            day: "2-digit",
                          })}{" "}
                          {new Date(w.startTime).toLocaleTimeString("en", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-3 text-[#E8E0D0]">
                          {w.packageCount}
                        </td>
                        <td className="px-4 py-3 text-[#E8E0D0]">
                          {w.pricePerPackage.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-[#E8E0D0]">
                          {w.totalEarned.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-[#E8E0D0]">
                          {duration ? `${duration} min` : "-"}
                        </td>
                        <td className="px-4 py-3">
                          {w.isCompleted ? (
                            <span className="text-[9px] tracking-wider text-[#4CAF50] bg-[#0A1F0A] border border-[#2A4A2A] px-2 py-1 rounded">
                              Completed
                            </span>
                          ) : (
                            <span className="text-[9px] tracking-wider text-[#C8A96E] bg-[#1A1600] border border-[#3A3000] px-2 py-1 rounded">
                              In Progress
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function NewDeliveryTab({
  userId,
  onDeliveryStarted,
}: {
  userId: number;
  onDeliveryStarted: () => void;
}) {
  const [packageCount, setPackageCount] = useState(15);
  const [pricePerPackage, setPricePerPackage] = useState(3500);
  const [error, setError] = useState("");

  const estimated = packageCount * pricePerPackage;

  const handleStart = async () => {
    setError("");
    try {
      const res = await fetch(`${backend_url}/work/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, packageCount, pricePerPackage }),
      });

      if (!res.ok) {
        setError("Failed to start delivery.");
        return;
      }

      onDeliveryStarted();
    } catch {
      setError("Could not connect to server.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-[#0E0E0E] border border-[#2A2A2A] rounded-lg p-9 w-full max-w-md flex flex-col gap-6">
        <p className="text-[10px] tracking-widest uppercase text-[#555555] font-semibold">
          Start Delivery
        </p>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-widest uppercase text-[#555555]">
            Number of Packages
          </label>
          <input
            type="number"
            min={1}
            max={15}
            value={packageCount}
            onChange={(e) => setPackageCount(Number(e.target.value))}
            className="bg-[#161616] border border-[#2A2A2A] rounded-md px-4 py-3 text-[#E8E0D0] text-[15px] outline-none focus:border-[#C8A96E] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-widest uppercase text-[#555555]">
            Price per Package ($)
          </label>
          <input
            type="number"
            min={0}
            value={pricePerPackage}
            onChange={(e) => setPricePerPackage(Number(e.target.value))}
            className="bg-[#161616] border border-[#2A2A2A] rounded-md px-4 py-3 text-[#E8E0D0] text-[15px] outline-none focus:border-[#C8A96E] transition-colors"
          />
        </div>

        <div className="h-px bg-[#2A2A2A]" />

        <div className="bg-[#161616] border border-[#2A2A2A] rounded-md px-4 py-4 flex items-center justify-between">
          <span className="text-[10px] tracking-widest uppercase text-[#555555]">
            Estimated Total
          </span>
          <span className="text-2xl font-black text-[#C8A96E]">
            ${estimated.toLocaleString()}
          </span>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          onClick={handleStart}
          className="w-full bg-[#C8A96E] text-[#0E0E0E] font-black text-[13px] tracking-widest uppercase py-3 rounded-md hover:bg-[#b8996e] transition-colors cursor-pointer"
        >
          Start Delivery
        </button>
      </div>
    </div>
  );
}

function HistoryTab({ works }: { works: WorkResponseDto[] }) {
  const completedWorks = works.filter((w) => w.isCompleted);
  const totalEarned = completedWorks.reduce(
    (sum, w) => sum + w.packageCount * w.pricePerPackage,
    0,
  );
  const activeWork = works.find((w) => !w.isCompleted);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[9px] tracking-widest uppercase text-[#555555]">
        Payment History
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5">
          <p className="text-[9px] tracking-widest uppercase text-[#555555] mb-2">
            Total Received
          </p>
          <p className="text-2xl font-black text-[#C8A96E]">
            ${totalEarned.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5">
          <p className="text-[9px] tracking-widest uppercase text-[#555555] mb-2">
            Deliveries
          </p>
          <p className="text-2xl font-black text-[#E8E0D0]">
            {completedWorks.length}
          </p>
        </div>
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5">
          <p className="text-[9px] tracking-widest uppercase text-[#555555] mb-2">
            Pending
          </p>
          <p className="text-2xl font-black text-[#E8E0D0]">
            $
            {activeWork
              ? (
                  activeWork.packageCount * activeWork.pricePerPackage
                ).toLocaleString()
              : "0"}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2A2A2A] flex items-center justify-between">
          <p className="text-[9px] tracking-widest uppercase text-[#555555]">
            Payments
          </p>
          {activeWork && (
            <span className="text-[9px] tracking-wider text-[#C8A96E] bg-[#1A1600] border border-[#3A3000] px-2 py-1 rounded">
              1 unpaid delivery
            </span>
          )}
        </div>

        {completedWorks.length === 0 ? (
          <p className="text-center text-[11px] tracking-widest uppercase text-[#333333] py-12">
            No payments yet
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                {[
                  "Date",
                  "Paid By",
                  "Deliveries",
                  "Packages",
                  "Amount",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[9px] tracking-widest uppercase text-[#444444] px-5 py-3 bg-[#0E0E0E]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors">
                <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">—</td>
                <td className="px-5 py-4 text-[11px] text-[#555555]">
                  Pending payment
                </td>
                <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">
                  {completedWorks.length}
                </td>
                <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">
                  {completedWorks.reduce((sum, w) => sum + w.packageCount, 0)}
                </td>
                <td className="px-5 py-4 text-[13px] font-black text-[#C8A96E]">
                  ${totalEarned.toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <span className="text-[9px] tracking-wider text-[#C8A96E] bg-[#1A1600] border border-[#3A3000] px-2 py-1 rounded">
                    Unpaid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function WorkersTab({ works }: { works: WorkResponseDto[] }) {
    const [workers, setWorkers] = useState<UserResponseDto[]>([]);
    const [vehicles, setVehicles] = useState<VehicleDto[]>([]);
    const completedWorks = works.filter((w) => w.isCompleted);
    const totalEarned = completedWorks.reduce(
      (sum, w) => sum + w.packageCount * w.pricePerPackage,
      0,
    );
    const totalPackages = works.reduce((sum, w) => sum + w.packageCount, 0);
    const allWorkers = workers.length;
    const totalWorkers = workers.filter((w) => w.isAdmin == false).length;
    const totalAdmins = workers.filter((w) => w.isAdmin == true).length;
    const getVehicleById = (id: string) => vehicles.filter((v) => v.vehicleId == id);

    const getWorkers = async () => {
        try {
            var res = await fetch(`${backend_url}/auth/users`, {
                method: 'GET',
            });

            if (!res.ok) {
                console.log('Failed to get users.');
                return;
            }

            const data: UserResponseDto[] = await res.json();
            setWorkers(data);
        } catch {
            console.log('Could not connect to the server.')
        }
    };

    const getVehicles = async () => {
        try {
            var res = await fetch(`${backend_url}/vehicles`, {
                method: 'GET',
            });

            if (!res.ok) {
                console.log('Failed to get vehicles.');
                return;
            }

            const data: VehicleDto[] = await res.json();
            setVehicles(data);
        } catch {
            console.log('Failed to connect to the server.')
        }
    };

    const handleApprove = () => {

    };

    useEffect(() => {
        getWorkers();
        getVehicles();
    });

    return (
    <div className="flex flex-col gap-6">
      <p className="text-[9px] tracking-widest uppercase text-[#555555]">
        Workers Overview
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5">
          <p className="text-[9px] tracking-widest uppercase text-[#555555] mb-2">
            Total Workers
          </p>
          <p className="text-2xl font-black text-[#C8A96E]">
            {allWorkers}
          </p>
        </div>
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5">
          <p className="text-[9px] tracking-widest uppercase text-[#555555] mb-2">
            Workers
          </p>
          <p className="text-2xl font-black text-[#E8E0D0]">
            {totalWorkers}
          </p>
        </div>
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5">
          <p className="text-[9px] tracking-widest uppercase text-[#555555] mb-2">
            Admins
          </p>
          <p className="text-2xl font-black text-[#E8E0D0]">
            {totalAdmins}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg">
        <div className="px-5 py-4 border-b border-[#2A2A2A] flex items-center justify-between">
          <p className="text-[9px] tracking-widest uppercase text-[#555555]">
            Workers
          </p>
        </div>

        {allWorkers === 0 ? (
          <p className="text-center text-[11px] tracking-widest uppercase text-[#333333] py-12">
            No workers yet
          </p>
        ) : (
            <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                {[
                  "Id",
                  "Email",
                  "Firstname",
                  "Lastname",
                  "IsAdmin",
                  "Approved",
                  "VehicleID",
                  "License Plate",
                  "Total Earned",
                  "Total Packages"
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[9px] tracking-widest uppercase text-[#444444] px-5 py-3 bg-[#0E0E0E]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
  {[...workers]
    .sort((a, b) => a.id - b.id)
    .map((w) => {
    const workerWorks = works.filter(work => work.userId === w.id);

    const workerCompleted = workerWorks.filter(work => work.isCompleted);

    const totalEarned = workerCompleted.reduce(
      (sum, work) => sum + work.packageCount * work.pricePerPackage,
      0
    );

    const totalPackages = workerCompleted.reduce(
      (sum, work) => sum + work.packageCount,
      0
    );

    const vehicle = vehicles.find(v => v.vehicleId === w.vehicleId);

    return (
      <tr
        key={w.id}
        className="border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors"
      >
        <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">
          {w.id}
        </td>

        <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">
          {w.email}
        </td>

        <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">
          {w.firstName}
        </td>

        <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">
          {w.lastName}
        </td>

        <td className="px-5 py-4">
          <span className="text-[9px] tracking-wider text-[#C8A96E] bg-[#1A1600] border border-[#3A3000] px-2 py-1 rounded">
            {w.isAdmin ? "Admin" : "Worker"}
          </span>
        </td>

        <td className="px-5 py-4">
          <span className="text-[9px] tracking-wider text-[#4CAF50] bg-[#0A1F0A] border border-[#2A4A2A] px-2 py-1 rounded" onClick={handleApprove}>
            Approved {/* Need to implement in backend */}
          </span>
        </td>

        <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">
          {w.vehicleId ?? "-"}
        </td>

        <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">
          {vehicle?.licensePlate ?? "-"}
        </td>

        <td className="px-5 py-4 text-[13px] font-black text-[#C8A96E]">
          ${totalEarned.toLocaleString()}
        </td>

        <td className="px-5 py-4 text-[13px] text-[#E8E0D0]">
          {totalPackages}
        </td>
      </tr>
    );
  })}
</tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}
