import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Next Todos | Login",
};

export default function Login() {
  return (
    <div className="w-full p-5 flex flex-col items-center">
      <p className="text-3xl font-bold text-secondary">Login</p>
      <LoginForm />
    </div>
  );
}
