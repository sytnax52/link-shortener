const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
function UrlForm({
  originalUrl,
  setOriginalUrl,
  handleSubmit,
  loading,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="https://example.com"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
      >
        {loading ? "Creating..." : "Shorten Link"}
      </button>
    </form>
  );
}

export default UrlForm;