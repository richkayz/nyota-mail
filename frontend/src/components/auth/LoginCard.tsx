interface LoginCardProps {
  children: React.ReactNode;
}

export default function LoginCard({ children }: LoginCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Nyota Mail
        </h1>

        <p className="mt-2 text-gray-500">
          Secure Enterprise Webmail
        </p>
      </div>

      {children}
    </div>
  );
}