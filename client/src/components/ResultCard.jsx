import { toast } from "sonner";
import { Copy, ExternalLink } from "lucide-react";
function ResultCard({ shortUrl }) {
  if (!shortUrl) return null;

  const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  } catch (error) {
    console.error(error);
    alert("Failed to copy link.");
  }
};
  return (
    <div className="mt-8 bg-slate-100 rounded-lg p-4">
      <h2 className="font-semibold text-slate-800 mb-2">
  Short URL
</h2>

      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 break-all"
      >
        {shortUrl}
      </a>

      <div className="flex gap-3 mt-4">
<button
  type="button"
  onClick={copyToClipboard}
  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg transition"
>
  <Copy size={18} />
  Copy
</button>

<a
  href={shortUrl}
  target="_blank"
  rel="noreferrer"
  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
>
  <ExternalLink size={18} />
  Open
</a>
      </div>
    </div>
  );
}

export default ResultCard;