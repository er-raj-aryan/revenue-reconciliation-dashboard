import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue managing your revenue reconciliation dashboard."
    >
      <LoginForm />
    </AuthLayout>
  );
}