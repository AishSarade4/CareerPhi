import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/api";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);

      if (token) {
        authLogin(token);
        navigate("/dashboard", { replace: true });
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-black-500">
            Login to Your Account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-3 rounded-md bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <LogIn className="h-4 w-4 text-white mr-1" />
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              type="button"
              className="w-full flex justify-center items-center py-2 px-3 rounded-md bg-gray-100 text-gray-600 font-medium text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
