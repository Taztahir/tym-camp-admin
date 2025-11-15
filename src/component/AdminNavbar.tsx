import React, { useState } from "react";
import { Bell, UserCircle2, Search } from "lucide-react";

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <header className="w-full px-6 py-4 bg-gradient-to-r from-[#6A0DAD]/90 to-purple-700/80 shadow-lg backdrop-blur-md rounded-b-2xl">
      <div className="flex items-center justify-between">
        {/* Left Section: Title + Search */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Admin Dashboard
          </h1>

          <div className="hidden md:flex items-center bg-white/30 backdrop-blur-lg rounded-xl px-3 py-2 gap-2 w-80">
            <Search size={18} className="text-white/80" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white placeholder-white/60 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <Bell className="text-white hover:text-yellow-300 transition" size={22} />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/30 transition">
            <UserCircle2 className="text-white" size={28} />
            <span className="text-white font-medium hidden sm:block">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
