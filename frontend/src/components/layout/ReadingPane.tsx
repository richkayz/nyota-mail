import { useEffect, useState } from "react";

interface MailMessage {
  uid: number;
  from: string;
  to: string;
  cc: string;
  subject: string;
  date: string;
  text: string;
  html: string;
  attachments: {
    filename: string | null;
    contentType: string;
    size: number;
  }[];
}

interface ReadingPaneProps {
  selectedUid: number | null;
}

export default function ReadingPane({
  selectedUid,
}: ReadingPaneProps) {
  const [message, setMessage] = useState<MailMessage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUid) {
      setMessage(null);
      return;
    }

    setLoading(true);

    fetch(`http://localhost:3000/api/mail/message/${selectedUid}`)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedUid]);

  if (!selectedUid) {
    return (
      <section className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-3 text-2xl font-bold">
            Welcome to Nyota Mail
          </h2>

          <p className="text-gray-600">
            Select a message to preview it here.
          </p>
        </div>
      </section>
    );
  }

  if (loading || !message) {
    return (
      <section className="flex flex-1 items-center justify-center bg-gray-50">
        Loading message...
      </section>
    );
  }

  return (
    <section className="flex-1 overflow-y-auto bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">
        {message.subject}
      </h1>

      <div className="mb-6 space-y-1 text-sm text-gray-600">
        <div>
          <strong>From:</strong> {message.from}
        </div>

        <div>
          <strong>To:</strong> {message.to}
        </div>

        {message.cc && (
          <div>
            <strong>CC:</strong> {message.cc}
          </div>
        )}

        <div>
          <strong>Date:</strong>{" "}
          {new Date(message.date).toLocaleString()}
        </div>
      </div>

      {message.html ? (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: message.html }}
        />
      ) : (
        <pre className="whitespace-pre-wrap font-sans">
          {message.text}
        </pre>
      )}

      {message.attachments.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h3 className="mb-3 text-lg font-semibold">
            Attachments
          </h3>

          {message.attachments.map((attachment, index) => (
            <div
              key={index}
              className="rounded border p-2"
            >
              {attachment.filename ?? "Unnamed file"} (
              {attachment.size} bytes)
            </div>
          ))}
        </div>
      )}
    </section>
  );
}