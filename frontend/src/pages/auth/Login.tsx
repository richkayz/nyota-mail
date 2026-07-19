import LoginCard from "../../components/auth/LoginCard";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <LoginCard>
        <LoginForm />
      </LoginCard>
    </div>
  );
}