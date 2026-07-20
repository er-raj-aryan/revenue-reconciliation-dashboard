import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your account to start reconciling orders and payments with AI."
    >
      <SignupForm />
    </AuthLayout>
  );
}