import { Link2 } from "lucide-react";

function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-600 p-3 rounded-xl">
          <Link2 className="text-white" size={28} />
        </div>
      </div>

      <h1 className="text-4xl font-bold text-slate-900">
        Link Shortener
      </h1>

      <p className="text-slate-500 mt-3">
        Shorten your URLs quickly and securely.
      </p>
    </header>
  );
}

export default Header;