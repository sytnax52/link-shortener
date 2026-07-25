import { useState } from "react";
import api from "./services/api";
import Header from "./components/Header";
import UrlForm from "./components/UrlForm";
import ResultCard from "./components/ResultCard";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

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
        

      </div>
    </div>
  );
}

export default App;