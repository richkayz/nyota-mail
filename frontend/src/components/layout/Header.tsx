import { useState } from "react";
import ComposeModal from "../mail/ComposeModal";

export default function Header() {
  const [composeOpen, setComposeOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-blue-700">
            Nyota Mail
          </h1>

          <button
            onClick={() => setComposeOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            ✉ Compose
          </button>
        </div>

        <input
          type="text"
          placeholder="Search mail..."
          className="w-96 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />

        <div className="font-medium text-gray-600">
          Richard
        </div>
      </header>

      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
      />
    </>
  );
}