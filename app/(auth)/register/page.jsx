import RegisterForm from "@/components/RegisterForm";

export const metadata = {
  title: "Next Todos | Register",
};

export default function Register() {
  return (
    <div className="w-full p-5 flex flex-col items-center">
      <p className="text-3xl text-secondary font-bold">Register</p>
      <RegisterForm />
    </div>
  );
}
