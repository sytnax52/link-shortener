import { useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl) {
      alert("Lütfen bir URL giriniz.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/links", {
        originalUrl,
      });

      const code = response.data.data.shortCode;

      setShortUrl(`http://localhost:5000/${code}`);
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🔗 Link Shortener</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://example.com"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Oluşturuluyor..." : "Linki Kısalt"}
        </button>
      </form>

      {shortUrl && (
        <div className="result">
          <h3>Kısa Link</h3>

          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;