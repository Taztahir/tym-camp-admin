// MobileBottomNav.tsx
import React from "react";
import { LayoutDashboard, Users, CreditCard, Settings } from "lucide-react";

interface MobileBottomNavProps {
  active: string;
  setActive: (value: string) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ active, setActive }) => {
  const links = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Registrations", icon: <Users size={20} /> },
    { name: "Payments", icon: <CreditCard size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 rounded-t-4xl left-0 w-full bg-[#6A0DAD]/95 backdrop-blur-md 
                    border-t border-purple-300/20 flex justify-around p-2 z-50">
      {links.map((link) => (
        <button
          key={link.name}
          onClick={() => setActive(link.name)}
          className={`flex flex-col items-center justify-center p-4 my-2 rounded-lg transition-all duration-300
            ${active === link.name
              ? "bg-white text-[#6A0DAD] scale-[1.05]"
              : "hover:bg-white/20 active:scale-[0.97] text-white"
            }`}
        >
          {link.icon}
          {/* <span className="text-xs mt-1">{link.name}</span> */}
        </button>
      ))}
    </div>
  );
};

export default MobileBottomNav;
