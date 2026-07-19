const folders = [
  "Inbox",
  "Sent",
  "Drafts",
  "Spam",
  "Trash",
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <div className="p-4">
        <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
          Compose
        </button>
      </div>

      <nav>
        {folders.map((folder) => (
          <button
            key={folder}
            className="block w-full px-6 py-3 text-left hover:bg-gray-100"
          >
            {folder}
          </button>
        ))}
      </nav>
    </aside>
  );
}