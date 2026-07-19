import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import ReadingPane from "./ReadingPane";

export default function MainLayout() {
  const [selectedUid, setSelectedUid] = useState<number | null>(null);

  return (
    <div className="flex h-screen flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <MessageList
          selectedUid={selectedUid}
          onSelect={setSelectedUid}
        />

        <ReadingPane selectedUid={selectedUid} />
      </div>
    </div>
  );
}