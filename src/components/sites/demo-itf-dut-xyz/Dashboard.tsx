"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Menu,
  Home as HomeIcon,
  Network,
  CheckSquare,
  FileEdit,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut,
  User,
  KeyRound,
  Download,
} from "lucide-react";

export interface UserSession {
  studentId: string;
  fullName: string;
  avatarUrl?: string;
}

export default function OnlineQuizDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>("home");
  const [testSubmenuOpen, setTestSubmenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  // Authenticated state
  const currentUser: UserSession = {
    studentId: "123230119",
    fullName: "Lê Võ Thành Nam"
  };

  // Calendar State: October 2026
  const [viewMode, setViewMode] = useState<"month" | "week" | "day" | "agenda">("month");
  const [currentYear] = useState<number>(2026);
  const [currentMonth] = useState<number>(10); // 10 = Oct

  // Calendar grid calculation for Oct 2026 (Oct 1 2026 is Thursday = T5)
  // Calendar header: T2 (Mon), T3 (Tue), T4 (Wed), T5 (Thu), T6 (Fri), T7 (Sat), CN (Sun)
  // Sept 2026 ends at 30 (Wed -> T4)
  // Row 1: 28, 29, 30 (Sept) | 1, 2 (today), 3, 4
  // Row 2: 5, 6, 7, 8, 9, 10, 11
  // Row 3: 12, 13, 14, 15, 16, 17, 18
  // Row 4: 19, 20, 21, 22, 23, 24, 25
  // Row 5: 26, 27, 28, 29, 30, 31 | 1 (Nov)

  const days = [
    { day: 28, isCurrentMonth: false, isToday: false },
    { day: 29, isCurrentMonth: false, isToday: false },
    { day: 30, isCurrentMonth: false, isToday: false },
    { day: 1, isCurrentMonth: true, isToday: false },
    { day: 2, isCurrentMonth: true, isToday: true }, // Today Oct 2, 2026
    { day: 3, isCurrentMonth: true, isToday: false },
    { day: 4, isCurrentMonth: true, isToday: false },

    { day: 5, isCurrentMonth: true, isToday: false },
    { day: 6, isCurrentMonth: true, isToday: false },
    { day: 7, isCurrentMonth: true, isToday: false },
    { day: 8, isCurrentMonth: true, isToday: false },
    { day: 9, isCurrentMonth: true, isToday: false },
    { day: 10, isCurrentMonth: true, isToday: false },
    { day: 11, isCurrentMonth: true, isToday: false },

    { day: 12, isCurrentMonth: true, isToday: false },
    { day: 13, isCurrentMonth: true, isToday: false },
    { day: 14, isCurrentMonth: true, isToday: false },
    { day: 15, isCurrentMonth: true, isToday: false },
    { day: 16, isCurrentMonth: true, isToday: false },
    { day: 17, isCurrentMonth: true, isToday: false },
    { day: 18, isCurrentMonth: true, isToday: false },

    { day: 19, isCurrentMonth: true, isToday: false },
    { day: 20, isCurrentMonth: true, isToday: false },
    { day: 21, isCurrentMonth: true, isToday: false },
    { day: 22, isCurrentMonth: true, isToday: false },
    { day: 23, isCurrentMonth: true, isToday: false },
    { day: 24, isCurrentMonth: true, isToday: false },
    { day: 25, isCurrentMonth: true, isToday: false },

    { day: 26, isCurrentMonth: true, isToday: false },
    { day: 27, isCurrentMonth: true, isToday: false },
    { day: 28, isCurrentMonth: true, isToday: false },
    { day: 29, isCurrentMonth: true, isToday: false },
    { day: 30, isCurrentMonth: true, isToday: false },
    { day: 31, isCurrentMonth: true, isToday: false },
    { day: 1, isCurrentMonth: false, isToday: false },
  ];

  // Helper for asset prefix on GitHub Pages (/ITF)
  const basePath = process.env.NODE_ENV === "production" ? "/ITF" : "";

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex font-sans antialiased text-[#73879C]">
      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? "w-[70px]" : "w-[230px]"
        } transition-all duration-300 bg-[#2A3F54] flex flex-col flex-shrink-0 z-30 select-none shadow-md`}
      >
        {/* LOGO & BRAND */}
        <div className="h-[56px] flex items-center px-4 border-b border-[#35495e] gap-2.5 text-white">
          <div className="w-[22px] h-[21px] flex items-center justify-center flex-shrink-0">
            <Image
              src={`${basePath}/logo_itf_final.png`}
              alt="DemoITF Logo"
              width={22}
              height={21}
              className="w-[22px] h-[21px] object-contain block"
              unoptimized
            />
          </div>
          {!collapsed && (
            <span className="font-bold text-[17px] tracking-tight truncate text-white leading-tight">
              Trắc nghiệm online
            </span>
          )}
        </div>

        {/* PROFILE CARD */}
        {!collapsed && (
          <div className="p-3.5 flex items-center gap-3 border-b border-[#35495e]/50">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={`${basePath}/avatar_clean.png`}
                alt="Student Avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover block rounded-full"
                unoptimized
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#BAB8B8]">Xin chào</span>
              <span className="text-[13.5px] font-semibold text-[#ECF0F1] truncate">
                {currentUser.fullName}
              </span>
            </div>
          </div>
        )}

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 py-3 text-[#E7E7E7] text-[13px] font-medium space-y-0.5">
          <button
            onClick={() => setActiveMenu("home")}
            className={`w-full flex items-center px-4 py-2.5 gap-3.5 transition-colors text-left relative ${
              activeMenu === "home"
                ? "bg-[#35495d] text-white border-r-[5px] border-[#1ABB9C]"
                : "hover:bg-[#35495e] text-[#b8c7ce] hover:text-white"
            }`}
            title="Trang chủ"
          >
            <HomeIcon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Trang chủ</span>}
          </button>

          <button
            onClick={() => setActiveMenu("classes")}
            className={`w-full flex items-center px-4 py-2.5 gap-3.5 transition-colors text-left relative ${
              activeMenu === "classes"
                ? "bg-[#35495d] text-white border-r-[5px] border-[#1ABB9C]"
                : "hover:bg-[#35495e] text-[#b8c7ce] hover:text-white"
            }`}
            title="Lớp học phần"
          >
            <Network className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Lớp học phần</span>}
          </button>

          {/* Collapsible Test section */}
          <div>
            <button
              onClick={() => {
                setActiveMenu("test");
                setTestSubmenuOpen(!testSubmenuOpen);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors text-left ${
                activeMenu === "test"
                  ? "bg-[#35495d] text-white border-r-[5px] border-[#1ABB9C]"
                  : "hover:bg-[#35495e] text-[#b8c7ce] hover:text-white"
              }`}
              title="Bài kiểm tra"
            >
              <div className="flex items-center gap-3.5">
                <CheckSquare className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Bài kiểm tra</span>}
              </div>
              {!collapsed && (
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    testSubmenuOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {testSubmenuOpen && !collapsed && (
              <div className="bg-[#243547] py-1 text-xs text-[#a9b7bc]">
                <button className="w-full text-left pl-11 py-2 hover:text-white hover:bg-[#1f2e3d]">
                  Danh sách bài thi
                </button>
                <button className="w-full text-left pl-11 py-2 hover:text-white hover:bg-[#1f2e3d]">
                  Lịch sử làm bài
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveMenu("exercises")}
            className={`w-full flex items-center px-4 py-2.5 gap-3.5 transition-colors text-left relative ${
              activeMenu === "exercises"
                ? "bg-[#35495d] text-white border-r-[5px] border-[#1ABB9C]"
                : "hover:bg-[#35495e] text-[#b8c7ce] hover:text-white"
            }`}
            title="Bài tập"
          >
            <FileEdit className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Bài tập</span>}
          </button>
        </nav>
      </aside>

      {/* RIGHT SIDE MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER NAVBAR */}
        <header className="h-[56px] bg-[#EDEDED] border-b border-[#D9DEE4] flex items-center justify-between px-4 select-none">
          {/* Hamburger toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 text-[#5A738E] hover:text-[#2A3F54] hover:bg-gray-200 rounded transition-colors"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* User Profile Pill Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-200/80 transition-colors"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                <Image
                  src={`${basePath}/student_avatar_small.png`}
                  alt="Student Top Avatar"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover rounded-full"
                  unoptimized
                />
              </div>
              <span className="text-[13px] font-medium text-[#5A738E]">
                {currentUser.studentId}
              </span>
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg border border-gray-200 py-1.5 z-50 text-[13px] text-gray-700 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-900 truncate">{currentUser.fullName}</p>
                  <p className="text-xs text-gray-500">{currentUser.studentId}</p>
                </div>
                <button
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 text-left"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  <span>Thông tin cá nhân</span>
                </button>
                <button
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 text-left"
                >
                  <KeyRound className="w-4 h-4 text-gray-500" />
                  <span>Đổi mật khẩu</span>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    alert("Đã đăng xuất");
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 text-red-600 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* BODY CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Breadcrumb Title */}
          <div className="mb-4">
            <h1 className="text-2xl font-normal text-[#73879C]">Trang chủ</h1>
            <div className="w-full border-b border-[#D9DEE4] mt-2"></div>
          </div>

          {/* CALENDAR CONTAINER BOX */}
          <div className="bg-white rounded border border-[#E6E9ED] p-4 shadow-sm">
            {/* Calendar Toolbar */}
            <div className="flex flex-wrap items-center justify-between pb-4 gap-2 border-b border-[#E6E9ED] mb-3">
              {/* Left navigation buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {}}
                  className="p-1.5 px-2.5 border border-gray-300 rounded bg-[#F7F7F7] hover:bg-gray-200 text-gray-700 text-xs font-semibold shadow-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {}}
                  className="p-1.5 px-2.5 border border-gray-300 rounded bg-[#F7F7F7] hover:bg-gray-200 text-gray-700 text-xs font-semibold shadow-xs"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {}}
                  className="px-3 py-1.5 border border-gray-300 rounded bg-[#F7F7F7] hover:bg-gray-200 text-gray-700 text-xs font-medium shadow-xs ml-1"
                >
                  Hôm nay
                </button>
              </div>

              {/* Center Month/Year Title */}
              <div className="text-lg font-normal text-[#5A738E]">
                Tháng {currentMonth} {currentYear}
              </div>

              {/* Right view switcher */}
              <div className="inline-flex rounded-md shadow-xs" role="group">
                <button
                  onClick={() => setViewMode("month")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-l border ${
                    viewMode === "month"
                      ? "bg-[#A7A7A7] text-white border-[#A7A7A7]"
                      : "bg-[#F7F7F7] text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Tháng
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-3 py-1.5 text-xs font-medium border-t border-b border-r ${
                    viewMode === "week"
                      ? "bg-[#A7A7A7] text-white border-[#A7A7A7]"
                      : "bg-[#F7F7F7] text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Tuần
                </button>
                <button
                  onClick={() => setViewMode("day")}
                  className={`px-3 py-1.5 text-xs font-medium border-t border-b border-r ${
                    viewMode === "day"
                      ? "bg-[#A7A7A7] text-white border-[#A7A7A7]"
                      : "bg-[#F7F7F7] text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Ngày
                </button>
                <button
                  onClick={() => setViewMode("agenda")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-r border-t border-b border-r ${
                    viewMode === "agenda"
                      ? "bg-[#A7A7A7] text-white border-[#A7A7A7]"
                      : "bg-[#F7F7F7] text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Lịch biểu
                </button>
              </div>
            </div>

            {/* Calendar Table Grid */}
            <div className="w-full border border-gray-200 rounded overflow-hidden select-none">
              {/* Header Days of Week */}
              <div className="grid grid-cols-7 bg-[#F7F7F7] border-b border-gray-200 text-center text-xs font-medium text-gray-600 py-1.5">
                <div>T2</div>
                <div>T3</div>
                <div>T4</div>
                <div>T5</div>
                <div>T6</div>
                <div>T7</div>
                <div>CN</div>
              </div>

              {/* Day cells (5 rows x 7 cols) */}
              <div className="grid grid-cols-7 auto-rows-[90px] text-xs">
                {days.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`border-r border-b border-gray-200 p-1.5 relative transition-colors ${
                        (index + 1) % 7 === 0 ? "border-r-0" : ""
                      } ${
                        item.isToday
                          ? "bg-[#FCF8E3]" // soft highlight as seen in screenshot
                          : item.isCurrentMonth
                          ? "bg-white hover:bg-gray-50/50"
                          : "bg-white text-gray-300"
                      }`}
                    >
                      <div className="flex justify-end">
                        <span
                          className={`inline-block font-normal ${
                            item.isToday
                              ? "text-gray-900 font-semibold"
                              : item.isCurrentMonth
                              ? "text-gray-600"
                              : "text-gray-300"
                          }`}
                        >
                          {item.day}
                        </span>
                      </div>
                      
                      {/* Optional schedule markers if needed */}
                      {item.isToday && (
                        <div className="mt-2 text-[10px] text-emerald-700 bg-emerald-100/70 rounded px-1.5 py-0.5 border border-emerald-300/50 inline-block">
                          Hôm nay
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* CIRCULAR BLACK DOWNLOAD BUTTON IN PLACE OF N BADGE */}
      <div className="fixed bottom-4 left-4 z-50 flex items-center">
        <a
          href="https://github.com/namtacozz/ITF/releases/download/v1.0.0/ViTai.zip"
          download="ViTai.zip"
          className="w-7 h-7 rounded-full bg-[#171717] hover:bg-[#262626] border border-white/20 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Tải xuống ViTai.zip"
          aria-label="Tải xuống ViTai.zip"
        >
          <Download className="w-3.5 h-3.5 text-white/90" />
        </a>
      </div>
    </div>
  );
}
