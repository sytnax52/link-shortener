import { useState, useEffect } from "react";
import api from "./services/api";
import Header from "./components/Header";
import UrlForm from "./components/UrlForm";
import ResultCard from "./components/ResultCard";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
const fetchLinks = async () => {
  try {
    const res = await api.get("/links");
    setLinks(res.data.data);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchLinks();
}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl) {
  alert("Please enter a URL.");
  return;
}

if (!isValidUrl(originalUrl)) {
  alert("Please enter a valid URL.");
  return;
}

    try {
      setLoading(true);

      const res = await api.post("/links", {
        originalUrl,
      });
console.log(res.data);
      setShortUrl(`http://localhost:5000/${res.data.data.shortCode}`);
      fetchLinks();
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
       <Header />

       <UrlForm
  originalUrl={originalUrl}
  setOriginalUrl={setOriginalUrl}
  handleSubmit={handleSubmit}
  loading={loading}
/>

 <ResultCard shortUrl={shortUrl} />
 <div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Recent Links</h2>

  {links.map((link) => (
    <div
      key={link._id}
      className="border rounded-xl p-4 mb-3 bg-slate-50"
    >
      <p className="font-medium break-all">
        {link.originalUrl}
      </p>

      <p className="text-blue-600">
        http://localhost:5000/{link.shortCode}
      </p>

      <p className="text-sm text-slate-500">
        Clicks: {link.clicks}
      </p>
    </div>
  ))}
</div>
        

      </div>
    </div>
  );
}

export default App;