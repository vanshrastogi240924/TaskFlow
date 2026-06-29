import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { login, error: apiError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please enter all fields");
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-cyan-600 mb-2">
          TaskFlow
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome back! Login to continue.
        </p>

        {(localError || apiError) && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
            {localError || apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="flex justify-between text-sm mb-6">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-cyan-600 hover:underline cursor-pointer"
              onClick={() =>toast("Forgot password functionality is not implemented yet.")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;