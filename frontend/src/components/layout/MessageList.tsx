import { useEffect, useState } from "react";

interface MailMessage {
  uid: number;
  from: string;
  subject: string;
  date: string;
}

interface MessageListProps {
  selectedUid: number | null;
  onSelect: (uid: number) => void;
}

export default function MessageList({
  selectedUid,
  onSelect,
}: MessageListProps) {
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/mail/inbox")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);

        if (data.length > 0 && selectedUid === null) {
          onSelect(data[0].uid);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="w-96 border-r border-gray-200 bg-white p-4">
        Loading...
      </section>
    );
  }

  return (
    <section className="w-96 overflow-y-auto border-r border-gray-200 bg-white">
      {messages.map((mail) => (
        <div
          key={mail.uid}
          onClick={() => onSelect(mail.uid)}
          className={`cursor-pointer border-b p-4 transition-colors ${
            selectedUid === mail.uid
              ? "bg-blue-100 border-l-4 border-l-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          <div className="flex justify-between">
            <strong className="truncate">{mail.from}</strong>

            <span className="text-sm text-gray-500">
              {new Date(mail.date).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-1 truncate font-medium">
            {mail.subject}
          </div>
        </div>
      ))}
    </section>
  );
}