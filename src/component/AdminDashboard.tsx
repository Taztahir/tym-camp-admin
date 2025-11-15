import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";
import MobileBottomNav from "./AdminMobileNav";
import RegistrationTable from "./AdminRegisteration";
import SettingsPage from "./AdminSetting";
import { db } from "../firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  reference?: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

const AdminDashboard: React.FC = () => {
  const [active, setActive] = useState("Dashboard");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

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

  const totalRegistrations = registrations.length;
  const totalWithReference = registrations.filter((r) => r.reference).length;

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return (
          <div className="space-y-6 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gradient mb-1">Overview</h2>
              <p className="text-gray-500 sm:text-gray-400">Welcome Admin 👋</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg rounded-xl p-5 text-white flex flex-col items-center justify-center hover:scale-105 transform transition duration-300">
                <p className="text-sm font-medium opacity-80">Total Registrations</p>
                <h3 className="text-2xl sm:text-3xl font-bold">{totalRegistrations}</h3>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-teal-500 shadow-lg rounded-xl p-5 text-white flex flex-col items-center justify-center hover:scale-105 transform transition duration-300">
                <p className="text-sm font-medium opacity-80">Verified References</p>
                <h3 className="text-2xl sm:text-3xl font-bold">{totalWithReference}</h3>
              </div>
              <div className="bg-gradient-to-r from-red-400 to-orange-500 shadow-lg rounded-xl p-5 text-white flex flex-col items-center justify-center hover:scale-105 transform transition duration-300">
                <p className="text-sm font-medium opacity-80">Unverified</p>
                <h3 className="text-2xl sm:text-3xl font-bold">{totalRegistrations - totalWithReference}</h3>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 overflow-x-auto">
              <RegistrationTable registrations={registrations.slice(0, 5)} loading={loading} />
            </div>
          </div>
        );

      case "Registrations":
        return <RegistrationTable registrations={registrations} loading={loading} />;

      case "Payments":
        return (
          <div className="p-4 sm:p-6 text-gray-600">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gradient">Payments</h2>
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <Sidebar active={active} setActive={setActive} />

      {/* Main content */}
      <div className="flex-1 flex flex-col pt-4 pb-24 md:pb-6 lg:ml-60">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{renderContent()}</main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav active={active} setActive={setActive} />
    </div>
  );
};

export default AdminDashboard;
