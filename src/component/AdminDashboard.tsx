import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";
import RegistrationTable from "./AdminRegisteration";
import SettingsPage from "./AdminSetting";
import MobileBottomNav from "./AdminMobileNav";
import { db } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  reference?: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

interface SettingsData {
  appName: string;
  contactEmail: string;
  primaryColor: string;
  darkMode: boolean;
}

const AdminDashboard: React.FC = () => {
  const [active, setActive] = useState("Dashboard");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile toggle

  // Fetch registrations
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "registrations"), (snapshot) => {
      const docs: Registration[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Registration, "id">),
      }));
      setRegistrations(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch settings
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "general"), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as SettingsData;
        setSettings(data);
        document.documentElement.style.setProperty("--primary-color", data.primaryColor);
        document.documentElement.style.setProperty(
          "--background-color",
          data.darkMode ? "#0F1115" : "#F0F2F5"
        );
        document.body.style.backgroundColor = data.darkMode ? "#0F1115" : "#F0F2F5";
        document.body.style.color = data.darkMode ? "#fff" : "#111";
      }
    });
    return () => unsub();
  }, []);

  const totalRegistrations = registrations.length;
  const totalWithReference = registrations.filter((r) => r.reference).length;

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return (
          <div className="space-y-8 w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <h2 className="text-3xl font-extrabold text-gradient mb-1">Overview</h2>
              <p className="text-gray-400">Welcome Admin 👋</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg rounded-xl p-6 text-white flex flex-col items-center justify-center hover:scale-105 transform transition duration-300">
                <p className="text-sm font-medium opacity-80">Total Registrations</p>
                <h3 className="text-3xl font-bold">{totalRegistrations}</h3>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-teal-500 shadow-lg rounded-xl p-6 text-white flex flex-col items-center justify-center hover:scale-105 transform transition duration-300">
                <p className="text-sm font-medium opacity-80">Verified References</p>
                <h3 className="text-3xl font-bold">{totalWithReference}</h3>
              </div>
              <div className="bg-gradient-to-r from-red-400 to-orange-500 shadow-lg rounded-xl p-6 text-white flex flex-col items-center justify-center hover:scale-105 transform transition duration-300">
                <p className="text-sm font-medium opacity-80">Unverified</p>
                <h3 className="text-3xl font-bold">{totalRegistrations - totalWithReference}</h3>
              </div>
            </div>

            {/* Registration Table */}
            <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
              <RegistrationTable registrations={registrations.slice(0, 5)} loading={loading} />
            </div>
          </div>
        );

      case "Registrations":
        return <RegistrationTable registrations={registrations} loading={loading} />;

      case "Payments":
        return (
          <div className="p-6 text-gray-600 dark:text-gray-300">
            <h2 className="text-2xl font-bold mb-3 text-gradient">Payments</h2>
            <p>Payment records will appear here (connect Paystack or Stripe).</p>
          </div>
        );

      case "Settings":
        return <SettingsPage />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        active={active}
        setActive={setActive}
        // Pass sidebarOpen for mobile overlay handling if needed
      />
      <MobileBottomNav active={active} setActive={setActive} />

      {/* Main content */}
      <div className="flex-1 flex flex-col pt-5 max-lg:pb-20 lg:ml-60">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
