import { useState } from "react";
import api from "./services/api";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl) return;

    try {
      setLoading(true);

      const res = await api.post("/links", {
        originalUrl,
      });

      setShortUrl(`http://localhost:5000/${res.data.data.shortCode}`);
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          🔗 Link Shortener
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Short your long URLs in a snap! Just paste your link below and click the button to get a shortened version.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="https://example.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {loading ? "Creating..." : "Shorten Link"}
          </button>

        </form>

        {shortUrl && (
          <div className="mt-8 bg-slate-100 rounded-lg p-4">

            <h2 className="font-semibold mb-2">
              ✅ Short Link
            </h2>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 break-all"
            >
              {shortUrl}
            </a>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;