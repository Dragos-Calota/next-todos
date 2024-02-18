"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setErrorMessage(error.message);
    if (!error) {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        className="w-2/5 grid grid-cols-1 gap-5 p-5"
        onSubmit={handleSubmit}
      >
        <label className="form-control p-2">
          <div className="label">
            <p className="label-text">Email</p>
          </div>
          <input
            type="email"
            className="input input-secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-control p-2">
          <div className="label">
            <p className="label-text">Password</p>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className="input input-secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="form-control">
          <label className="label cursor-pointer justify-start">
            <p className="label-text pr-2">Show Password</p>
            <input
              type="checkbox"
              className="toggle toggle-secondary"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </label>
        </div>
        <button className="btn btn-secondary font-bold text-lg">Login</button>
        {errorMessage && (
          <div className="alert alert-error my-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}
      </form>
    </>
  );
}
