import React from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

interface SidebarProps {
  active: string;
  setActive: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const links = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Registrations", icon: <Users size={20} /> },
    { name: "Payments", icon: <CreditCard size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div
      className="
        fixed top-0 left-0 h-screen max-lg:hidden w-64 p-6 flex flex-col rounded-r-3xl shadow-2xl
        bg-[#6A0DAD]
        text-white border-r border-purple-300/20
        backdrop-blur-lg
      "
    >
      {/* Logo / Title */}
      <h1 className="text-3xl font-extrabold mb-10 text-center tracking-wide 
        bg-gradient-to-r from-white to-purple-200 text-transparent bg-clip-text">
        Admin
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => setActive(link.name)}
            className={`
              flex items-center gap-3 p-3 rounded-xl
              transition-all duration-300 text-sm font-medium
              ${active === link.name
                ? "bg-white text-[#6A0DAD] shadow-xl scale-[1.04]"
                : "hover:bg-white/15 active:scale-[0.98]"
              }
            `}
          >
            <span className="text-lg">{link.icon}</span>
            {link.name}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-xs text-purple-200/80 
        border-t border-purple-300/20 pt-4">
        © {new Date().getFullYear()} Taz Admin
      </div>
    </div>
  );
};

export default Sidebar;
