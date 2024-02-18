import LogoutButton from "./LogoutButton";

export default function Navbar({ user }) {
  return (
    <div className="flex bg-neutral navbar justify-between p-3">
      <p className="text-xl font-bold text-secondary">
        Welcome back, {user.user_metadata.firstName}{" "}
        {user.user_metadata.lastName}
      </p>
      <LogoutButton />
    </div>
  );
}
