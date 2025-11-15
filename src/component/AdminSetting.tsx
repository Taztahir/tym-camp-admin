import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface SettingsData {
  appName: string;
  contactEmail: string;
  darkMode: boolean;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({
    appName: "",
    contactEmail: "",
    darkMode: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const ref = doc(db, "settings", "general");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as SettingsData;
          setSettings(data);
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const ref = doc(db, "settings", "general");
      await setDoc(ref, settings);
      alert("✅ Settings saved successfully!");
    } catch (err) {
      alert("❌ Failed to save settings: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading settings...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gradient bg-clip-text text-transparent from-[#6A0DAD] to-purple-600">
        ⚙️ Dashboard Settings
      </h2>

      <div className="grid gap-6">
        {/* App Name */}
        <div className="p-5 rounded-2xl bg-gradient-to-tr from-purple-700/30 to-purple-900/40 shadow-lg backdrop-blur-md border border-purple-500/20 transition hover:scale-[1.02] duration-300">
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            App Name
          </label>
          <input
            type="text"
            value={settings.appName}
            onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
            placeholder="Enter dashboard name"
            className="
              w-full px-4 py-2 rounded-lg
              bg-white/10 text-white placeholder-white/50
              focus:outline-none focus:ring-2 focus:ring-purple-400
              transition duration-200
            "
          />
        </div>

        {/* Contact Email */}
        <div className="p-5 rounded-2xl bg-gradient-to-tr from-purple-700/30 to-purple-900/40 shadow-lg backdrop-blur-md border border-purple-500/20 transition hover:scale-[1.02] duration-300">
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) =>
              setSettings({ ...settings, contactEmail: e.target.value })
            }
            placeholder="support@example.com"
            className="
              w-full px-4 py-2 rounded-lg
              bg-white/10 text-white placeholder-white/50
              focus:outline-none focus:ring-2 focus:ring-purple-400
              transition duration-200
            "
          />
        </div>

        {/* Dark Mode */}
        <div className="p-5 rounded-2xl bg-gradient-to-tr from-purple-700/30 to-purple-900/40 shadow-lg backdrop-blur-md border border-purple-500/20 flex items-center justify-between transition hover:scale-[1.02] duration-300">
          <span className="text-gray-200 font-medium">Enable Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) =>
                setSettings({ ...settings, darkMode: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="
              w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400
              rounded-full peer peer-checked:bg-purple-600
              transition-all duration-300
            "></div>
            <div className="
              absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full
              peer-checked:translate-x-5 transition-transform duration-300
            "></div>
          </label>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`
            w-full py-3 rounded-2xl text-white font-bold text-lg
            bg-gradient-to-r from-purple-600 to-[#6A0DAD]
            shadow-xl hover:shadow-purple-400/50 transition duration-300
            ${saving ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
