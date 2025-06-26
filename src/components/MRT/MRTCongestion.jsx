import { useEffect, useState } from "react";
import axios from "axios";

const colorMap = {
  High: "bg-red-500",
  Moderate: "bg-yellow-400",
  Low: "bg-green-400"
};
const emojiMap = {
  High: "🔴",
  Moderate: "🟡",
  Low: "🟢"
};

export default function MRTCongestion() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/mrt-crowd")
      .then((res) => {
        setData(res.data.value || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch crowd data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[60vh] px-4 sm:px-0 font-michroma">
      <h1 className="text-3xl mb-6 mt-14 tracking-wide text-white drop-shadow text-center">
        MRT Peak/Off-Peak Congestion
      </h1>

      {/* Disclaimer box with original phrasing */}
      <div className="mb-10 text-xs sm:text-sm text-zinc-400 bg-zinc-900/70 border border-zinc-800 rounded-xl px-6 py-4 shadow-sm max-w-3xl w-full text-center">
        <strong>Note:</strong> This feature is fully integrated with LTA DataMall's <code>PCDRealTime</code> endpoint. <br />
        As of June 2025, live data is not always published, so demo data may be shown.
      </div>

      {loading && <p className="text-zinc-400 text-sm">Loading real-time data...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="w-full max-w-3xl grid gap-5">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="relative group bg-zinc-900/60 border border-zinc-800 rounded-2xl px-5 py-4 shadow-md backdrop-blur-xl hover:shadow-[0_0_15px_#00f0ff44] transition duration-300 ease-in-out"
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-sm opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

              <div className="grid grid-cols-[1.5fr_0.7fr_1.5fr_1fr] gap-4 items-center text-white text-sm sm:text-base relative z-10">
                <div className="text-left break-words">{item.Station}</div>
                <div className="text-left text-zinc-300 break-words">{item.Line}</div>
                <div className="text-left text-zinc-400 break-words">{item.Direction}</div>
                <div className="flex items-center gap-1 text-left">
                  <span className="capitalize">{item.CrowdLevel}</span>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shadow ${colorMap[item.CrowdLevel]}`}>
                    <span className="text-lg">{emojiMap[item.CrowdLevel]}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-zinc-400 mt-6">No congestion data available at the moment.</p>
      )}
    </div>
  );
}
