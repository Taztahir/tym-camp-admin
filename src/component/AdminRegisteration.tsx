import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  reference?: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

interface Props {
  registrations: Registration[];
  loading: boolean;
}

const truncate = (str: string, max = 15) =>
  str.length > max ? str.slice(0, max) + "…" : str;

const RegistrationTable: React.FC<Props> = ({ registrations, loading }) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Registration[]>(registrations);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      registrations.filter(
        (r) =>
          r.fullName.toLowerCase().includes(lower) ||
          r.email.toLowerCase().includes(lower) ||
          (r.reference?.toLowerCase().includes(lower) ?? false)
      )
    );
  }, [search, registrations]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading registrations...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-10 text-center bg-gradient-to-r from-[#6A0DAD] via-purple-600 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
        Registration Records
      </h2>

      {/* Search bar */}
      <div className="mb-6 sm:mb-8 flex justify-center px-2">
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-lg shadow-lg px-4 py-2 sm:px-5 sm:py-3 rounded-2xl w-full max-w-xl border border-purple-200">
          <Search className="text-purple-500" size={20} />
          <input
            type="text"
            placeholder="Search name, email or reference..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 text-base sm:text-lg">No registrations found.</p>
      ) : (
        <div className="overflow-hidden rounded-3xl shadow-2xl bg-white/80 backdrop-blur-xl border border-gray-100">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-r from-[#6A0DAD] to-purple-600 text-white">
              <tr>
                <th className="p-2 sm:p-4 text-left font-semibold">#</th>
                <th className="p-2 sm:p-4 text-left font-semibold">Name</th>
                <th className="hidden sm:table-cell p-2 sm:p-4 text-left font-semibold">Email</th>
                <th className="hidden md:table-cell p-2 sm:p-4 text-left font-semibold">Phone</th>
                <th className="hidden lg:table-cell p-2 sm:p-4 text-left font-semibold">Reference</th>
                <th className="hidden xl:table-cell p-2 sm:p-4 text-left font-semibold">Registered On</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-100 hover:bg-purple-50/60 transition-all duration-300"
                >
                  <td className="p-2 sm:p-4 font-semibold">{i + 1}</td>
                  <td className="p-2 sm:p-4 font-medium">{truncate(r.fullName, 12)}</td>
                  <td className="hidden sm:table-cell p-2 sm:p-4 text-gray-600">{truncate(r.email, 15)}</td>
                  <td className="hidden md:table-cell p-2 sm:p-4 text-gray-600">{truncate(r.phone, 12)}</td>
                  <td className="hidden lg:table-cell p-2 sm:p-4 font-semibold text-green-600">{truncate(r.reference || "—", 10)}</td>
                  <td className="hidden xl:table-cell p-2 sm:p-4 text-sm text-gray-500">
                    {r.createdAt ? new Date(r.createdAt.seconds * 1000).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistrationTable;
