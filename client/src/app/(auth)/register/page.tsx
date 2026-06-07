"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);

      await register({
        name,
        email,
        password,
      });

      toast.success("Account created successfully");

      router.push("/dashboard");
    } catch {
      setError("Failed to register");
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Create Account
        </h1>

        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Start managing projects and operations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900"
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}
