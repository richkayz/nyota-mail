import { useState } from "react";

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ComposeModal({
  open,
  onClose,
}: ComposeModalProps) {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  if (!open) return null;

  async function sendMail() {
    setSending(true);

    try {
      const res = await fetch("http://localhost:3000/api/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          cc,
          bcc,
          subject,
          text: message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Email sent successfully.");

        setTo("");
        setCc("");
        setBcc("");
        setSubject("");
        setMessage("");

        onClose();
      } else {
        alert("Failed to send email.");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to send email.");
    }

    setSending(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="flex h-[700px] w-[700px] flex-col rounded-xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">
            New Message
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">

          <input
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded border p-2"
          />

          <input
            placeholder="CC"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            className="rounded border p-2"
          />

          <input
            placeholder="BCC"
            value={bcc}
            onChange={(e) => setBcc(e.target.value)}
            className="rounded border p-2"
          />

          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded border p-2"
          />

          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 resize-none rounded border p-3"
          />

        </div>

        <div className="flex justify-end gap-3 border-t p-4">

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            disabled={sending}
            onClick={sendMail}
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send"}
          </button>

        </div>

      </div>
    </div>
  );
}